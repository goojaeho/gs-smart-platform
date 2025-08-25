import { useState } from 'react';
import Layout from '../components/common/Layout';
import DashboardCard from '../components/common/DashboardCard';
import { centers, students } from '../data/mockData';
import { 
  Users, Building, TrendingUp, Clock, 
  MapPin, Activity, Download, Filter
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [selectedCenter, setSelectedCenter] = useState<string | null>(null);

  const totalStudents = centers.reduce((sum, center) => sum + center.studentCount, 0);
  const avgAttendance = centers.reduce((sum, center) => sum + center.attendanceRate, 0) / centers.length;
  const avgStudyTime = centers.reduce((sum, center) => sum + center.avgStudyTime, 0) / centers.length;

  const centerPerformance = centers.map(center => ({
    name: center.name.replace('지역아동센터', ''),
    students: center.studentCount,
    attendance: center.attendanceRate,
    studyTime: center.avgStudyTime
  }));

  const gradeDistribution = [
    { grade: '3학년', count: 45, color: '#3b82f6' },
    { grade: '4학년', count: 52, color: '#22c55e' },
    { grade: '5학년', count: 48, color: '#f97316' },
    { grade: '6학년', count: 55, color: '#a855f7' },
  ];

  const monthlyTrend = [
    { month: '8월', students: 180, hours: 2150 },
    { month: '9월', students: 185, hours: 2280 },
    { month: '10월', students: 192, hours: 2420 },
    { month: '11월', students: 195, hours: 2380 },
    { month: '12월', students: 198, hours: 2510 },
    { month: '1월', students: 200, hours: 2630 },
  ];

  const getCenterColor = (rate: number) => {
    if (rate >= 90) return '#22c55e';
    if (rate >= 80) return '#3b82f6';
    if (rate >= 70) return '#f97316';
    return '#ef4444';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">경산시 통합관제 대시보드</h2>
            <p className="text-gray-600 mt-1">22개 지역아동센터 통합 현황</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span className="text-sm">필터</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Download className="w-4 h-4" />
              <span className="text-sm">보고서 다운로드</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="전체 참여 학생"
            value={`${totalStudents}명`}
            icon={<Users className="w-6 h-6" />}
            trend={{ value: 5, isPositive: true }}
            color="bg-blue-500"
          />
          <DashboardCard
            title="운영 센터"
            value="22개"
            icon={<Building className="w-6 h-6" />}
            color="bg-green-500"
          />
          <DashboardCard
            title="평균 출석률"
            value={`${avgAttendance.toFixed(1)}%`}
            icon={<Activity className="w-6 h-6" />}
            trend={{ value: 2.3, isPositive: true }}
            color="bg-purple-500"
          />
          <DashboardCard
            title="평균 학습시간"
            value={`${avgStudyTime.toFixed(1)}시간`}
            icon={<Clock className="w-6 h-6" />}
            trend={{ value: 8, isPositive: true }}
            color="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">경산시 지역아동센터 현황</h3>
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <div className="relative">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600">지도 기반 센터 위치 및 현황</p>
                    <p className="text-xs text-gray-500 mt-1">(실제 구현 시 지도 API 연동)</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {centers.slice(0, 6).map((center) => (
                      <div
                        key={center.id}
                        className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedCenter(center.id)}
                      >
                        <div className="flex items-start space-x-2">
                          <MapPin 
                            className="w-4 h-4 mt-1" 
                            style={{ color: getCenterColor(center.attendanceRate) }}
                          />
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-900">
                              {center.name.replace('지역아동센터', '')}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              학생 {center.studentCount}명
                            </p>
                            <div className="flex items-center mt-1">
                              <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="h-1.5 rounded-full"
                                  style={{ 
                                    width: `${center.attendanceRate}%`,
                                    backgroundColor: getCenterColor(center.attendanceRate)
                                  }}
                                />
                              </div>
                              <span className="ml-2 text-xs text-gray-600">
                                {center.attendanceRate}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedCenter && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">
                    {centers.find(c => c.id === selectedCenter)?.name} 상세 정보
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    클릭한 센터의 상세 현황이 여기에 표시됩니다.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">센터별 성과 비교</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={centerPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#3b82f6" name="출석률(%)" />
                  <Bar dataKey="studyTime" fill="#22c55e" name="평균 학습시간" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">월별 운영 추이</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={2} name="참여 학생수" />
                  <Line yAxisId="right" type="monotone" dataKey="hours" stroke="#22c55e" strokeWidth={2} name="총 학습시간" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">학년별 분포</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="count"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {gradeDistribution.map((item) => (
                  <div key={item.grade} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-gray-600">{item.grade}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.count}명</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">주요 성과 지표</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">목표 달성률</span>
                    <span className="text-sm font-medium text-gray-900">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">학습 참여율</span>
                    <span className="text-sm font-medium text-gray-900">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">멘토링 만족도</span>
                    <span className="text-sm font-medium text-gray-900">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">콘텐츠 활용도</span>
                    <span className="text-sm font-medium text-gray-900">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-4">실시간 모니터링</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">현재 접속자</span>
                  <span className="text-xl font-bold">127명</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">진행중인 수업</span>
                  <span className="text-xl font-bold">18개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-90">활성 멘토링</span>
                  <span className="text-xl font-bold">12개</span>
                </div>
              </div>
              <button className="mt-4 w-full py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors text-sm font-medium">
                실시간 대시보드 보기
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">시스템 상태</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">서버 상태</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">정상</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">데이터베이스</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">정상</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API 응답시간</span>
                  <span className="text-sm font-medium text-gray-900">45ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">스토리지 사용량</span>
                  <span className="text-sm font-medium text-gray-900">62%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;