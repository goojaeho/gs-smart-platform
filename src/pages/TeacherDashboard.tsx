import Layout from '../components/common/Layout';
import DashboardCard from '../components/common/DashboardCard';
import { students, teachers } from '../data/mockData';
import { 
  Users, TrendingUp, Clock, AlertTriangle, CheckCircle, Calendar, FileText, BarChart3,
  Bell, MessageSquare, Video, BookOpen, UserCheck, Settings, StickyNote,
  Brain, HelpCircle, Star, ChevronRight, Activity, Target, Award
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

const TeacherDashboard = () => {
  const [memoText, setMemoText] = useState('');
  const [showMemoPanel, setShowMemoPanel] = useState(false);
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

  // 새로운 데이터 추가
  const incomingQuestions = [
    { id: 1, student: '김민준', subject: '수학', question: '분수 나눗셈이 어려워요', time: '10분 전', priority: 'high' },
    { id: 2, student: '이서연', subject: '영어', question: 'Present Perfect가 헷갈려요', time: '30분 전', priority: 'medium' },
    { id: 3, student: '박지호', subject: '과학', question: '화학반응식을 모르겠어요', time: '1시간 전', priority: 'low' },
  ];

  const mentoringService = {
    totalSessions: 24,
    openRooms: 3,
    completedToday: 5,
    scheduledToday: 2,
    nextSession: {
      time: '15:00',
      student: '최유나',
      type: '학습상담'
    }
  };

  const announcements = [
    { id: 1, title: '2025년 1학기 교육과정 변경 안내', urgent: true, time: '2시간 전' },
    { id: 2, title: '학부모 상담 주간 일정 확인', urgent: false, time: '1일 전' },
    { id: 3, title: 'AI 진단 시스템 업데이트 완료', urgent: false, time: '2일 전' },
  ];

  const todaySchedule = [
    { time: '09:00-10:00', activity: '5학년 수학 수업', type: 'class' },
    { time: '10:30-11:30', activity: '6학년 영어 수업', type: 'class' },
    { time: '14:00-15:00', activity: '김민준 멘토링', type: 'mentoring' },
    { time: '15:30-16:30', activity: '학부모 상담 - 이서연', type: 'consultation' },
    { time: '17:00-18:00', activity: 'AI 진단 결과 검토', type: 'admin' },
  ];

  const recentMemos = [
    '김민준 - 수학 심화 과정 추천',
    '이서연 - 영어 스피킹 개선 계획',
    '박지호 - 학습 동기 부여 필요',
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* 상단 헤더 및 알림 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">교사 대시보드</h2>
            <p className="text-gray-600 mt-1">{teacherData.centerName} • {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">알림 {announcements.filter(a => a.urgent).length}개</span>
            </div>
            <button 
              onClick={() => setShowMemoPanel(!showMemoPanel)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <StickyNote className="w-4 h-4" />
              <span>메모</span>
            </button>
          </div>
        </div>

        {/* 긴급 공지사항 배너 */}
        {announcements.filter(a => a.urgent).length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="font-medium text-red-700">긴급 공지</span>
            </div>
            <p className="text-sm text-red-600 mt-1">
              {announcements.find(a => a.urgent)?.title}
            </p>
          </div>
        )}

        {/* 센터 상태 개요 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
            title="미답변 질문"
            value={`${incomingQuestions.length}개`}
            icon={<HelpCircle className="w-6 h-6" />}
            color="bg-yellow-500"
          />
          <DashboardCard
            title="진행중 멘토링"
            value={`${mentoringService.openRooms}개`}
            icon={<Video className="w-6 h-6" />}
            color="bg-purple-500"
          />
          <DashboardCard
            title="오늘 일정"
            value={`${todaySchedule.length}개`}
            icon={<Calendar className="w-6 h-6" />}
            color="bg-orange-500"
          />
        </div>

        <div className={`grid gap-6 ${showMemoPanel ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1 lg:grid-cols-3'}`}>
          <div className={`space-y-6 ${showMemoPanel ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
            {/* 학생 현재 상태 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">학생 학습 현황</h3>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">활발: {centerStudents.filter(s => s.level >= 5).length}명</span>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">관심필요: {needsAttention.length}명</span>
                </div>
              </div>
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

            {/* 들어온 질문 목록 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">들어온 질문</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                  <span>전체보기</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {incomingQuestions.map((question) => (
                  <div key={question.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{question.student}</span>
                        <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">{question.subject}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          question.priority === 'high' ? 'bg-red-500' :
                          question.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-1">{question.question}</p>
                      <p className="text-xs text-gray-400 mt-1">{question.time}</p>
                    </div>
                    <button className="ml-2 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                      답변하기
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 멘토링 서비스 정보 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">멘토링 서비스</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{mentoringService.totalSessions}</div>
                  <div className="text-sm text-gray-600 mt-1">총 세션</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{mentoringService.openRooms}</div>
                  <div className="text-sm text-gray-600 mt-1">진행중</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{mentoringService.completedToday}</div>
                  <div className="text-sm text-gray-600 mt-1">오늘 완료</div>
                </div>
              </div>
              {mentoringService.nextSession && (
                <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">다음 세션</p>
                      <p className="text-sm text-gray-600">{mentoringService.nextSession.time} - {mentoringService.nextSession.student} ({mentoringService.nextSession.type})</p>
                    </div>
                    <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                      참여하기
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 일별 출석률 차트 */}
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

          {/* 오른쪽 사이드바 */}
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

            {/* 일정 관리 */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">오늘의 일정</h3>
                <Calendar className="w-5 h-5" />
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="pb-3 border-b border-white border-opacity-20 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.time}</p>
                        <p className="text-xs opacity-90 mt-1">{item.activity}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        item.type === 'class' ? 'bg-yellow-300' :
                        item.type === 'mentoring' ? 'bg-green-300' :
                        item.type === 'consultation' ? 'bg-blue-300' : 'bg-purple-300'
                      }`} />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors text-sm">
                일정 추가
              </button>
            </div>

            {/* 공지사항 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">공지사항</h3>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className={`p-3 rounded-lg ${
                    announcement.urgent ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {announcement.urgent && <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                          <p className={`text-sm font-medium line-clamp-2 ${
                            announcement.urgent ? 'text-red-700' : 'text-gray-900'
                          }`}>
                            {announcement.title}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{announcement.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 빠른 작업 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">빠른 작업</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all text-sm font-medium text-left flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>AI 학습 진단 리포트 생성</span>
                </button>
                <button className="w-full py-3 px-4 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-lg hover:from-green-100 hover:to-green-200 transition-all text-sm font-medium text-left flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>주간 학습 계획 수립</span>
                </button>
                <button className="w-full py-3 px-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all text-sm font-medium text-left flex items-center space-x-2">
                  <Video className="w-4 h-4" />
                  <span>멘토링 일지 작성</span>
                </button>
                <button className="w-full py-3 px-4 bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all text-sm font-medium text-left flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>공지사항 작성</span>
                </button>
              </div>
            </div>
          </div>

          {/* 메모 패널 */}
          {showMemoPanel && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">메모</h3>
                  <button 
                    onClick={() => setShowMemoPanel(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                <textarea
                  value={memoText}
                  onChange={(e) => setMemoText(e.target.value)}
                  placeholder="메모를 입력하세요..."
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <button className="w-full mt-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                  저장
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="font-medium text-gray-900 mb-3">최근 메모</h4>
                <div className="space-y-2">
                  {recentMemos.map((memo, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded text-sm text-gray-700">
                      {memo}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TeacherDashboard;