import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Calculator, CheckCircle2, AlertCircle } from 'lucide-react';

const financeData = [
  { name: '1주차', 십일조: 82, 정체비: 75 },
  { name: '2주차', 십일조: 88, 정체비: 80 },
  { name: '3주차', 십일조: 85, 정체비: 78 },
  { name: '4주차', 십일조: 92, 정체비: 85 },
  { name: '5주차', 십일조: 89, 정체비: 82 },
];

export default function AccountingManagement() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">회계 관리</h2>
          <p className="text-gray-500 mt-1">교구 재정 및 정체비 납부 현황을 관리합니다.</p>
        </div>
        <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#1E3A8A]/90">
          + 납부 체크
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1E3A8A] p-10 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm opacity-80 mb-2">이번 달 십일조 재적 납부율</p>
            <h3 className="text-5xl font-bold mb-4">82.5%</h3>
            <p className="text-sm opacity-60">전월 대비 +2.1% 상승</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-full bg-white/5 -skew-x-12 translate-x-12"></div>
        </div>

        <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-400 mb-2">이번 달 정체비 재적 납부율</p>
          <h3 className="text-5xl font-bold text-gray-900 mb-4">75.0%</h3>
          <p className="text-sm text-gray-500">전월 대비 -1.5% 감소</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-8">주차별 십일조 및 정체비 납부율</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financeData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="십일조" name="십일조" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="정체비" name="정체비" fill="#475569" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">팀별 납부 현황</h3>
        <div className="space-y-4">
          {[
            { name: '해봄팀', tithe: 90, fee: 85, unpaid: ['김철수', '박영희'] },
            { name: '보라팀', tithe: 85, fee: 70, unpaid: ['이지은'] },
            { name: '이음팀', tithe: 70, fee: 60, unpaid: ['홍길동', '최민수', '정유진'] },
          ].map((team) => (
            <div key={team.name} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-900">{team.name}</span>
                <div className="flex gap-4 text-xs font-bold">
                  <span className="text-blue-600">십일조 {team.tithe}%</span>
                  <span className="text-gray-600">정체비 {team.fee}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>미납: {team.unpaid.length}명</span>
                <span className="text-[10px]">{team.unpaid.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
