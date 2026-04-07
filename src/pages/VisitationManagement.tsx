import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Heart, TrendingUp, CheckCircle2, Send } from 'lucide-react';

const visitationData = [
  { name: '1월', 횟수: 45 },
  { name: '2월', 횟수: 52 },
  { name: '3월', 횟수: 68 },
  { name: '4월', 횟수: 40 },
  { name: '5월', 횟수: 35 },
  { name: '6월', 횟수: 42 },
];

const coverageData = [
  { name: '완료', value: 65 },
  { name: '미완료', value: 35 },
];
const COLORS = ['#1E3A8A', '#E2E8F0'];

export default function VisitationManagement() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">심방 관리</h2>
          <p className="text-gray-500 mt-1">교구원 심방 기록 및 일정을 관리합니다.</p>
        </div>
        <button className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#1E3A8A]/90">
          + 심방 보고서 작성
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <Heart size={16} />
            <span className="text-xs font-medium">이번 달 전체 심방 건수</span>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-2">86건</h3>
          <p className="text-xs text-green-600 font-bold">전월 대비 +12% 증가 ▲</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-amber-600">
            <TrendingUp size={16} />
            <span className="text-xs font-medium">심방 커버리지 (재적 대비)</span>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-2">65.0%</h3>
          <p className="text-xs text-gray-500">재적 500명 중 325명 방문 완료</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-red-600">
            <Heart size={16} />
            <span className="text-xs font-medium">집중 케어 필요 대상자</span>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-2">12명</h3>
          <p className="text-xs text-gray-500">장기 결석 2주 이상 증후군</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-8">월간 심방 횟수 추이</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="횟수" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-8">재적 대비 심방 완료 비율</h3>
          <div className="h-64 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={coverageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {coverageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 text-xs font-medium text-gray-500 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#1E3A8A] rounded-full"></div> 완료
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div> 미완료
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">심방 일지 빠른 기록</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="대상자 이름" 
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>일반 심방</option>
                <option>위로 심방</option>
                <option>축복 심방</option>
              </select>
            </div>
            <textarea 
              placeholder="상담 내용을 기록하세요. (자동 암호화 저장)" 
              className="w-full h-32 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-[10px] text-green-600 font-bold">
                <CheckCircle2 size={12} /> 보안 서버 저장 활성
              </div>
              <button className="bg-[#1E3A8A] text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#1E3A8A]/90">
                보고서 저장
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">최근 심방 기록</h3>
            <button className="text-xs font-bold text-blue-600">전체 보기</button>
          </div>
          <div className="space-y-4">
            {[
              { name: '김지민 성도', type: '위로/병가', date: '2026.03.24', content: '수술 후 가택 요양 중, 빠른 회복을 위한 기도 요청.' },
              { name: '박태양 청년', type: '새가족 케어', date: '2026.03.22', content: '신앙 생활 가이드 및 정착 상담 완료. 보라팀 배정.' },
              { name: '최현우 장로', type: '가정 심방', date: '2026.03.20', content: '사업장 이전 감사 예배 및 축복 심방.' },
            ].map((log) => (
              <div key={log.name} className="p-4 border-b border-gray-50 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-sm font-bold text-gray-900">{log.name}</span>
                    <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">{log.type}</span>
                  </div>
                  <span className="text-[10px] text-gray-400">{log.date}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{log.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
