import Layout from '../../components/common/Layout';
import { Heart, Calendar, Video, MessageSquare, Clock, Star, User, Phone, Camera, Monitor, Headphones } from 'lucide-react';
import { mentoringHistory } from '../../data/mockData';
import { useState } from 'react';
import VideoCallModal from '../../components/VideoCallModal';

const Mentoring = () => {
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState({ name: '', subject: '' });
  const upcomingSession = {
    date: '2024-01-20',
    time: '16:00',
    mentor: '김멘토',
    subject: '수학',
    type: 'video'
  };

  const myMentors = [
    { id: 1, name: '김멘토', subject: '수학', rating: 4.9, sessions: 12, specialty: '문제해결력 향상' },
    { id: 2, name: '이멘토', subject: '영어', rating: 4.8, sessions: 8, specialty: '회화 실력 향상' },
    { id: 3, name: '박멘토', subject: '진로상담', rating: 5.0, sessions: 5, specialty: '정서 지원' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">멘토링</h2>
          <p className="text-gray-600 mt-1">1:1 맞춤 학습 및 정서 지원</p>
        </div>

        {/* 다음 멘토링 일정 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">다음 멘토링 일정</h3>
              <p className="text-2xl font-bold mb-1">{upcomingSession.date} {upcomingSession.time}</p>
              <p className="opacity-90">{upcomingSession.mentor} 선생님 • {upcomingSession.subject}</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => {
                  setSelectedMentor({ name: upcomingSession.mentor, subject: upcomingSession.subject });
                  setIsVideoCallOpen(true);
                }}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 font-medium flex items-center space-x-2"
              >
                <Video className="w-5 h-5" />
                <span>화상 멘토링 참여</span>
              </button>
              <button className="px-4 py-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30">
                <Calendar className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 멘토링 기록 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">최근 멘토링 기록</h3>
              <div className="space-y-4">
                {mentoringHistory.map(session => (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                          session.type === 'learning' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {session.type === 'learning' ? '학습 멘토링' : '정서 멘토링'}
                        </span>
                        <h4 className="font-bold text-gray-900">{session.subject}</h4>
                        <p className="text-sm text-gray-600 mt-1">{session.content}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{session.date}</p>
                        <p className="text-sm text-gray-500">{session.duration}분</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">멘토: {session.mentorId}</span>
                      </div>
                      <button className="text-sm text-blue-600 hover:text-blue-700">
                        기록 상세보기 →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 멘토링 일정 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">이번 주 멘토링 일정</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">월요일</p>
                      <p className="text-lg font-bold">20일</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">수학 멘토링</p>
                      <p className="text-sm text-gray-600">16:00 - 16:30 • 김멘토 선생님</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedMentor({ name: '김멘토', subject: '수학' });
                      setIsVideoCallOpen(true);
                    }}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  >
                    <Video className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">수요일</p>
                      <p className="text-lg font-bold">22일</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">진로 상담</p>
                      <p className="text-sm text-gray-600">17:00 - 17:30 • 박멘토 선생님</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedMentor({ name: '박멘토', subject: '진로 상담' });
                      setIsVideoCallOpen(true);
                    }}
                    className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200"
                  >
                    <Video className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 나의 멘토 */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">나의 멘토</h3>
              <div className="space-y-4">
                {myMentors.map(mentor => (
                  <div key={mentor.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900">{mentor.name}</h4>
                        <p className="text-sm text-gray-600">{mentor.subject}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{mentor.specialty}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">총 {mentor.sessions}회 멘토링</span>
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => {
                            setSelectedMentor({ name: mentor.name, subject: mentor.subject });
                            setIsVideoCallOpen(true);
                          }}
                          className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                          title="화상통화"
                        >
                          <Video className="w-3 h-3" />
                        </button>
                        <button 
                          className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600"
                          title="음성통화"
                        >
                          <Phone className="w-3 h-3" />
                        </button>
                        <button 
                          className="p-1.5 bg-purple-500 text-white rounded hover:bg-purple-600"
                          title="메시지"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 멘토링 통계 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">나의 멘토링 통계</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">총 멘토링 횟수</span>
                  <span className="font-bold text-gray-900">25회</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">이번 달 멘토링</span>
                  <span className="font-bold text-gray-900">8회</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">평균 만족도</span>
                  <span className="font-bold text-gray-900">4.8/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">총 학습 시간</span>
                  <span className="font-bold text-gray-900">12.5시간</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Call Modal */}
      <VideoCallModal 
        isOpen={isVideoCallOpen}
        onClose={() => setIsVideoCallOpen(false)}
        mentorName={selectedMentor.name}
        subject={selectedMentor.subject}
      />
    </Layout>
  );
};

export default Mentoring;