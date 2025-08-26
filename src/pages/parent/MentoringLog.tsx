import Layout from '../../components/common/Layout';
import { Calendar, User, MessageSquare, Star, FileText, ChevronRight, Heart, Clock, Target, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { students } from '../../data/mockData';

const MentoringLog = () => {
  const [selectedMentor, setSelectedMentor] = useState('all');
  const childData = students[0];

  const mentoringLogs = [
    {
      id: 1,
      date: '2024-01-25',
      time: '16:00-17:00',
      mentor: '김수학 선생님',
      subject: '수학',
      topic: '분수의 나눗셈 심화',
      type: '1:1 화상',
      status: 'completed',
      studentMood: 'positive',
      participation: 95,
      homework: '심화 문제 10개',
      homeworkStatus: 'completed',
      mentorNote: '개념 이해도가 매우 높음. 응용 문제 해결 능력이 향상되고 있음.',
      parentVisible: true,
      improvement: '+15%',
      nextGoal: '도형의 넓이 개념 확장'
    },
    {
      id: 2,
      date: '2024-01-23',
      time: '17:00-17:30',
      mentor: 'James 선생님',
      subject: '영어',
      topic: 'Speaking Practice - Daily Conversation',
      type: '1:1 화상',
      status: 'completed',
      studentMood: 'neutral',
      participation: 85,
      homework: '일상 대화 문장 20개 암기',
      homeworkStatus: 'in-progress',
      mentorNote: '발음이 많이 개선됨. 자신감을 더 가질 필요가 있음.',
      parentVisible: true,
      improvement: '+10%',
      nextGoal: '프레젠테이션 스킬 향상'
    },
    {
      id: 3,
      date: '2024-01-20',
      time: '15:00-16:00',
      mentor: '이코딩 선생님',
      subject: 'AI/코딩',
      topic: 'Python 함수와 모듈',
      type: '1:1 화상',
      status: 'completed',
      studentMood: 'positive',
      participation: 100,
      homework: '계산기 프로그램 만들기',
      homeworkStatus: 'completed',
      mentorNote: '논리적 사고력이 뛰어남. 코딩에 재능이 있는 것으로 보임.',
      parentVisible: true,
      improvement: '+20%',
      nextGoal: '객체지향 프로그래밍 입문'
    },
    {
      id: 4,
      date: '2024-01-18',
      time: '16:30-17:00',
      mentor: '강국어 선생님',
      subject: '국어',
      topic: '논설문 쓰기 첨삭',
      type: '1:1 화상',
      status: 'completed',
      studentMood: 'negative',
      participation: 70,
      homework: '논설문 개요 작성',
      homeworkStatus: 'pending',
      mentorNote: '글쓰기에 부담을 느끼고 있음. 단계별 접근이 필요함.',
      parentVisible: true,
      improvement: '+5%',
      nextGoal: '문단 구성 연습'
    },
    {
      id: 5,
      date: '2024-01-27',
      time: '16:00-17:00',
      mentor: '김수학 선생님',
      subject: '수학',
      topic: '도형의 넓이',
      type: '1:1 화상',
      status: 'scheduled',
      studentMood: null,
      participation: null,
      homework: null,
      homeworkStatus: null,
      mentorNote: null,
      parentVisible: false,
      improvement: null,
      nextGoal: null
    }
  ];

  const mentors = [
    { name: '김수학 선생님', subject: '수학', sessions: 12, rating: 4.9 },
    { name: 'James 선생님', subject: '영어', sessions: 8, rating: 4.8 },
    { name: '이코딩 선생님', subject: 'AI/코딩', sessions: 6, rating: 5.0 },
    { name: '강국어 선생님', subject: '국어', sessions: 5, rating: 4.7 }
  ];

  const filteredLogs = selectedMentor === 'all' 
    ? mentoringLogs 
    : mentoringLogs.filter(log => log.mentor === selectedMentor);

  const getMoodIcon = (mood: string | null) => {
    if (!mood) return null;
    switch(mood) {
      case 'positive': return '😊';
      case 'neutral': return '😐';
      case 'negative': return '😔';
      default: return '😐';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'scheduled': return 'text-blue-600 bg-blue-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getHomeworkStatusBadge = (status: string | null) => {
    if (!status) return null;
    switch(status) {
      case 'completed': return <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">완료</span>;
      case 'in-progress': return <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded">진행중</span>;
      case 'pending': return <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">미완료</span>;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">멘토링 일지</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">{childData.name}의 1:1 멘토링 기록</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <select
              value={selectedMentor}
              onChange={(e) => setSelectedMentor(e.target.value)}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              <option value="all">전체 멘토</option>
              {mentors.map(mentor => (
                <option key={mentor.name} value={mentor.name}>{mentor.name}</option>
              ))}
            </select>
            <button className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base">
              <span className="hidden sm:inline">멘토링 신청</span>
              <span className="sm:hidden">신청</span>
            </button>
          </div>
        </div>

        {/* 멘토 현황 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {mentors.map((mentor) => (
            <div key={mentor.name} className="bg-white rounded-lg shadow-md p-3 sm:p-4">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <User className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400" />
                <div className="flex items-center space-x-1">
                  <Star className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500 fill-current" />
                  <span className="text-xs sm:text-sm font-medium">{mentor.rating}</span>
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">{mentor.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{mentor.subject}</p>
              <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t">
                <p className="text-xs text-gray-500">총 {mentor.sessions}회</p>
              </div>
            </div>
          ))}
        </div>

        {/* 멘토링 일지 목록 */}
        <div className="space-y-3 sm:space-y-4">
          {filteredLogs.map((log) => (
            <div key={log.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`p-4 sm:p-6 ${log.status === 'scheduled' ? 'bg-blue-50' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="text-center min-w-fit">
                      <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs sm:text-sm font-medium">{log.date}</p>
                      <p className="text-xs text-gray-500">{log.time}</p>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900">{log.mentor}</h3>
                        <span className={`px-2 py-0.5 sm:py-1 text-xs rounded ${getStatusColor(log.status)}`}>
                          {log.status === 'completed' ? '완료' : log.status === 'scheduled' ? '예정' : '취소'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{log.subject} - {log.topic}</p>
                      <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">{log.type}</p>
                    </div>
                  </div>
                  {log.studentMood && (
                    <div className="text-center self-start">
                      <p className="text-xl sm:text-2xl">{getMoodIcon(log.studentMood)}</p>
                      <p className="text-xs text-gray-500">학습 태도</p>
                    </div>
                  )}
                </div>

                {log.status === 'completed' && (
                  <>
                    {/* 참여도 및 향상도 */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs sm:text-sm text-gray-600">참여도</span>
                          <span className="text-xs sm:text-sm font-bold text-gray-900">{log.participation}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div 
                            className="bg-blue-500 h-1.5 sm:h-2 rounded-full"
                            style={{ width: `${log.participation}%` }}
                          />
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs sm:text-sm text-gray-600">성취도 향상</span>
                          <span className="text-xs sm:text-sm font-bold text-green-600">{log.improvement}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4 text-green-500" />
                          <span className="text-xs text-gray-500">지난 대비</span>
                        </div>
                      </div>
                    </div>

                    {/* 과제 정보 */}
                    {log.homework && (
                      <div className="bg-yellow-50 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-start sm:items-center gap-1 sm:gap-2 flex-1 min-w-0">
                            <FileText className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-600 mt-0.5 sm:mt-0" />
                            <span className="text-xs sm:text-sm font-medium text-gray-900">과제: {log.homework}</span>
                          </div>
                          {getHomeworkStatusBadge(log.homeworkStatus)}
                        </div>
                      </div>
                    )}

                    {/* 멘토 피드백 */}
                    {log.mentorNote && log.parentVisible && (
                      <div className="bg-blue-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-3 sm:w-4 h-3 sm:h-4 text-blue-600 mt-0.5 sm:mt-1" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5 sm:mb-1">멘토 피드백</p>
                            <p className="text-xs sm:text-sm text-gray-700">{log.mentorNote}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 다음 목표 */}
                    {log.nextGoal && (
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <Target className="w-3 sm:w-4 h-3 sm:h-4 text-purple-500" />
                        <span className="text-gray-600">다음 목표:</span>
                        <span className="font-medium text-gray-900">{log.nextGoal}</span>
                      </div>
                    )}
                  </>
                )}

                {log.status === 'scheduled' && (
                  <div className="bg-blue-100 rounded-lg p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-blue-800">
                      예정된 멘토링입니다. 시작 10분 전 알림을 보내드릴게요.
                    </p>
                    <button className="mt-1 sm:mt-2 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">
                      일정 변경 요청 →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 멘토링 요약 통계 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 sm:p-6 text-white">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Heart className="w-6 sm:w-8 h-6 sm:h-8" />
            <h3 className="text-lg sm:text-xl font-bold">이번 달 멘토링 요약</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white/10 rounded-lg p-2 sm:p-3">
              <p className="text-xs sm:text-sm text-white/80">총 멘토링</p>
              <p className="text-lg sm:text-2xl font-bold">12시간</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 sm:p-3">
              <p className="text-xs sm:text-sm text-white/80">평균 참여도</p>
              <p className="text-lg sm:text-2xl font-bold">87.5%</p>
            </div>
            <div className="bg-white/10 rounded-lg p-2 sm:p-3">
              <p className="text-xs sm:text-sm text-white/80">과제 완료</p>
              <p className="text-lg sm:text-2xl font-bold">75%</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentoringLog;