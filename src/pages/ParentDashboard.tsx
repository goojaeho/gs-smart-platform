import Layout from '../components/common/Layout';
import DashboardCard from '../components/common/DashboardCard';
import { students, mentoringHistory } from '../data/mockData';
import { 
  Clock, TrendingUp, BookOpen, Award, Calendar, MessageSquare, FileText, 
  Heart, AlertCircle, CheckCircle, Activity, Target, Star, ChevronRight,
  User, BarChart3, PieChart as PieChartIcon, Brain, Eye, Download, Bell
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from 'recharts';
import { useState } from 'react';

interface SubjectDetail {
  subject: string;
  contentUsage: number;
  accuracyByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  accuracyByArea: {
    area: string;
    accuracy: number;
  }[];
  trend: number[];
  teacherComment: string;
}

const ParentDashboard = () => {
  const childData = students[0];
  const [selectedView, setSelectedView] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // 자녀 성장 기록 데이터
  const growthRecord = {
    attendance: {
      rate: 95.2,
      totalDays: 60,
      presentDays: 57,
      trend: '+2.3%'
    },
    points: {
      total: 3420,
      thisMonth: 280,
      rank: 5,
      trend: '+15%'
    },
    activities: {
      totalHours: 186,
      thisWeek: 12.5,
      favoriteTime: '오후 4-6시',
      trend: '+8%'
    }
  };

  // 과목별 분석 데이터
  const subjectAnalysis = [
    { subject: '수학', achievement: 88, hours: 45, interest: 92 },
    { subject: '영어', achievement: 82, hours: 38, interest: 78 },
    { subject: '국어', achievement: 90, hours: 42, interest: 85 },
    { subject: '과학', achievement: 85, hours: 35, interest: 95 },
    { subject: '사회', achievement: 78, hours: 28, interest: 72 }
  ];

  // 관심 키워드
  const interestKeywords = [
    { word: '로봇', count: 23 },
    { word: '우주', count: 18 },
    { word: '프로그래밍', count: 15 },
    { word: '과학실험', count: 12 },
    { word: '수학퍼즐', count: 10 }
  ];

  // 현재 읽고 있는 책
  const currentBooks = [
    { title: '어린왕자', progress: 65, category: '문학' },
    { title: '수학의 재미', progress: 40, category: '수학' },
    { title: '과학실험 365', progress: 85, category: '과학' }
  ];

  // 멘토링 일지
  const mentoringJournals = [
    {
      date: '2024-01-25',
      teacher: '김선생님',
      type: '학습상담',
      content: '수학 문제 해결 능력이 크게 향상되었습니다.',
      nextPlan: '응용 문제 도전'
    },
    {
      date: '2024-01-20',
      teacher: '이선생님',
      type: '진로상담',
      content: '과학 분야에 큰 관심을 보이고 있습니다.',
      nextPlan: '과학 심화 프로그램 추천'
    }
  ];

  // 공지사항
  const notices = [
    { id: 1, title: '2월 학부모 간담회 안내', date: '2024-01-26', urgent: true },
    { id: 2, title: '학습 성과 우수상 수상', date: '2024-01-24', urgent: false },
    { id: 3, title: '겨울방학 특별 프로그램', date: '2024-01-22', urgent: false }
  ];

  // 상담 신청 내역
  const consultationHistory = [
    {
      date: '2024-01-15',
      type: '학습상담',
      status: 'completed',
      result: '학습 계획 수정 완료'
    },
    {
      date: '2024-02-01',
      type: '진로상담',
      status: 'scheduled',
      result: '예정'
    }
  ];

  // 과목별 상세 데이터
  const subjectDetails: { [key: string]: SubjectDetail } = {
    '수학': {
      subject: '수학',
      contentUsage: 85,
      accuracyByDifficulty: { easy: 95, medium: 85, hard: 72 },
      accuracyByArea: [
        { area: '연산', accuracy: 92 },
        { area: '도형', accuracy: 88 },
        { area: '문제해결', accuracy: 78 },
        { area: '규칙성', accuracy: 85 }
      ],
      trend: [75, 78, 82, 85, 88, 88],
      teacherComment: '기초 연산 능력이 뛰어나며, 응용 문제에도 도전적인 자세를 보입니다.'
    },
    '영어': {
      subject: '영어',
      contentUsage: 78,
      accuracyByDifficulty: { easy: 90, medium: 80, hard: 68 },
      accuracyByArea: [
        { area: '듣기', accuracy: 85 },
        { area: '말하기', accuracy: 72 },
        { area: '읽기', accuracy: 88 },
        { area: '쓰기', accuracy: 75 }
      ],
      trend: [70, 72, 75, 78, 80, 82],
      teacherComment: '읽기 영역에서 우수한 성과를 보이며, 말하기 연습이 더 필요합니다.'
    }
  };

  // 시간대별 학습 패턴
  const learningPattern = [
    { time: '06-09', hours: 0.5 },
    { time: '09-12', hours: 1.2 },
    { time: '12-15', hours: 0.8 },
    { time: '15-18', hours: 3.5 },
    { time: '18-21', hours: 2.8 },
    { time: '21-24', hours: 0.7 }
  ];

  // 월별 성장 추이
  const monthlyGrowth = [
    { month: '8월', level: 3, achievement: 72 },
    { month: '9월', level: 4, achievement: 75 },
    { month: '10월', level: 4, achievement: 78 },
    { month: '11월', level: 5, achievement: 82 },
    { month: '12월', level: 5, achievement: 85 },
    { month: '1월', level: 6, achievement: 88 }
  ];

  const handleDetailView = (viewType: string, subject?: string) => {
    setSelectedView(viewType);
    if (subject) setSelectedSubject(subject);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">학부모 대시보드</h2>
          <p className="text-gray-600 mt-1">자녀의 종합 학습 현황과 성장 기록</p>
        </div>

        {/* 자녀 정보 카드 */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                {childData.name[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{childData.name}</h3>
                <p className="text-gray-600">{childData.school} {childData.grade}학년</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-gray-500">마지막 접속: 2시간 전</span>
                  <span className="text-sm text-gray-500">학습 연속: 15일</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <p className="text-sm text-gray-500">현재 레벨</p>
                <p className="text-2xl font-bold text-primary">Lv.{childData.level}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">종합 성취도</p>
                <p className="text-2xl font-bold text-green-600">88.5%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">이번 주 학습</p>
                <p className="text-2xl font-bold text-blue-600">{childData.weeklyStudyTime}시간</p>
              </div>
            </div>
          </div>
        </div>

        {/* 종합 요약 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">자녀 성장 기록 요약</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 출석 현황 */}
            <div 
              onClick={() => handleDetailView('attendance')}
              className="p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <h4 className="font-medium text-gray-900">출석률</h4>
              <p className="text-2xl font-bold text-blue-600">{growthRecord.attendance.rate}%</p>
              <p className="text-xs text-gray-500 mt-1">
                {growthRecord.attendance.presentDays}/{growthRecord.attendance.totalDays}일
              </p>
            </div>

            {/* 포인트 현황 */}
            <div 
              onClick={() => handleDetailView('points')}
              className="p-4 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <h4 className="font-medium text-gray-900">포인트</h4>
              <p className="text-2xl font-bold text-yellow-600">{growthRecord.points.total}P</p>
              <p className="text-xs text-gray-500 mt-1">
                전체 {growthRecord.points.rank}위
              </p>
            </div>

            {/* 활동 현황 */}
            <div 
              onClick={() => handleDetailView('activities')}
              className="p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-5 h-5 text-green-600" />
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <h4 className="font-medium text-gray-900">총 학습시간</h4>
              <p className="text-2xl font-bold text-green-600">{growthRecord.activities.totalHours}시간</p>
              <p className="text-xs text-gray-500 mt-1">
                이번 주 {growthRecord.activities.thisWeek}시간
              </p>
            </div>

            {/* 독서 현황 */}
            <div 
              onClick={() => handleDetailView('reading')}
              className="p-4 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              <h4 className="font-medium text-gray-900">독서 진행</h4>
              <p className="text-2xl font-bold text-purple-600">{currentBooks.length}권</p>
              <p className="text-xs text-gray-500 mt-1">
                평균 진도 {Math.round(currentBooks.reduce((a, b) => a + b.progress, 0) / currentBooks.length)}%
              </p>
            </div>
          </div>

          {/* 과목별 분석 */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">과목별 성취도</h4>
              <button 
                onClick={() => handleDetailView('subjects')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                상세보기 →
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {subjectAnalysis.map((subject) => (
                <div 
                  key={subject.subject}
                  onClick={() => handleDetailView('subjectDetail', subject.subject)}
                  className="text-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-700">{subject.subject}</p>
                  <p className="text-xl font-bold text-primary mt-1">{subject.achievement}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: `${subject.achievement}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 관심 키워드 */}
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium text-gray-900 mb-3">관심 키워드</h4>
            <div className="flex flex-wrap gap-2">
              {interestKeywords.map((keyword) => (
                <span
                  key={keyword.word}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  style={{ fontSize: `${Math.min(0.75 + keyword.count / 50, 1.25)}rem` }}
                >
                  {keyword.word}
                </span>
              ))}
            </div>
          </div>

          {/* 현재 읽는 책 */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">현재 읽고 있는 책</h4>
              <button 
                onClick={() => handleDetailView('reading')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                전체보기 →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentBooks.map((book) => (
                <div key={book.title} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{book.title}</p>
                      <p className="text-xs text-gray-500">{book.category}</p>
                    </div>
                    <span className="text-xs text-gray-600">{book.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 왼쪽 메인 영역 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 학습 패턴 분석 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">일일 학습 패턴</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={learningPattern}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="hours" stroke="#0397D6" fill="#0397D6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-600 mt-3">
                주요 학습 시간대: {growthRecord.activities.favoriteTime}
              </p>
            </div>

            {/* 월별 성장 추이 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">성장 추이</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="achievement" stroke="#0397D6" strokeWidth={2} name="성취도(%)" />
                  <Line yAxisId="right" type="monotone" dataKey="level" stroke="#63C29D" strokeWidth={2} name="레벨" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 멘토링 일지 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">멘토링 일지</h3>
                <button 
                  onClick={() => handleDetailView('mentoring')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  전체보기 →
                </button>
              </div>
              <div className="space-y-3">
                {mentoringJournals.map((journal, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-4 py-3 bg-gray-50 rounded-r-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{journal.teacher}</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                          {journal.type}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{journal.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{journal.content}</p>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">다음 계획:</span> {journal.nextPlan}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽 사이드바 */}
          <div className="space-y-6">
            {/* 알림장 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">알림장</h3>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {notices.map((notice) => (
                  <div 
                    key={notice.id}
                    className={`p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow ${
                      notice.urgent ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}
                  >
                    <p className={`text-sm font-medium ${
                      notice.urgent ? 'text-red-700' : 'text-gray-900'
                    }`}>
                      {notice.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notice.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 상담 신청 내역 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">상담 내역</h3>
                <MessageSquare className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {consultationHistory.map((consultation, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{consultation.type}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        consultation.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {consultation.status === 'completed' ? '완료' : '예정'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{consultation.date}</p>
                    <p className="text-xs text-gray-500 mt-1">{consultation.result}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm">
                새 상담 신청
              </button>
            </div>

            {/* 빠른 액션 */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-lg shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-4">빠른 메뉴</h3>
              <div className="space-y-3">
                <button className="w-full py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors text-sm text-left px-3 flex items-center justify-between">
                  <span>월간 리포트</span>
                  <FileText className="w-4 h-4" />
                </button>
                <button className="w-full py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors text-sm text-left px-3 flex items-center justify-between">
                  <span>학습 계획 확인</span>
                  <Calendar className="w-4 h-4" />
                </button>
                <button className="w-full py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors text-sm text-left px-3 flex items-center justify-between">
                  <span>선생님 메시지</span>
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 이번 주 목표 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">이번 주 목표</h3>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">학습 시간</span>
                    <span className="text-sm font-medium">12/15시간</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">문제 풀이</span>
                    <span className="text-sm font-medium">85/100문제</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">독서</span>
                    <span className="text-sm font-medium">2/3권</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '66%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 과목별 상세 분석 모달 */}
        {selectedView === 'subjectDetail' && selectedSubject && subjectDetails[selectedSubject] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedSubject} 상세 분석
                  </h3>
                  <button 
                    onClick={() => {
                      setSelectedView(null);
                      setSelectedSubject(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 콘텐츠 사용 현황 */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">콘텐츠 사용률</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">전체 콘텐츠 활용도</span>
                      <span className="text-lg font-bold text-primary">
                        {subjectDetails[selectedSubject].contentUsage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-primary h-3 rounded-full"
                        style={{ width: `${subjectDetails[selectedSubject].contentUsage}%` }}
                      />
                    </div>
                  </div>

                  {/* 난이도별 정답률 */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">난이도별 정답률</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">쉬움</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${subjectDetails[selectedSubject].accuracyByDifficulty.easy}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {subjectDetails[selectedSubject].accuracyByDifficulty.easy}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">보통</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: `${subjectDetails[selectedSubject].accuracyByDifficulty.medium}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {subjectDetails[selectedSubject].accuracyByDifficulty.medium}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">어려움</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${subjectDetails[selectedSubject].accuracyByDifficulty.hard}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">
                            {subjectDetails[selectedSubject].accuracyByDifficulty.hard}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 영역별 정답률 */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">영역별 정답률</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <RadarChart data={subjectDetails[selectedSubject].accuracyByArea}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="area" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="정답률" dataKey="accuracy" stroke="#0397D6" fill="#0397D6" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 시간별 추이 */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">성취도 추이</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={subjectDetails[selectedSubject].trend.map((value, index) => ({
                        month: `${index + 8}월`,
                        value
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[60, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#0397D6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 선생님 코멘트 */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">선생님 코멘트</h4>
                  <p className="text-sm text-gray-700">
                    {subjectDetails[selectedSubject].teacherComment}
                  </p>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button 
                    onClick={() => {
                      setSelectedView(null);
                      setSelectedSubject(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    닫기
                  </button>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>리포트 다운로드</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ParentDashboard;