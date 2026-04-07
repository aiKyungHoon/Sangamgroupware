import { createClient } from '@supabase/supabase-js';

// AI Studio 환경에서는 import.meta.env를 사용합니다.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL Check:', supabaseUrl ? 'URL 존재함' : 'URL 누락됨');
console.log('Supabase Key Check:', supabaseAnonKey ? 'Key 존재함' : 'Key 누락됨');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase 설정이 누락되었습니다. Settings > Secrets에서 VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 설정해주세요.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
