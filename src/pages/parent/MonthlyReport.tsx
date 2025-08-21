import Layout from '../../components/common/Layout';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, Download, Calendar, TrendingUp, BookOpen, Clock, Award, Target } from 'lucide-react';
import { useState } from 'react';
import { students } from '../../data/mockData';

const MonthlyReport = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const childData = students[0];

  const monthlyStudyHours = [
    { week: '1주차', hours: 12.5, target: 15 },
    { week: '2주차', hours: 14.2, target: 15 },
    { week: '3주차', hours: 13.8, target: 15 },
    { week: '4주차', hours: 15.5, target: 15 },
  ];

  const subjectDistribution = [
    { name: '국어', value: 20, color: '#ef4444' },
    { name: '영어', value: 18, color: '#f97316' },
    { name: '수학', value: 25, color: '#22c55e' },
    { name: '과학', value: 15, color: '#a855f7' },
    { name: '사회', value: 12, color: '#f59e0b' },
    { name: 'AI/코딩', value: 10, color: '#3b82f6' },
  ];

  const achievementTrend = [
    { month: '2023-09', score: 75 },
    { month: '2023-10', score: 78 },
    { month: '2023-11', score: 82 },
    { month: '2023-12', score: 80 },
    { month: '2024-01', score: 85 },
  ];

  const strengths = [
    { subject: '수학', topic: '분수의 나눗셈', improvement: '+15%' },
    { subject: '영어', topic: '문법 - 현재완료', improvement: '+12%' },
    { subject: 'AI/코딩', topic: 'Python 기초', improvement: '+20%' },
  ];

  const weaknesses = [
    { subject: '국어', topic: '논설문 쓰기', needsWork: '구조화 연습 필요' },
    { subject: '과학', topic: '전기회로', needsWork: '실험 학습 권장' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">월간 리포트</h2>
            <p className="text-gray-600 mt-1">{childData.name}의 {selectedMonth} 학습 종합 분석</p>
          </div>
          <div className="flex space-x-3">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Download className="w-4 h-4" />
              <span>PDF 다운로드</span>
            </button>
          </div>
        </div>

        {/* 월간 핵심 성과 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-green-600">목표 달성</span>
            </div>
            <h3 className="text-sm text-gray-600">총 학습시간</h3>
            <p className="text-2xl font-bold text-gray-900">56시간</p>
            <p className="text-xs text-gray-500 mt-1">목표: 60시간 (93%)</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-green-500" />
              <span className="text-sm text-green-600">+8개</span>
            </div>
            <h3 className="text-sm text-gray-600">완료 콘텐츠</h3>
            <p className="text-2xl font-bold text-gray-900">127개</p>
            <p className="text-xs text-gray-500 mt-1">전월 대비 +6.7%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <span className="text-sm text-green-600">+5%</span>
            </div>
            <h3 className="text-sm text-gray-600">평균 성취도</h3>
            <p className="text-2xl font-bold text-gray-900">85%</p>
            <p className="text-xs text-gray-500 mt-1">학년 평균: 78%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-yellow-500" />
              <span className="text-sm text-orange-600">신규</span>
            </div>
            <h3 className="text-sm text-gray-600">획득 배지</h3>
            <p className="text-2xl font-bold text-gray-900">5개</p>
            <p className="text-xs text-gray-500 mt-1">수학 마스터 외 4개</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 주간별 학습시간 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">주간별 학습시간 분석</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyStudyHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="hours" fill="#3b82f6" name="실제 학습" />
                <Bar dataKey="target" fill="#e5e7eb" name="목표" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 과목별 학습 비중 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">과목별 학습 비중</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={subjectDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 성취도 추이 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">최근 5개월 성취도 추이</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={achievementTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[70, 90]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} name="성취도 (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 강점 및 약점 분석 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">이번 달 강점 분야</h3>
            <div className="space-y-3">
              {strengths.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">{item.subject}</span>
                    <p className="text-sm text-gray-600">{item.topic}</p>
                  </div>
                  <span className="text-green-600 font-bold">{item.improvement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">보완 필요 분야</h3>
            <div className="space-y-3">
              {weaknesses.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">{item.subject}</span>
                    <p className="text-sm text-gray-600">{item.topic}</p>
                  </div>
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                    {item.needsWork}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI 분석 코멘트 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-8 h-8" />
            <h3 className="text-xl font-bold">AI 종합 분석</h3>
          </div>
          <div className="space-y-3">
            <p className="text-white/90">
              {childData.name} 학생은 이번 달 <span className="font-bold">수학</span>과 <span className="font-bold">AI/코딩</span> 분야에서 
              뛰어난 성장을 보였습니다. 특히 문제 해결 능력이 15% 향상되었습니다.
            </p>
            <p className="text-white/90">
              <span className="font-bold">국어 논술</span> 부분은 추가 학습이 필요하며, 
              주 2회 작문 연습을 권장합니다. 다음 달 목표는 전체 성취도 88% 달성입니다.
            </p>
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-sm font-medium">다음 달 추천 학습 계획</p>
              <ul className="mt-2 space-y-1 text-sm text-white/80">
                <li>• 국어: 논설문 구조 집중 학습 (주 3시간)</li>
                <li>• 과학: 실험 키트 활용 실습 (주 2시간)</li>
                <li>• AI/코딩: Python 중급 과정 시작</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MonthlyReport;