import Layout from '../components/common/Layout';
import DashboardCard from '../components/common/DashboardCard';
import LearningMate from '../components/student/LearningMate';
import { students, weeklyStudyData, learningContents } from '../data/mockData';
import { useAuthStore } from '../store/authStore';
import { 
  Trophy, Clock, Target, BookOpen, TrendingUp, 
  Calendar, Award, Brain, Zap, Star 
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const StudentDashboard = () => {
  const { user } = useAuthStore();
  const studentData = students.find(s => s.id === user?.id) || students[0];

  // Learning Mate data
  const currentExp = 340;
  const nextLevelExp = 500;
  const weeklyProgress = 75;

  const todayMissions = [
    { id: 1, title: '수학 - 분수의 덧셈', subject: '수학', time: '15분', difficulty: '보통', points: 50 },
    { id: 2, title: '영어 - 기본 회화 연습', subject: '영어', time: '20분', difficulty: '쉬움', points: 30 },
    { id: 3, title: '국어 - 독해력 향상', subject: '국어', time: '25분', difficulty: '어려움', points: 70 },
  ];

  const recentAchievements = [
    { id: 1, title: '일주일 연속 학습', icon: '🔥', date: '2024-01-18' },
    { id: 2, title: '수학 마스터', icon: '🎯', date: '2024-01-17' },
    { id: 3, title: '독서왕', icon: '📚', date: '2024-01-15' },
  ];

  const subjectRadarData = [
    { subject: '국어', value: studentData.subjects.korean, fullMark: 100 },
    { subject: '영어', value: studentData.subjects.english, fullMark: 100 },
    { subject: '수학', value: studentData.subjects.math, fullMark: 100 },
    { subject: '과학', value: studentData.subjects.science, fullMark: 100 },
    { subject: '사회', value: studentData.subjects.social, fullMark: 100 },
  ];

  return (
    <Layout>
      <div className="flex gap-8">
        {/* Learning Mate Sidebar */}
        <div className="w-80 flex-shrink-0">
          <LearningMate
            studentLevel={studentData.level}
            currentExp={currentExp}
            nextLevelExp={nextLevelExp}
            studentName={studentData.name}
            weeklyProgress={weeklyProgress}
            weakArea="수학 문제"
          />
        </div>

        {/* Main Dashboard Content */}
        <div className="flex-1 space-y-8">
          {/* Typography Hierarchy - Large Bold Heading (H1) */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">안녕하세요, {studentData.name}님!</h1>
              <p className="text-lg text-gray-600">오늘도 즐거운 학습 시작해볼까요?</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center bg-[#f9fafb] rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-500 font-medium">나의 레벨</p>
                <p className="text-3xl font-bold text-[#0397D6] mt-1">Lv.{studentData.level}</p>
              </div>
              <div className="text-center bg-[#f9fafb] rounded-xl p-4 border border-gray-100">
                <p className="text-sm text-gray-500 font-medium">보유 포인트</p>
                <p className="text-3xl font-bold text-[#63C29D] mt-1">{studentData.points.toLocaleString()}P</p>
              </div>
            </div>
          </div>

          {/* Dashboard Cards - 24px gap grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="이번 주 학습시간"
            value={`${studentData.weeklyStudyTime}시간`}
            icon={<Clock className="w-6 h-6" />}
            trend={{ value: 12, isPositive: true }}
            color="bg-blue-500"
          />
          <DashboardCard
            title="완료한 미션"
            value="24개"
            icon={<Target className="w-6 h-6" />}
            trend={{ value: 8, isPositive: true }}
            color="bg-green-500"
          />
          <DashboardCard
            title="연속 학습일"
            value="7일"
            icon={<Trophy className="w-6 h-6" />}
            color="bg-yellow-500"
          />
          <DashboardCard
            title="이번 달 독서량"
            value="5권"
            icon={<BookOpen className="w-6 h-6" />}
            trend={{ value: 25, isPositive: true }}
            color="bg-purple-500"
          />
        </div>

          {/* Main Content Grid - 24px gaps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Today's Learning Missions */}
              <div className="bg-[#f9fafb] rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">오늘의 학습 미션</h2>
                  <span className="text-sm text-[#6b7280] font-medium bg-gray-100 px-3 py-1 rounded-full">AI 맞춤 추천</span>
                </div>
                <div className="space-y-4">
                {todayMissions.map((mission) => (
                  <div key={mission.id} className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-16 rounded-full ${
                        mission.difficulty === '쉬움' ? 'bg-[#63C29D]' : 
                        mission.difficulty === '보통' ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{mission.title}</h3>
                        <p className="text-sm text-[#6b7280] font-medium">{mission.subject} • {mission.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-[#63C29D] bg-green-50 px-3 py-1 rounded-full">+{mission.points}P</span>
                      <button className="px-5 py-2 bg-gradient-to-r from-[#0397D6] to-blue-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-semibold text-sm">
                        시작하기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

              {/* Weekly Study Pattern Chart */}
              <div className="bg-[#f9fafb] rounded-xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">주간 학습 패턴</h2>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={weeklyStudyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#9ca3af" />
                    <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="korean" fill="#0397D6" name="국어" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="english" fill="#63C29D" name="영어" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="math" fill="#3b82f6" name="수학" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="science" fill="#8b5cf6" name="과학" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="social" fill="#f59e0b" name="사회" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Subject Performance Radar Chart */}
              <div className="bg-[#f9fafb] rounded-xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">과목별 성취도</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={subjectRadarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                    <Radar 
                      name="성취도" 
                      dataKey="value" 
                      stroke="#0397D6" 
                      fill="#0397D6" 
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Achievements */}
              <div className="bg-[#f9fafb] rounded-xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">최근 획득 배지</h2>
                <div className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div>
                          <p className="font-bold text-gray-900 text-base">{achievement.title}</p>
                          <p className="text-sm text-[#6b7280] font-medium">{achievement.date}</p>
                        </div>
                      </div>
                      <Star className="w-6 h-6 text-yellow-500" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentoring Schedule */}
              <div className="bg-gradient-to-br from-[#0397D6] to-[#63C29D] rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">멘토링 일정</h2>
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="space-y-4">
                  <p className="text-sm opacity-90 font-medium">다음 멘토링</p>
                  <p className="text-2xl font-bold">오늘 오후 4:00</p>
                  <p className="text-sm opacity-90">김멘토 선생님과 수학 학습</p>
                  <button className="mt-4 w-full py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all transform hover:scale-[1.02] font-semibold">
                    화상 멘토링 참여하기
                  </button>
                </div>
              </div>
          </div>
        </div>
        
        </div> {/* End of main dashboard content */}
      </div> {/* End of flex container */}
    </Layout>
  );
};

export default StudentDashboard;