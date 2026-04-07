import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { CheckCircle2, Users, Calendar } from 'lucide-react';

const attendanceData = [
  { name: '1주차', value: 78 },
  { name: '2주차', value: 82 },
  { name: '3주차', value: 80 },
  { name: '4주차', value: 88 },
  { name: '5주차', value: 85 },
];

export default function WorshipManagement() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">예배 관리</h2>
          <p className="text-gray-500 mt-1">상암지역 전체 예배 출석 현황을 관리합니다.</p>
        </div>
        <button className="w-full sm:w-auto bg-[#1E3A8A] text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1E3A8A]/90 shadow-lg shadow-blue-900/10 transition-all">
          <Calendar size={18} />
          출석 체크
        </button>
      </div>

      <div className="bg-[#1E3A8A] p-10 rounded-2xl text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm opacity-80 mb-2">상암지역 주일예배 출석률</p>
          <h3 className="text-5xl font-bold mb-4">87.5%</h3>
          <p className="text-sm flex items-center gap-2">
            <span className="bg-white/20 px-2 py-1 rounded">지난주 대비 +3.2% 상승</span>
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-full bg-white/5 -skew-x-12 translate-x-12"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-8">매월 주차별 예배 출석률</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">팀별 예배 출석 및 사유 현황</h3>
          <div className="space-y-4">
            {['해봄팀', '보라팀', '이음팀'].map((team, idx) => (
              <div key={team} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-900">{team}</span>
                  <span className="text-blue-600 font-bold">{94 - idx * 5}%</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>결석: {idx + 1}명</span>
                  <span>개인사정(1), 경조사(1), 야근 및 철야(2)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
