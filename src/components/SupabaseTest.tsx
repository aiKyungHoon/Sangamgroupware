import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import * as Icons from 'lucide-react';

export default function SupabaseTest() {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setStatus('testing');
    setMessage('Supabase 연결 테스트 중...');

    try {
      // Test 1: Check if URL and Key are present
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

      console.log('Current Supabase URL in app:', url);
      
      if (!url || !key) {
        throw new Error(`설정 누락: URL(${url ? 'O' : 'X'}), Key(${key ? 'O' : 'X'}). Settings > Secrets를 확인하고 앱을 새로고침하세요.`);
      }

      if (url.includes('dndbpus')) {
        throw new Error('여전히 예전 주소(dndbpus...)가 사용되고 있습니다. Secrets 저장 후 반드시 앱을 새로고침(F5) 해주세요.');
      }

      // Test 2: Try to fetch something simple (even if it fails, it proves connection)
      const { data, error } = await supabase.from('worship_attendance').select('count', { count: 'exact', head: true });
      
      if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
        // 42P01 is "relation does not exist", which is fine if tables aren't created yet
        throw error;
      }

      setStatus('success');
      setMessage('Supabase 연결 성공! 이제 회원가입을 진행하실 수 있습니다.');
    } catch (err: any) {
      console.error('Supabase Test Error:', err);
      setStatus('error');
      setMessage(err.message || '연결 실패. 콘솔 로그를 확인해주세요.');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-xs animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-lg ${
            status === 'success' ? 'bg-green-50 text-green-600' :
            status === 'error' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
          }`}>
            <Icons.Database size={20} />
          </div>
          <h3 className="font-bold text-sm text-gray-900">Supabase 연결 상태</h3>
        </div>
        
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          {message || '연결 상태를 확인하려면 아래 버튼을 눌러주세요.'}
        </p>

        <button
          onClick={testConnection}
          disabled={status === 'testing'}
          className="w-full py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
        >
          {status === 'testing' ? <Icons.Loader2 size={14} className="animate-spin" /> : <Icons.RefreshCw size={14} />}
          {status === 'testing' ? '확인 중...' : '연결 테스트'}
        </button>
      </div>
    </div>
  );
}
