import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';
import { UserPlus, TrendingUp, Users } from 'lucide-react';

const evangelismData = [
  { name: '1월', 인원: 12, 전도율: 2.4 },
  { name: '2월', 인원: 8, 전도율: 1.6 },
  { name: '3월', 인원: 15, 전도율: 3.0 },
  { name: '4월', 인원: 0, 전도율: 0 },
  { name: '5월', 인원: 0, 전도율: 0 },
  { name: '6월', 인원: 0, 전도율: 0 },
  { name: '7월', 인원: 0, 전도율: 0 },
  { name: '8월', 인원: 0, 전도율: 0 },
  { name: '9월', 인원: 0, 전도율: 0 },
  { name: '10월', 인원: 0, 전도율: 0 },
  { name: '11월', 인원: 0, 전도율: 0 },
  { name: '12월', 인원: 0, 전도율: 0 },
];

export default function EvangelismManagement() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">전도 관리</h2>
          <p className="text-gray-500 mt-1">새가족 전도 및 정착 현황을 관리합니다.</p>
        </div>
        <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#1E3A8A]/90">
          + 새가족 등록
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#1E3A8A] p-10 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-sm opacity-80 mb-2">올해 누적 전도율 (재적 대비)</p>
            <h3 className="text-5xl font-bold mb-4">7.0%</h3>
            <p className="text-sm opacity-60">현재 총 재적: 500명 기준</p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-full bg-white/5 -skew-x-12 translate-x-12"></div>
        </div>

        <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-400 mb-2">올해 누적 전도 인원</p>
          <h3 className="text-5xl font-bold text-gray-900 mb-4">35명</h3>
          <p className="text-sm text-gray-500">지난 해 동기간 대비 +12명 증가</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-8">월별 전도 인원 및 재적 대비 전도율</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evangelismData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} domain={[0, 3]} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="인원" name="전도 인원 (명)" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={30} />
              <Line yAxisId="right" type="monotone" dataKey="전도율" name="재적 대비 전도율 (%)" stroke="#7C2D12" strokeWidth={2} dot={{ r: 4, fill: '#7C2D12' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">팀별 전도 대상자 (VIP) 현황</h3>
          <button className="text-xs font-bold text-blue-600">상세 보기</button>
        </div>
        <div className="space-y-6">
          {[
            { name: '해봄팀', count: 12, settled: 3 },
            { name: '보라팀', count: 8, settled: 1 },
            { name: '이음팀', count: 15, settled: 4 },
          ].map((team) => (
            <div key={team.name} className="p-6 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-900">{team.name}</span>
                <span className="text-blue-600 font-bold">{team.settled}명 정착</span>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold inline-block text-blue-600">
                      집중 케어 중인 VIP: {team.count}명
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded bg-blue-100">
                  <div style={{ width: `${(team.settled / team.count) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
