import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { CheckCircle2, Users, Calendar, Loader2 } from 'lucide-react';

export default function WorshipManagement() {
  const { user } = useAuth();
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    rate: 0,
    change: 0,
    absentCount: 0
  });

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('worship_attendance')
        .select('*')
        .order('attendance_date', { ascending: false });

      if (error) throw error;
      setAttendanceRecords(data || []);
      
      // Calculate simple stats
      if (data && data.length > 0) {
        const present = data.filter(r => r.is_present).length;
        const rate = (present / data.length) * 100;
        setStats({
          rate: Math.round(rate * 10) / 10,
          change: 2.5, // Mock change for now
          absentCount: data.length - present
        });
      }
    } catch (err) {
      console.error('Error fetching attendance:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttendanceCheck = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('worship_attendance')
        .insert([{
          user_id: user.id,
          team_name: user.position === '교구원' ? '일반팀' : user.position,
          attendance_date: new Date().toISOString().split('T')[0],
          is_present: true
        }]);

      if (error) throw error;
      alert('출석 체크가 완료되었습니다!');
      fetchAttendance();
    } catch (err: any) {
      alert('출석 체크 중 오류가 발생했습니다: ' + err.message);
    }
  };

  const chartData = [
    { name: '1주차', value: 78 },
    { name: '2주차', value: 82 },
    { name: '3주차', value: 80 },
    { name: '4주차', value: 88 },
    { name: '5주차', value: stats.rate || 85 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">예배 관리</h2>
          <p className="text-gray-500 mt-1">상암지역 전체 예배 출석 현황을 관리합니다.</p>
        </div>
        <button 
          onClick={handleAttendanceCheck}
          className="w-full sm:w-auto bg-[#1E3A8A] text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#1E3A8A]/90 shadow-lg shadow-blue-900/10 transition-all"
        >
          <Calendar size={18} />
          출석 체크 (오늘)
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : (
        <>
          <div className="bg-[#1E3A8A] p-10 rounded-2xl text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-sm opacity-80 mb-2">상암지역 주일예배 출석률 (실시간)</p>
              <h3 className="text-5xl font-bold mb-4">{stats.rate}%</h3>
              <p className="text-sm flex items-center gap-2">
                <span className="bg-white/20 px-2 py-1 rounded">현재 기록된 데이터 기준</span>
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-full bg-white/5 -skew-x-12 translate-x-12"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-8">매월 주차별 예배 출석률</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
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
              <h3 className="text-lg font-bold text-gray-900 mb-6">최근 출석 기록</h3>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {attendanceRecords.length > 0 ? (
                  attendanceRecords.map((record) => (
                    <div key={record.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-gray-900">{record.team_name}</p>
                        <p className="text-xs text-gray-500">{record.attendance_date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {record.is_present ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">출석</span>
                        ) : (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">결석</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-10">기록된 출석 데이터가 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
