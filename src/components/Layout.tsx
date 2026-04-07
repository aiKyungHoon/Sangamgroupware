import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { NAV_ITEMS } from '../constants';
import * as Icons from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSwitchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const filteredNav = NAV_ITEMS.filter(item => 
    !user ? item.roles.includes('GUEST') : item.roles.includes(user.role)
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold text-[#1E3A8A] flex items-center gap-2">
          상암지역
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          {user ? `${user.name} ${user.position}` : '비로그인 사용자'}
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {filteredNav.map((item) => {
          const IconComponent = (Icons as any)[item.icon];
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-900/10" 
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {IconComponent && <IconComponent size={18} />}
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        {user ? (
          <button
            onClick={() => {
              logout();
              navigate('/');
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Icons.LogOut size={18} />
            로그아웃
          </button>
        ) : (
          <button
            onClick={() => {
              setIsLoginModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-3 text-sm font-bold bg-[#1E3A8A] text-white hover:bg-[#1e3a8a]/90 rounded-xl transition-all shadow-lg shadow-blue-900/10"
          >
            <Icons.LogIn size={18} />
            로그인
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSwitchToSignup={handleSwitchToSignup}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <Icons.Menu size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
              <Icons.Users size={18} className="text-[#2563EB]" />
              <span className="hidden sm:inline">상암 Groupware</span>
              <span className="sm:hidden">상암</span>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Icons.Bell size={20} className="text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-gray-100">
              <div className="hidden md:block text-right">
                <p className="text-xs font-bold text-gray-900 leading-none">{user ? user.name : 'GUEST'}</p>
                <p className="text-[10px] text-gray-400 mt-1">{user ? user.position : '비로그인'}</p>
              </div>
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 border border-blue-100">
                {user ? user.name[0] : '?'}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
