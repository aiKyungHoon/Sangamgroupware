import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { NAV_ITEMS } from '../constants';
import * as Icons from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend
} from 'recharts';
import { 
  CheckCircle2, AlertCircle, TrendingUp, Users, BookOpen, 
  GraduationCap, UserPlus, Calculator, Heart, ArrowRight, Radio
} from 'lucide-react';
import { cn } from '../lib/utils';

const dashboardData = [
  { name: '1월', 심방: 12, 예배: 85 },
  { name: '2월', 심방: 18, 예배: 88 },
  { name: '3월', 심방: 25, 예배: 92 },
  { name: '4월', 심방: 10, 예배: 87 },
  { name: '5월', 심방: 8, 예배: 84 },
  { name: '6월', 심방: 15, 예배: 89 },
  { name: '7월', 심방: 20, 예배: 90 },
  { name: '8월', 심방: 22, 예배: 91 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { 
      title: '예배 출석률', 
      value: '87.5%', 
      change: '+2.1%', 
      trend: 'up', 
      icon: BookOpen, 
      color: 'blue', 
      href: '/worship',
      desc: '지난주 대비'
    },
    { 
      title: '인맞은 시험 응시율', 
      value: '72.4%', 
      change: '미달', 
      trend: 'down', 
      icon: GraduationCap, 
      color: 'amber', 
      href: '/education',
      desc: '목표치(85%) 대비'
    },
    { 
      title: '구역예배 실시율', 
      value: '88.1%', 
      change: '양호', 
      trend: 'up', 
      icon: Users, 
      color: 'blue', 
      href: '/education',
      desc: '팀별 평균 실시율'
    },
    { 
      title: '심야라디오 출결', 
      value: '24.5%', 
      change: '급감', 
      trend: 'down', 
      icon: Radio, 
      color: 'gray', 
      href: '/education',
      desc: '전년 동기 대비'
    },
    { 
      title: '심방 실시율', 
      value: '95.0%', 
      change: '안정화', 
      trend: 'up', 
      icon: Heart, 
      color: 'blue', 
      href: '/visitation',
      desc: '케어 안정화 단계'
    },
    { 
      title: '전도 정착률', 
      value: '7.0%', 
      change: '집중 필요', 
      trend: 'down', 
      icon: TrendingUp, 
      color: 'gray', 
      href: '/evangelism',
      desc: '목표 15% 집중 필요'
    },
    { 
      title: '십일조 납부율', 
      value: '78.5%', 
      change: '기준', 
      trend: 'up', 
      icon: Calculator, 
      color: 'blue', 
      href: '/accounting',
      desc: '전체 재적 인원 기준'
    },
    { 
      title: '정체비 납부율', 
      value: '89.9%', 
      change: '달성', 
      trend: 'up', 
      icon: Calculator, 
      color: 'blue', 
      href: '/accounting',
      desc: '역대 최고 납부율 달성'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">마스터 컨트롤 타워 (Dashboard)</h2>
          <p className="text-gray-500 mt-1">교구 사역 현황을 한눈에 파악하고 전략적으로 관리합니다.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const hasAccess = user && NAV_ITEMS.find(item => item.href === stat.href)?.roles.includes(user.role);

          return (
            <button
              key={idx}
              onClick={() => hasAccess && navigate(stat.href)}
              disabled={!hasAccess}
              className={cn(
                "relative bg-white p-5 sm:p-6 rounded-2xl shadow-sm border transition-all text-left group",
                hasAccess 
                  ? "border-gray-100 hover:border-blue-200 hover:shadow-md cursor-pointer" 
                  : "border-gray-50 opacity-70 cursor-not-allowed"
              )}
            >
              <div className={cn(
                "absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl",
                stat.color === 'blue' ? "bg-blue-600" : 
                stat.color === 'amber' ? "bg-amber-400" : "bg-gray-300"
              )} />
              
              <div className="flex justify-between items-start mb-4">
                <div className={cn(
                  "p-2.5 rounded-xl",
                  stat.color === 'blue' ? "bg-blue-50 text-blue-600" : 
                  stat.color === 'amber' ? "bg-amber-50 text-amber-600" : "bg-gray-50 text-gray-400"
                )}>
                  <stat.icon size={22} />
                </div>
                <div className={cn(
                  "p-1 rounded-full border",
                  stat.trend === 'up' ? "border-blue-100 text-blue-500" : "border-amber-100 text-amber-500"
                )}>
                  {stat.trend === 'up' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  {stat.desc} <span className={cn(
                    "font-bold",
                    stat.trend === 'up' ? "text-blue-600" : "text-amber-600"
                  )}>{stat.change}</span>
                </p>
              </div>

              {hasAccess && (
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} className="text-blue-400" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">원인-결과 상관관계 차트</h3>
              <p className="text-sm text-gray-500">심방 횟수의 증감이 이후 예배 출석률(선)에 미치는 영향을 월별로 추적합니다.</p>
            </div>
            <select className="text-xs border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
              <option>심방(원인) → 예배(결과)</option>
            </select>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
                <Bar yAxisId="left" dataKey="심방" name="월간 심방 횟수 (회)" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" dataKey="예배" name="예배 출석률 (%)" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4, fill: '#F59E0B' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">시스템 분석 인사이트</h3>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <div className="flex gap-3">
                <AlertCircle className="text-red-500 shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-red-900">심야라디오 출결 하락 주의</h4>
                  <p className="text-xs text-red-700 mt-1 leading-relaxed">
                    이번 달 심야라디오 출결 지표가 전월 대비 15% 하락했습니다. 교육 부서의 관심 전환이 요구됩니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
              <div className="flex gap-3">
                <AlertCircle className="text-amber-500 shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">중점 전도 캠페인 필요</h4>
                  <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                    현재 새가족 정착률 7%로 정체 중입니다. 5주 교육 수료 후 신앙 정착을 위한 멘토링 강화가 필요합니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="flex gap-3">
                <CheckCircle2 className="text-blue-500 shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-bold text-blue-900">재정 참여도 안정권</h4>
                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                    정체비 재적 납부율이 89.9%로 역대 최고치를 기록하고 있습니다. 교구원들의 헌신도가 매우 높습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
