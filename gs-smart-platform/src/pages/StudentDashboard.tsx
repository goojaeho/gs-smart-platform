import Layout from '../components/common/Layout';
import DashboardCard from '../components/common/DashboardCard';
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">안녕하세요, {studentData.name}님!</h2>
            <p className="text-gray-600 mt-1">오늘도 즐거운 학습 시작해볼까요?</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">나의 레벨</p>
              <p className="text-2xl font-bold text-blue-600">Lv.{studentData.level}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">보유 포인트</p>
              <p className="text-2xl font-bold text-orange-600">{studentData.points.toLocaleString()}P</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">오늘의 학습 미션</h3>
                <span className="text-sm text-gray-500">AI 맞춤 추천</span>
              </div>
              <div className="space-y-3">
                {todayMissions.map((mission) => (
                  <div key={mission.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-12 rounded-full ${
                        mission.difficulty === '쉬움' ? 'bg-green-400' : 
                        mission.difficulty === '보통' ? 'bg-yellow-400' : 'bg-red-400'
                      }`} />
                      <div>
                        <h4 className="font-medium text-gray-900">{mission.title}</h4>
                        <p className="text-sm text-gray-500">{mission.subject} • {mission.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-orange-600">+{mission.points}P</span>
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        시작하기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">주간 학습 패턴</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyStudyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="korean" fill="#3b82f6" name="국어" />
                  <Bar dataKey="english" fill="#f97316" name="영어" />
                  <Bar dataKey="math" fill="#22c55e" name="수학" />
                  <Bar dataKey="science" fill="#a855f7" name="과학" />
                  <Bar dataKey="social" fill="#f59e0b" name="사회" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">과목별 성취도</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={subjectRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="성취도" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">최근 획득 배지</h3>
              <div className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">멘토링 일정</h3>
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <p className="text-sm opacity-90">다음 멘토링</p>
                <p className="text-xl font-bold">오늘 오후 4:00</p>
                <p className="text-sm opacity-90">김멘토 선생님과 수학 학습</p>
                <button className="mt-3 w-full py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors text-sm font-medium">
                  화상 멘토링 참여하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;