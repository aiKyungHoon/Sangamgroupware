import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async (userId: string, email: string, metadata: any) => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error && error.code === 'PGRST116') {
          // Profile doesn't exist, create it from metadata
          const newProfile = {
            id: userId,
            email: email,
            full_name: metadata.full_name || email.split('@')[0],
            position: metadata.position || '교구원',
            role: metadata.role || 'USER',
            updated_at: new Date().toISOString()
          };
          
          const { data: createdProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([newProfile])
            .select()
            .single();
            
          if (!insertError && createdProfile) {
            setUser({
              id: createdProfile.id,
              name: createdProfile.full_name,
              email: createdProfile.email,
              role: createdProfile.role as UserRole,
              position: createdProfile.position
            });
          }
        } else if (data) {
          setUser({
            id: data.id,
            name: data.full_name,
            email: data.email,
            role: data.role as UserRole,
            position: data.position
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email || '', session.user.user_metadata);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email || '', session.user.user_metadata);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = (role: UserRole) => {
    // This is now handled by Supabase, but kept for compatibility if needed
    console.log('Login called with role:', role);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
