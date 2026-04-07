import React from 'react';
import { Edit2, Users, ArrowDown } from 'lucide-react';
import { cn } from '../lib/utils';

const teams = [
  { name: '보라팀', leader: '김규리', count: 50, color: 'purple', districts: ['1구역', '2구역', '3구역', '4구역', '5구역'] },
  { name: '이음팀', leader: '김주영a', count: 55, color: 'blue', districts: ['6구역', '7구역', '8구역', '9구역', '10구역'] },
  { name: '해봄팀', leader: '김반디', count: 45, color: 'amber', districts: ['11구역', '12구역', '13구역', '14구역', '15구역'] },
];

export default function OrganizationChart() {
  return (
    <div className="space-y-12 pb-20">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">상암 조직도</h2>
        <p className="text-gray-500 mt-1">팀별/구역별 조직 구성 및 인원 현황 (총 150명)</p>
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Top Level */}
        <div className="flex gap-12 items-start">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-64 relative">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">전도</span>
              <button className="p-1 hover:bg-gray-50 rounded text-gray-400"><Edit2 size={12} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-400">지역장</p>
                <p className="text-sm font-bold text-gray-900">김하영</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">전도관</p>
                <p className="text-sm font-bold text-gray-900">박다솔</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">전도서기</p>
                <p className="text-sm font-bold text-gray-900">김선우B</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">대외협력교관</p>
                <p className="text-sm font-bold text-gray-900">양재준</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#334155] p-8 rounded-2xl shadow-lg w-48 text-center text-white">
              <p className="text-xs opacity-60 mb-1">임원</p>
              <h3 className="text-2xl font-bold">한민지</h3>
            </div>
            <ArrowDown className="text-gray-300 mt-4" size={32} />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-64">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">날개</span>
              <button className="p-1 hover:bg-gray-50 rounded text-gray-400"><Edit2 size={12} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-400">지역서기</p>
                <p className="text-sm font-bold text-gray-900">복서경</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">교육팀장</p>
                <p className="text-sm font-bold text-gray-900">김성준</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">문화팀장</p>
                <p className="text-sm font-bold text-gray-900">이여진</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">회계팀장</p>
                <p className="text-sm font-bold text-gray-900">유승우</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400">심방팀장</p>
                <p className="text-sm font-bold text-gray-900">박미연</p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Level */}
        <div className="bg-blue-50 px-6 py-3 rounded-full border border-blue-100 flex items-center gap-3 shadow-sm">
          <Users size={18} className="text-blue-600" />
          <span className="text-sm font-bold text-gray-900">양때 팀장</span>
          <button className="text-[10px] font-bold text-blue-600 bg-white px-2 py-1 rounded border border-blue-200 flex items-center gap-1">
            <Edit2 size={10} /> 수정
          </button>
        </div>

        {/* Teams Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {teams.map((team) => (
            <div key={team.name} className="space-y-6">
              <div className={cn(
                "bg-white p-8 rounded-2xl shadow-sm border-t-8 text-center relative",
                team.color === 'purple' ? "border-purple-500" :
                team.color === 'blue' ? "border-blue-500" : "border-amber-500"
              )}>
                <p className="text-xs text-gray-400 mb-1">{team.name}</p>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{team.leader} <span className="text-sm font-normal text-gray-500">팀장</span></h4>
                <div className={cn(
                  "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold",
                  team.color === 'purple' ? "bg-purple-50 text-purple-600" :
                  team.color === 'blue' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                )}>
                  <Users size={14} /> 팀 인원: 총 {team.count}명
                </div>
              </div>

              <div className="space-y-2">
                {team.districts.map((district) => (
                  <button key={district} className="w-full bg-white p-4 rounded-xl border border-gray-100 flex justify-between items-center hover:border-blue-200 hover:shadow-sm transition-all group">
                    <span className="text-sm font-bold text-gray-700">{district}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 group-hover:text-blue-500">구역원 등록</span>
                      <ArrowDown size={14} className="-rotate-90 text-gray-300 group-hover:text-blue-500" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
