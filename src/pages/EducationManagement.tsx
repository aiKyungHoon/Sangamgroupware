import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';
import * as Icons from 'lucide-react';
import { GraduationCap, Users, Radio, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const radioData = [
  { name: '1월', 출석: 180, 비율: 45 },
  { name: '2월', 출석: 210, 비율: 48 },
  { name: '3월', 출석: 195, 비율: 46 },
  { name: '4월', 출석: 0, 비율: 0 },
  { name: '5월', 출석: 0, 비율: 0 },
  { name: '6월', 출석: 0, 비율: 0 },
  { name: '7월', 출석: 0, 비율: 0 },
  { name: '8월', 출석: 0, 비율: 0 },
  { name: '9월', 출석: 0, 비율: 0 },
  { name: '10월', 출석: 0, 비율: 0 },
  { name: '11월', 출석: 0, 비율: 0 },
  { name: '12월', 출석: 0, 비율: 0 },
];

export default function EducationManagement() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">교육 관리</h2>
          <p className="text-gray-500 mt-1">교육 수료 및 셀 예배 현황을 파악합니다.</p>
        </div>
        <button className="w-full sm:w-auto bg-[#1E3A8A] text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1E3A8A]/90 shadow-lg shadow-blue-900/10 transition-all">
          <Icons.Plus size={18} />
          교육 등록
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#334155] p-6 rounded-2xl text-white shadow-sm">
          <div className="flex items-center gap-2 mb-4 opacity-80">
            <GraduationCap size={16} />
            <span className="text-xs font-medium">인맞은 시험 응시율</span>
          </div>
          <h3 className="text-4xl font-bold mb-2">77.0%</h3>
          <p className="text-xs opacity-60">재적 500명 중 385명 응시 완료</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <Users size={16} />
            <span className="text-xs font-medium">이번 달 구역예배실시율</span>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-2">85.0%</h3>
          <p className="text-xs text-gray-500">전체 20개 구역 중 17개 구역 진행</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4 text-gray-400">
            <Radio size={16} />
            <span className="text-xs font-medium">이달 심야라디오 평균 출결</span>
          </div>
          <h3 className="text-4xl font-bold text-gray-900 mb-2">43.0%</h3>
          <p className="text-xs text-gray-500">전월 대비 -3.0% 하락 ▼</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900">월별 심야라디오 참석 추이 (1~12월)</h3>
          <p className="text-sm text-gray-500">마우스를 올려 전월 대비 오르고 내린 증감률을 상세 확인하세요.</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={radioData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="출석" name="출석 인원 (명)" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={30} />
              <Line yAxisId="right" type="monotone" dataKey="비율" name="재적 대비 출석률 (%)" stroke="#7C2D12" strokeWidth={2} dot={{ r: 4, fill: '#7C2D12' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">인맞은 시험 미응시자 및 사유</h3>
            <button className="text-xs font-bold text-blue-600">응시자 명단 보기</button>
          </div>
          <div className="space-y-6">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    전체 진행률 (385명 / 500명)
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    77.0%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                <div style={{ width: "77%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { name: '김철수', team: '해봄팀', reason: '건강 문제로 인한 결석' },
                { name: '이영희', team: '보라팀', reason: '직장 야근 (별도 일정 조율 중)' },
                { name: '박민준', team: '이음팀', reason: '군 복무 중' },
              ].map((person) => (
                <div key={person.name} className="flex justify-between items-center p-3 border-b border-gray-50">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{person.name} <span className="text-xs font-normal text-gray-400">({person.team})</span></p>
                    <p className="text-xs text-gray-500 mt-1">사유: {person.reason}</p>
                  </div>
                  <span className="px-2 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded">미응시</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">구역예배 취합 현황 (이번 달)</h3>
            <button className="text-xs font-bold text-blue-600">리스트 업데이트</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-gray-400 border-b border-gray-100">
                <tr>
                  <th className="pb-4 font-medium">구역 (구역장)</th>
                  <th className="pb-4 font-medium">실시 횟수</th>
                  <th className="pb-4 font-medium">1회도 못한 사유 (0회 미진행)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: '1구역 (이하은)', count: '4회', reason: '-' },
                  { name: '2구역 (김영진)', count: '3회', reason: '-' },
                  { name: '3구역 (박서연)', count: '0회', reason: '구역원 전체 해외/지방 출장 극심, 줌(Zoom) 대체 논의 중', alert: true },
                  { name: '4구역 (정무진)', count: '4회', reason: '-' },
                ].map((row) => (
                  <tr key={row.name}>
                    <td className="py-4 font-bold text-gray-900">{row.name}</td>
                    <td className="py-4 font-bold text-gray-900">{row.count}</td>
                    <td className={cn("py-4 text-xs", row.alert ? "text-red-500 bg-red-50 px-2 rounded" : "text-gray-500")}>
                      {row.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
