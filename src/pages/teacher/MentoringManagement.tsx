import Layout from '../../components/common/Layout';
import { Users, Calendar, Clock, Video, CheckCircle, XCircle, AlertCircle, MessageSquare, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const MentoringManagement = () => {
  const [selectedTab, setSelectedTab] = useState('scheduled');

  const mentoringSchedules = [
    {
      id: 1,
      studentName: '김민준',
      date: '2024-01-27',
      time: '16:00-17:00',
      subject: '수학',
      topic: '도형의 넓이',
      status: 'scheduled',
      type: '1:1 화상',
      requestNote: '도형 문제가 어려워요'
    },
    {
      id: 2,
      studentName: '이서연',
      date: '2024-01-28',
      time: '15:00-15:30',
      subject: '영어',
      topic: 'Speaking Practice',
      status: 'scheduled',
      type: '1:1 화상',
      requestNote: '발표 준비를 도와주세요'
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
      rating: 5
    },
    {
      id: 4,
      studentName: '최유나',
      date: '2024-01-29',
      time: '16:30-17:00',
      subject: 'AI/코딩',
      topic: 'Python 고급',
      status: 'pending',
      type: '1:1 화상',
      requestNote: '알고리즘 문제 풀이'
    }
  ];

  const mentoringStats = {
    totalSessions: 45,
    thisMonth: 12,
    averageRating: 4.8,
    completionRate: 92
  };

  const filteredSchedules = mentoringSchedules.filter(schedule => {
    if (selectedTab === 'scheduled') return schedule.status === 'scheduled';
    if (selectedTab === 'pending') return schedule.status === 'pending';
    if (selectedTab === 'completed') return schedule.status === 'completed';
    return true;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">멘토링 관리</h2>
            <p className="text-gray-600 mt-1">1:1 멘토링 일정 및 피드백 관리</p>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            새 멘토링 일정 추가
          </button>
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
              {['scheduled', 'pending', 'completed'].map((tab) => (
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
                  {tab === 'completed' && '완료된 멘토링'}
                </button>
              ))}
            </div>
          </div>

          {/* 멘토링 목록 */}
          <div className="p-6">
            <div className="space-y-4">
              {filteredSchedules.map((schedule) => (
                <div key={schedule.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-bold text-gray-900">{schedule.studentName}</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {schedule.subject}
                        </span>
                        <span className="text-sm text-gray-500">{schedule.type}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{schedule.topic}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{schedule.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{schedule.time}</span>
                        </span>
                      </div>
                      {schedule.requestNote && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">요청사항:</span> {schedule.requestNote}
                          </p>
                        </div>
                      )}
                      {schedule.feedback && (
                        <div className="mt-2 p-2 bg-blue-50 rounded">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">피드백:</span> {schedule.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      {schedule.status === 'scheduled' && (
                        <>
                          <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MentoringManagement;