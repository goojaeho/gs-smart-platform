import Layout from '../components/common/Layout';
import DashboardCard from '../components/common/DashboardCard';
import { students, teachers } from '../data/mockData';
import { 
  Users, TrendingUp, Clock, AlertTriangle, 
  CheckCircle, Calendar, FileText, BarChart3
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TeacherDashboard = () => {
  const teacherData = teachers[0];
  const centerStudents = students.filter(s => s.centerId === teacherData.centerId);

  const attendanceData = [
    { date: '1/15', rate: 92 },
    { date: '1/16', rate: 88 },
    { date: '1/17', rate: 95 },
    { date: '1/18', rate: 90 },
    { date: '1/19', rate: 93 },
  ];

  const subjectAverages = [
    { subject: '국어', average: 82 },
    { subject: '영어', average: 78 },
    { subject: '수학', average: 85 },
    { subject: '과학', average: 80 },
    { subject: '사회', average: 79 },
  ];

  const needsAttention = centerStudents.filter(s => 
    Object.values(s.subjects).some(score => score < 80)
  );

  const highPerformers = centerStudents.filter(s => 
    Object.values(s.subjects).every(score => score >= 85)
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">교사 대시보드</h2>
          <p className="text-gray-600 mt-1">{teacherData.centerName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="전체 학생 수"
            value={`${teacherData.studentCount}명`}
            icon={<Users className="w-6 h-6" />}
            color="bg-blue-500"
          />
          <DashboardCard
            title="평균 출석률"
            value="91.6%"
            icon={<CheckCircle className="w-6 h-6" />}
            trend={{ value: 3, isPositive: true }}
            color="bg-green-500"
          />
          <DashboardCard
            title="평균 학습시간"
            value="12.8시간"
            icon={<Clock className="w-6 h-6" />}
            trend={{ value: 5, isPositive: true }}
            color="bg-purple-500"
          />
          <DashboardCard
            title="과제 제출률"
            value="87.3%"
            icon={<FileText className="w-6 h-6" />}
            trend={{ value: -2, isPositive: false }}
            color="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">학생별 학습 현황</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">학생명</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">학년</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">레벨</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">주간 학습시간</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">종합 성취도</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    {centerStudents.map((student) => {
                      const avgScore = Object.values(student.subjects).reduce((a, b) => a + b, 0) / 5;
                      const status = avgScore >= 85 ? 'excellent' : avgScore >= 75 ? 'good' : 'attention';
                      
                      return (
                        <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                                {student.name[0]}
                              </div>
                              <span className="ml-3 font-medium text-gray-900">{student.name}</span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4 text-sm text-gray-600">{student.grade}학년</td>
                          <td className="text-center py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              Lv.{student.level}
                            </span>
                          </td>
                          <td className="text-center py-3 px-4 text-sm text-gray-600">{student.weeklyStudyTime}시간</td>
                          <td className="text-center py-3 px-4">
                            <div className="flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-900">{avgScore.toFixed(1)}%</span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              status === 'excellent' ? 'bg-green-100 text-green-700' :
                              status === 'good' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {status === 'excellent' ? '우수' : status === 'good' ? '양호' : '관심필요'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">일별 출석률 추이</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2} name="출석률(%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">과목별 평균 성취도</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={subjectAverages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="average" fill="#3b82f6" name="평균 점수" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">주의 필요 학생</h3>
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="space-y-3">
                {needsAttention.map((student) => {
                  const weakSubjects = Object.entries(student.subjects)
                    .filter(([_, score]) => score < 80)
                    .map(([subject]) => subject);
                  
                  return (
                    <div key={student.id} className="p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            취약과목: {weakSubjects.join(', ')}
                          </p>
                        </div>
                        <button className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200">
                          상세보기
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">우수 학생</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="space-y-3">
                {highPerformers.map((student) => (
                  <div key={student.id} className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          평균 {(Object.values(student.subjects).reduce((a, b) => a + b, 0) / 5).toFixed(1)}점
                        </p>
                      </div>
                      <span className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        Lv.{student.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">오늘의 일정</h3>
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-3">
                <div className="pb-3 border-b border-white border-opacity-20">
                  <p className="text-sm font-medium">14:00 - 15:00</p>
                  <p className="text-xs opacity-90 mt-1">3학년 수학 보충수업</p>
                </div>
                <div className="pb-3 border-b border-white border-opacity-20">
                  <p className="text-sm font-medium">16:00 - 17:00</p>
                  <p className="text-xs opacity-90 mt-1">멘토링 프로그램 진행</p>
                </div>
                <div>
                  <p className="text-sm font-medium">17:30 - 18:00</p>
                  <p className="text-xs opacity-90 mt-1">학부모 상담</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">빠른 작업</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                <button className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium text-left">
                  AI 학습 진단 리포트 생성
                </button>
                <button className="w-full py-2 px-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium text-left">
                  주간 학습 계획 수립
                </button>
                <button className="w-full py-2 px-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium text-left">
                  멘토링 일지 작성
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;