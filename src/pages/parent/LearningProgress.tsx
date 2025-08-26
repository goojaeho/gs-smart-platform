import Layout from '../../components/common/Layout';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Clock, BookOpen, Award, Calendar, Download, Filter } from 'lucide-react';
import { students, weeklyStudyData, monthlyProgressData } from '../../data/mockData';
import { useState } from 'react';

const LearningProgress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const childData = students[0];

  const subjectProgress = [
    { subject: '국어', current: 85, previous: 78, target: 90 },
    { subject: '영어', current: 78, previous: 72, target: 85 },
    { subject: '수학', current: 92, previous: 88, target: 95 },
    { subject: '과학', current: 88, previous: 85, target: 90 },
    { subject: '사회', current: 83, previous: 80, target: 85 },
  ];

  const studyTimeByDay = [
    { day: '월', planned: 3, actual: 2.8 },
    { day: '화', planned: 3, actual: 3.2 },
    { day: '수', planned: 3, actual: 2.5 },
    { day: '목', planned: 3, actual: 3.5 },
    { day: '금', planned: 3, actual: 2.9 },
    { day: '토', planned: 2, actual: 2.2 },
    { day: '일', planned: 2, actual: 1.8 },
  ];

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">학습 현황</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">{childData.name}의 상세 학습 분석</p>
          </div>
          <div className="flex gap-2">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              <option value="week">주간</option>
              <option value="month">월간</option>
              <option value="quarter">분기</option>
            </select>
            <button className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">리포트 다운로드</span>
              <span className="sm:hidden">다운로드</span>
            </button>
          </div>
        </div>

        {/* 핵심 지표 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
              <span className="text-xs sm:text-sm text-green-600">+12%</span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600">총 학습시간</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">48.5h</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 text-green-500" />
              <span className="text-xs sm:text-sm text-green-600">+8%</span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600">평균 성취도</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">85.2%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 text-purple-500" />
              <span className="text-xs sm:text-sm text-green-600">+3권</span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600">완료 콘텐츠</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">42개</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <Award className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-500" />
              <span className="text-xs sm:text-sm text-green-600">+5개</span>
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600">획듍 배지</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">28개</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* 과목별 성취도 */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">과목별 성취도 분석</h3>
            <div className="space-y-3 sm:space-y-4">
              {subjectProgress.map((subject) => (
                <div key={subject.subject} className="space-y-1 sm:space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base font-medium text-gray-700">{subject.subject}</span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">목표: {subject.target}%</span>
                      <span className="text-sm sm:text-base font-bold text-gray-900">{subject.current}%</span>
                      <span className={`text-xs ${subject.current > subject.previous ? 'text-green-600' : 'text-red-600'}`}>
                        {subject.current > subject.previous ? '↑' : '↓'} {Math.abs(subject.current - subject.previous)}%
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div className="absolute top-0 left-0 h-1.5 sm:h-2 bg-gray-300 rounded-full" style={{ width: `${subject.target}%` }} />
                      <div className="absolute top-0 left-0 h-1.5 sm:h-2 bg-blue-500 rounded-full" style={{ width: `${subject.current}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 학습 시간 분석 */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">일일 학습시간 (계획 vs 실제)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studyTimeByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="planned" fill="#e5e7eb" name="계획" />
                <Bar dataKey="actual" fill="#3b82f6" name="실제" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 주간 학습 패턴 */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">주간 과목별 학습 패턴</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={weeklyStudyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="korean" stackId="a" fill="#ef4444" name="국어" />
              <Bar dataKey="english" stackId="a" fill="#f97316" name="영어" />
              <Bar dataKey="math" stackId="a" fill="#22c55e" name="수학" />
              <Bar dataKey="science" stackId="a" fill="#a855f7" name="과학" />
              <Bar dataKey="social" stackId="a" fill="#f59e0b" name="사회" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
};

export default LearningProgress;