import Layout from '../components/common/Layout';
import DashboardCard from '../components/common/DashboardCard';
import { students, mentoringHistory, monthlyProgressData } from '../data/mockData';
import { 
  Clock, TrendingUp, BookOpen, Award, Calendar, 
  MessageSquare, FileText, Heart, AlertCircle 
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ParentDashboard = () => {
  const childData = students[0];

  const subjectTimeData = [
    { name: '국어', value: 25, color: '#3b82f6' },
    { name: '영어', value: 20, color: '#f97316' },
    { name: '수학', value: 30, color: '#22c55e' },
    { name: '과학', value: 15, color: '#a855f7' },
    { name: '사회', value: 10, color: '#f59e0b' },
  ];

  const weeklyStudyHours = [
    { week: '1주차', hours: 10.5 },
    { week: '2주차', hours: 12.3 },
    { week: '3주차', hours: 11.8 },
    { week: '4주차', hours: 13.2 },
  ];

  const recentMentoring = mentoringHistory.filter(m => m.studentId === childData.id).slice(0, 3);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">학부모 대시보드</h2>
          <p className="text-gray-600 mt-1">자녀의 학습 현황을 한눈에 확인하세요</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {childData.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{childData.name}</h3>
                <p className="text-sm text-gray-600">{childData.school} {childData.grade}학년</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">이번 주 학습시간</p>
                <p className="text-xl font-bold text-blue-600">{childData.weeklyStudyTime}시간</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">학습 레벨</p>
                <p className="text-xl font-bold text-green-600">Lv.{childData.level}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="월 평균 학습시간"
            value="48.5시간"
            icon={<Clock className="w-6 h-6" />}
            trend={{ value: 15, isPositive: true }}
            color="bg-blue-500"
          />
          <DashboardCard
            title="종합 성취도"
            value="85.2%"
            icon={<TrendingUp className="w-6 h-6" />}
            trend={{ value: 8, isPositive: true }}
            color="bg-green-500"
          />
          <DashboardCard
            title="완독한 도서"
            value="12권"
            icon={<BookOpen className="w-6 h-6" />}
            color="bg-purple-500"
          />
          <DashboardCard
            title="획득 배지"
            value="28개"
            icon={<Award className="w-6 h-6" />}
            trend={{ value: 12, isPositive: true }}
            color="bg-yellow-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">월별 성취도 추이</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} name="성취도(%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">주간 학습시간 변화</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyStudyHours}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#22c55e" name="학습시간" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">최근 멘토링 기록</h3>
              <div className="space-y-3">
                {recentMentoring.map((session) => (
                  <div key={session.id} className="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{session.subject}</h4>
                        <p className="text-sm text-gray-600 mt-1">{session.content}</p>
                        <p className="text-xs text-gray-500 mt-2">{session.date} • {session.duration}분</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.type === 'learning' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {session.type === 'learning' ? '학습' : '정서'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">과목별 학습 비중</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={subjectTimeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subjectTimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {subjectTimeData.map((subject) => (
                  <div key={subject.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                      <span className="text-sm text-gray-600">{subject.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{subject.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">주의 필요 항목</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">영어 학습 시간 부족</p>
                    <p className="text-xs text-gray-600 mt-1">권장 시간 대비 70% 수준</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">다음 멘토링 예정</p>
                    <p className="text-xs text-gray-600 mt-1">1월 20일 오후 4시</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">상담 신청</h3>
                <MessageSquare className="w-5 h-5" />
              </div>
              <p className="text-sm opacity-90 mb-4">
                자녀의 학습 및 정서 상담이 필요하신가요?
              </p>
              <button className="w-full py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors text-sm font-medium">
                상담 신청하기
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">월간 리포트</h3>
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                자녀의 상세한 학습 분석 리포트를 확인하세요
              </p>
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                리포트 다운로드
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ParentDashboard;