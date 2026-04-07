import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const { login } = useAuth();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const trimmedId = id.trim();
      const trimmedPassword = password.trim();
      const email = trimmedId.includes('@') ? trimmedId : `${trimmedId}@sangam.org`;
      
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password: trimmedPassword
      });

      if (loginError) {
        if (loginError.message === 'Invalid login credentials') {
          throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
        throw loginError;
      }

      // The AuthContext will handle the user state update via onAuthStateChange
      onClose();
    } catch (err: any) {
      setError(err.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Icons.ShieldCheck size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">상암 그룹웨어 로그인</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                >
                  <Icons.X size={20} />
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-xs text-red-600">
                    <Icons.AlertCircle size={14} />
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">아이디 (ID)</label>
                  <div className="relative">
                    <Icons.User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      required
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      placeholder="아이디 입력"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">비밀번호</label>
                  <div className="relative">
                    <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    로그인 상태 유지
                  </label>
                  <button type="button" className="text-blue-600 font-bold hover:underline">비밀번호 찾기</button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full py-3 bg-[#1E3A8A] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-[#1e3a8a]/90 transition-all flex items-center justify-center gap-2",
                    isLoading && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <Icons.Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Icons.LogIn size={18} />
                  )}
                  {isLoading ? '로그인 중...' : '로그인'}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500">
                  계정이 없으신가요? <button onClick={onSwitchToSignup} className="text-blue-600 font-bold hover:underline">회원가입 요청</button>
                </p>
              </div>
            </div>
            
            {/* Admin Hint */}
            <div className="bg-blue-50 p-4 text-center">
              <p className="text-[10px] text-blue-400 font-medium">
                Tip: 아이디에 'admin'이 포함되면 관리자 권한으로 로그인됩니다.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
