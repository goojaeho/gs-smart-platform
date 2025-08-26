import Layout from '../../components/common/Layout';
import { 
  Users, Calendar, Clock, Video, CheckCircle, XCircle, AlertCircle, 
  MessageSquare, Star, TrendingUp, Plus, Edit, FileText, Phone,
  MapPin, Target, User, ChevronLeft, ChevronRight, Save, Eye
} from 'lucide-react';
import { useState } from 'react';

interface MentoringSchedule {
  id: number;
  studentName: string;
  parentName?: string;
  date: string;
  time: string;
  subject: string;
  topic: string;
  status: 'scheduled' | 'pending' | 'completed' | 'in-progress';
  type: '1:1 화상' | '학부모 상담' | '그룹 멘토링';
  requestNote?: string;
  feedback?: string;
  rating?: number;
  centerName: string;
  purpose: string;
  location: string;
}

interface MentoringJournal {
  id: number;
  date: string;
  studentName: string;
  type: string;
  duration: string;
  content: string;
  achievement: string;
  nextPlan: string;
  parentShared: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
  bookedBy?: string;
}

const MentoringManagement = () => {
  const [selectedTab, setSelectedTab] = useState('scheduled');
  const [showRoomCreate, setShowRoomCreate] = useState(false);
  const [showJournalCreate, setShowJournalCreate] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState<MentoringJournal | null>(null);

  // Mock data
  const [mentoringSchedules, setMentoringSchedules] = useState<MentoringSchedule[]>([
    {
      id: 1,
      studentName: '김민준',
      date: '2024-01-27',
      time: '16:00-17:00',
      subject: '수학',
      topic: '도형의 넓이',
      status: 'scheduled',
      type: '1:1 화상',
      requestNote: '도형 문제가 어려워요',
      centerName: '경산학습센터',
      purpose: '학습 보강',
      location: '온라인'
    },
    {
      id: 2,
      studentName: '이서연',
      parentName: '이정희',
      date: '2024-01-28',
      time: '15:00-15:30',
      subject: '학부모 상담',
      topic: '학습 진도 상담',
      status: 'scheduled',
      type: '학부모 상담',
      requestNote: '아이의 학습 상황이 궁금합니다',
      centerName: '경산학습센터',
      purpose: '진도 상담',
      location: '센터 상담실'
    },
    {
      id: 3,
      studentName: '박지호',
      date: '2024-01-25',
      time: '14:00-14:30',
      subject: '수학',
      topic: '분수의 나눗셈',
      status: 'completed',
      type: '1:1 화상',
      feedback: '개념 이해도 향상됨',
      rating: 5,
      centerName: '경산학습센터',
      purpose: '개념 학습',
      location: '온라인'
    }
  ]);

  const [mentoringJournals, setMentoringJournals] = useState<MentoringJournal[]>([
    {
      id: 1,
      date: '2024-01-25',
      studentName: '박지호',
      type: '1:1 화상 멘토링',
      duration: '30분',
      content: '분수의 나눗셈 개념을 설명하고 실전 문제를 풀어봄',
      achievement: '기본 개념 이해 완료, 응용 문제 80% 정답률',
      nextPlan: '다음 시간에는 소수의 나눗셈 학습 예정',
      parentShared: true
    },
    {
      id: 2,
      date: '2024-01-24',
      studentName: '김민준',
      type: '1:1 화상 멘토링',
      duration: '60분',
      content: '도형의 넓이 구하기 - 삼각형, 사각형, 원',
      achievement: '도형별 공식 암기 완료, 실전 문제 해결 능력 향상',
      nextPlan: '복잡한 도형의 넓이 구하기',
      parentShared: false
    }
  ]);

  const mentoringStats = {
    totalSessions: 45,
    thisMonth: 12,
    averageRating: 4.8,
    completionRate: 92
  };

  // Available time slots for scheduling
  const [timeSlots] = useState<TimeSlot[]>([
    { time: '14:00-14:30', available: true },
    { time: '14:30-15:00', available: false, bookedBy: '김민준' },
    { time: '15:00-15:30', available: true },
    { time: '15:30-16:00', available: true },
    { time: '16:00-16:30', available: false, bookedBy: '이서연' },
    { time: '16:30-17:00', available: true },
    { time: '17:00-17:30', available: true },
    { time: '17:30-18:00', available: false, bookedBy: '박지호' }
  ]);

  const filteredSchedules = mentoringSchedules.filter(schedule => {
    if (selectedTab === 'scheduled') return schedule.status === 'scheduled';
    if (selectedTab === 'pending') return schedule.status === 'pending';
    if (selectedTab === 'completed') return schedule.status === 'completed';
    if (selectedTab === 'in-progress') return schedule.status === 'in-progress';
    if (selectedTab === 'journals') return true;
    return true;
  });

  // Create new mentoring room
  const handleCreateRoom = (formData: any) => {
    const newSchedule: MentoringSchedule = {
      id: mentoringSchedules.length + 1,
      ...formData,
      status: 'pending'
    };
    setMentoringSchedules([...mentoringSchedules, newSchedule]);
    setShowRoomCreate(false);
  };

  // Create mentoring journal
  const handleCreateJournal = (formData: any) => {
    const newJournal: MentoringJournal = {
      id: mentoringJournals.length + 1,
      date: new Date().toISOString().split('T')[0],
      ...formData
    };
    setMentoringJournals([...mentoringJournals, newJournal]);
    setShowJournalCreate(false);
  };

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">멘토링 관리</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">1:1 멘토링 및 학부모 상담 관리</p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <button 
              onClick={() => setShowJournalCreate(true)}
              className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base"
            >
              <FileText className="w-4 h-4" />
              <span>일지 작성</span>
            </button>
            <button 
              onClick={() => setShowRoomCreate(true)}
              className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-1 sm:space-x-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">멘토링 방 개설</span>
              <span className="sm:hidden">개설</span>
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-sm text-gray-600">총 멘토링</h3>
            <p className="text-2xl font-bold text-gray-900">{mentoringStats.totalSessions}회</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-sm text-gray-600">이번 달</h3>
            <p className="text-2xl font-bold text-gray-900">{mentoringStats.thisMonth}회</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-sm text-gray-600">평균 평점</h3>
            <p className="text-2xl font-bold text-gray-900">{mentoringStats.averageRating}점</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-sm text-gray-600">완료율</h3>
            <p className="text-2xl font-bold text-gray-900">{mentoringStats.completionRate}%</p>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {['scheduled', 'pending', 'in-progress', 'completed', 'journals'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 border-b-2 font-medium text-sm ${
                    selectedTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'scheduled' && '예정된 멘토링'}
                  {tab === 'pending' && '승인 대기'}
                  {tab === 'in-progress' && '진행중'}
                  {tab === 'completed' && '완료된 멘토링'}
                  {tab === 'journals' && '멘토링 일지'}
                </button>
              ))}
            </div>
          </div>

          {/* 콘텐츠 영역 */}
          <div className="p-6">
            {selectedTab !== 'journals' ? (
              <div className="space-y-4">
                {filteredSchedules.map((schedule) => (
                  <div key={schedule.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-bold text-gray-900">
                            {schedule.type === '학부모 상담' 
                              ? `${schedule.studentName} 학부모 (${schedule.parentName})`
                              : schedule.studentName
                            }
                          </h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            schedule.type === '학부모 상담' 
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {schedule.type}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {schedule.subject}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{schedule.topic}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-3">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{schedule.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{schedule.time}</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4" />
                              <span>{schedule.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Target className="w-4 h-4" />
                              <span>{schedule.purpose}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span className="font-medium">센터:</span>
                          <span>{schedule.centerName}</span>
                        </div>

                        {schedule.requestNote && (
                          <div className="mt-3 p-3 bg-gray-50 rounded">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">요청사항:</span> {schedule.requestNote}
                            </p>
                          </div>
                        )}
                        
                        {schedule.feedback && (
                          <div className="mt-3 p-3 bg-blue-50 rounded">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">피드백:</span> {schedule.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        {schedule.status === 'scheduled' && (
                          <>
                            <button 
                              onClick={() => setShowVideoCall(true)}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                            >
                              <Video className="w-4 h-4 inline mr-1" />
                              입장
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                              일정 변경
                            </button>
                          </>
                        )}
                        {schedule.status === 'pending' && (
                          <>
                            <button className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                              <CheckCircle className="w-4 h-4 inline mr-1" />
                              승인
                            </button>
                            <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                              <XCircle className="w-4 h-4 inline mr-1" />
                              거절
                            </button>
                          </>
                        )}
                        {schedule.status === 'in-progress' && (
                          <button 
                            onClick={() => setShowVideoCall(true)}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 animate-pulse"
                          >
                            <Video className="w-4 h-4 inline mr-1" />
                            진행중
                          </button>
                        )}
                        {schedule.status === 'completed' && schedule.rating && (
                          <div className="text-center">
                            <div className="text-yellow-500">
                              {'★'.repeat(schedule.rating)}
                            </div>
                            <p className="text-xs text-gray-500">학생 평가</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 멘토링 일지 목록
              <div className="space-y-4">
                {mentoringJournals.map((journal) => (
                  <div key={journal.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-bold text-gray-900">{journal.studentName}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {journal.type}
                          </span>
                          <span className="text-sm text-gray-500">{journal.date}</span>
                          {journal.parentShared && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                              학부모 공유
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <p><span className="font-medium">수업 시간:</span> {journal.duration}</p>
                          <p><span className="font-medium">수업 내용:</span> {journal.content}</p>
                          <p><span className="font-medium">성취도:</span> {journal.achievement}</p>
                          <p><span className="font-medium">다음 계획:</span> {journal.nextPlan}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        <button 
                          onClick={() => setSelectedJournal(journal)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                        >
                          <Eye className="w-4 h-4 inline mr-1" />
                          상세보기
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                          <Edit className="w-4 h-4 inline mr-1" />
                          수정
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 멘토링 예약 달력 */}
        {showCalendar && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">멘토링 예약 가능 시간</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 달력 */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <h4 className="font-medium text-gray-900">2024년 1월</h4>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(new Date(2024, 0, date))}
                      className={`p-2 text-sm rounded hover:bg-blue-50 ${
                        date === selectedDate.getDate() 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'text-gray-700'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              {/* 시간 선택 */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  {selectedDate.toLocaleDateString('ko-KR')} 예약 가능 시간
                </h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {timeSlots.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        slot.available 
                          ? 'border-green-200 bg-green-50 hover:bg-green-100 cursor-pointer' 
                          : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{slot.time}</span>
                      </div>
                      {slot.available ? (
                        <button className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">
                          예약 가능
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">
                          예약됨 ({slot.bookedBy})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 멘토링 방 개설 모달 */}
      {showRoomCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">멘토링 방 개설</h3>
                <button 
                  onClick={() => setShowRoomCreate(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      멘토링 유형
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>1:1 화상</option>
                      <option>학부모 상담</option>
                      <option>그룹 멘토링</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      센터명
                    </label>
                    <input
                      type="text"
                      defaultValue="경산학습센터"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      학생 이름
                    </label>
                    <input
                      type="text"
                      placeholder="학생 이름 입력"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      과목
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>수학</option>
                      <option>영어</option>
                      <option>국어</option>
                      <option>과학</option>
                      <option>사회</option>
                      <option>학부모 상담</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    멘토링 목적
                  </label>
                  <input
                    type="text"
                    placeholder="예: 학습 보강, 진도 상담, 심화 학습"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      날짜
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      시간
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>14:00-14:30</option>
                      <option>14:30-15:00</option>
                      <option>15:00-15:30</option>
                      <option>15:30-16:00</option>
                      <option>16:00-16:30</option>
                      <option>16:30-17:00</option>
                      <option>17:00-17:30</option>
                      <option>17:30-18:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    장소
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>온라인</option>
                    <option>센터 상담실</option>
                    <option>센터 강의실 A</option>
                    <option>센터 강의실 B</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    주제 및 내용
                  </label>
                  <textarea
                    rows={3}
                    placeholder="멘토링 주제와 다룰 내용을 입력하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-500" />
                    <span className="text-sm text-gray-700">학부모에게 알림 전송</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-500" />
                    <span className="text-sm text-gray-700">반복 일정으로 설정</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRoomCreate(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCalendar(true)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    예약 가능 시간 확인
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    방 개설
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 멘토링 일지 작성 모달 */}
      {showJournalCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">멘토링 일지 작성</h3>
                <button 
                  onClick={() => setShowJournalCreate(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      학생 이름
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>김민준</option>
                      <option>이서연</option>
                      <option>박지호</option>
                      <option>최유나</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      멘토링 유형
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>1:1 화상 멘토링</option>
                      <option>대면 멘토링</option>
                      <option>그룹 멘토링</option>
                      <option>학부모 상담</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      날짜
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      수업 시간
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option>30분</option>
                      <option>45분</option>
                      <option>60분</option>
                      <option>90분</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    수업 내용
                  </label>
                  <textarea
                    rows={3}
                    placeholder="오늘 수업에서 다룬 내용을 상세히 기록하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    학습 성취도
                  </label>
                  <textarea
                    rows={2}
                    placeholder="학생의 이해도, 참여도, 성취 사항을 기록하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    다음 수업 계획
                  </label>
                  <textarea
                    rows={2}
                    placeholder="다음 수업에서 다룰 내용과 준비사항을 기록하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    특이사항
                  </label>
                  <textarea
                    rows={2}
                    placeholder="학생의 특별한 반응이나 주의사항이 있다면 기록하세요"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-500" defaultChecked />
                    <span className="text-sm text-gray-700">학부모에게 공유</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-500" />
                    <span className="text-sm text-gray-700">학생에게 공유</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowJournalCreate(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>일지 저장</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 화상 채팅 UI */}
      {showVideoCall && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg max-w-6xl w-full h-[90vh] flex flex-col">
            {/* 헤더 */}
            <div className="bg-gray-800 p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">멘토링 진행중</span>
                </div>
                <span className="text-gray-400">김민준 학생과 1:1 멘토링</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm">00:15:32</span>
                <button 
                  onClick={() => setShowVideoCall(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  종료
                </button>
              </div>
            </div>

            {/* 비디오 영역 */}
            <div className="flex-1 flex p-4 space-x-4">
              {/* 메인 비디오 */}
              <div className="flex-1 relative">
                <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <User className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">학생 화면</p>
                  </div>
                </div>
                {/* 화면 공유 버튼 */}
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                    화면 공유
                  </button>
                  <button className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                    화이트보드
                  </button>
                </div>
              </div>

              {/* 사이드바 */}
              <div className="w-80 flex flex-col space-y-4">
                {/* 내 비디오 */}
                <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <User className="w-16 h-16 text-gray-600 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">내 화면</p>
                  </div>
                </div>

                {/* 채팅 */}
                <div className="flex-1 bg-gray-800 rounded-lg p-4 flex flex-col">
                  <h4 className="text-white font-medium mb-3">채팅</h4>
                  <div className="flex-1 overflow-y-auto space-y-2 mb-3">
                    <div className="text-sm">
                      <span className="text-blue-400 font-medium">김민준:</span>
                      <span className="text-gray-300 ml-2">선생님, 이 문제 어떻게 푸나요?</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-green-400 font-medium">선생님:</span>
                      <span className="text-gray-300 ml-2">먼저 공식을 적용해보자</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="메시지 입력..."
                      className="flex-1 px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                      전송
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 컨트롤 바 */}
            <div className="bg-gray-800 p-4 rounded-b-lg flex items-center justify-center space-x-4">
              <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600">
                <Video className="w-5 h-5" />
              </button>
              <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="p-3 bg-gray-700 text-white rounded-full hover:bg-gray-600">
                <Users className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MentoringManagement;