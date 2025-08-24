import Layout from '../../components/common/Layout';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Users, BookOpen, Award, Download, Calendar } from 'lucide-react';
import { useState } from 'react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const monthlyData = [
    { month: '2023-09', students: 450, completion: 72, satisfaction: 4.2 },
    { month: '2023-10', students: 480, completion: 75, satisfaction: 4.3 },
    { month: '2023-11', students: 520, completion: 78, satisfaction: 4.4 },
    { month: '2023-12', students: 510, completion: 76, satisfaction: 4.3 },
    { month: '2024-01', students: 550, completion: 82, satisfaction: 4.5 },
  ];

  const subjectPerformance = [
    { subject: '국어', students: 450, avgScore: 78, growth: 5 },
    { subject: '영어', students: 420, avgScore: 82, growth: 8 },
    { subject: '수학', students: 480, avgScore: 85, growth: 12 },
    { subject: '과학', students: 380, avgScore: 80, growth: 6 },
    { subject: '사회', students: 350, avgScore: 76, growth: 3 },
    { subject: 'AI/코딩', students: 320, avgScore: 88, growth: 15 },
  ];

  const ageDistribution = [
    { name: '초1-2', value: 15, color: '#3b82f6' },
    { name: '초3-4', value: 25, color: '#22c55e' },
    { name: '초5-6', value: 35, color: '#a855f7' },
    { name: '중등', value: 20, color: '#f97316' },
    { name: '고등', value: 5, color: '#ef4444' },
  ];

  const centerPerformance = [
    { center: '중앙센터', students: 180, performance: 88 },
    { center: '북부센터', students: 150, performance: 85 },
    { center: '남부센터', students: 120, performance: 82 },
    { center: '동부센터', students: 100, performance: 79 },
    { center: '서부센터', students: 90, performance: 76 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">통계 분석</h2>
            <p className="text-gray-600 mt-1">경산시 스마트학습 플랫폼 종합 분석</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">주간</option>
              <option value="month">월간</option>
              <option value="quarter">분기</option>
              <option value="year">연간</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Download className="w-4 h-4" />
              <span>보고서 다운로드</span>
            </button>
          </div>
        </div>

        {/* 핵심 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-green-600">+8.2%</span>
            </div>
            <h3 className="text-sm text-gray-600">총 사용자</h3>
            <p className="text-2xl font-bold text-gray-900">2,847명</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-green-500" />
              <span className="text-sm text-green-600">+12.5%</span>
            </div>
            <h3 className="text-sm text-gray-600">월 활성 사용자</h3>
            <p className="text-2xl font-bold text-gray-900">2,156명</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <span className="text-sm text-green-600">+5.3%</span>
            </div>
            <h3 className="text-sm text-gray-600">평균 학습시간</h3>
            <p className="text-2xl font-bold text-gray-900">12.5시간</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-yellow-500" />
              <span className="text-sm text-green-600">+0.2</span>
            </div>
            <h3 className="text-sm text-gray-600">만족도</h3>
            <p className="text-2xl font-bold text-gray-900">4.5/5.0</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 월별 성장 추이 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">월별 성장 추이</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="students" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="학생 수" />
                <Area type="monotone" dataKey="completion" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} name="완료율 (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* 과목별 성과 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">과목별 성과</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" fill="#3b82f6" name="평균 점수" />
                <Bar dataKey="growth" fill="#22c55e" name="성장률 (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 연령별 분포 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">연령별 분포</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ageDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 센터별 성과 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">센터별 성과</h3>
            <div className="space-y-3">
              {centerPerformance.map((center, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{center.center}</span>
                    <span className="text-sm text-gray-600">{center.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${center.performance}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">학생 {center.students}명</p>
                </div>
              ))}
            </div>
          </div>

          {/* 주요 지표 요약 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">주요 성과 지표</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-gray-700">목표 달성률</span>
                <span className="font-bold text-green-600">92%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-gray-700">재등록률</span>
                <span className="font-bold text-blue-600">87%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm text-gray-700">학부모 만족도</span>
                <span className="font-bold text-purple-600">4.6/5.0</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm text-gray-700">교사 평가</span>
                <span className="font-bold text-yellow-600">4.8/5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI 인사이트 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">AI 분석 인사이트</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">🎯 주요 성과</h4>
              <p className="text-sm text-white/90">
                AI/코딩 과목이 15% 성장률로 가장 높은 관심을 받고 있으며, 
                전체 학습 완료율이 전월 대비 7% 상승했습니다.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">⚠️ 개선 필요</h4>
              <p className="text-sm text-white/90">
                서부센터의 성과가 다른 센터 대비 10% 낮습니다. 
                교사 추가 배치와 시설 개선이 필요합니다.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">📈 예측</h4>
              <p className="text-sm text-white/90">
                현재 성장률 유지 시 2024년 2분기까지 
                전체 사용자 3,500명 달성이 예상됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;