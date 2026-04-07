import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('교구원');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Attempting signup with:', email);
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            position: position,
            role: email.includes('admin') ? 'ADMIN' : 'USER'
          }
        }
      });

      if (signupError) {
        console.error('Supabase Signup Error:', signupError);
        throw signupError;
      }

      console.log('Signup successful:', data);
      setSuccess(true);
      setTimeout(() => {
        onSwitchToLogin();
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error('Caught Error during signup:', err);
      setError(err.message || '회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

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
                    <Icons.UserPlus size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">상암 그룹웨어 회원가입</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                >
                  <Icons.X size={20} />
                </button>
              </div>

              {success ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Icons.Check size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">회원가입 신청 완료!</h3>
                  <p className="text-sm text-gray-500">이메일 인증 후 로그인이 가능합니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSignup} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-xs text-red-600">
                      <Icons.AlertCircle size={14} />
                      {error}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 ml-1">이름</label>
                    <div className="relative">
                      <Icons.User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="홍길동"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 ml-1">이메일 주소</label>
                    <div className="relative">
                      <Icons.Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@sangam.org"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 ml-1">비밀번호</label>
                    <div className="relative">
                      <Icons.Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="6자 이상 입력"
                        minLength={6}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 ml-1">직분</label>
                    <select
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    >
                      <option>교구원</option>
                      <option>구역장</option>
                      <option>팀장</option>
                      <option>부장</option>
                      <option>전도사</option>
                      <option>목사</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      "w-full py-3 bg-[#1E3A8A] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-[#1e3a8a]/90 transition-all flex items-center justify-center gap-2 mt-4",
                      isLoading && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {isLoading ? (
                      <Icons.Loader2 className="animate-spin" size={18} />
                    ) : (
                      <Icons.UserPlus size={18} />
                    )}
                    {isLoading ? '가입 중...' : '회원가입 신청'}
                  </button>
                </form>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-500">
                  이미 계정이 있으신가요? <button onClick={onSwitchToLogin} className="text-blue-600 font-bold hover:underline">로그인하기</button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
