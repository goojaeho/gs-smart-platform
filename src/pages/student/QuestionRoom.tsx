import Layout from '../../components/common/Layout';
import { MessageSquare, Video, Mic, Send, Search, Clock, CheckCircle, User, Phone, Camera } from 'lucide-react';
import { useState } from 'react';
import VideoCallModal from '../../components/VideoCallModal';

const QuestionRoom = () => {
  const [selectedSubject, setSelectedSubject] = useState('전체');
  const [questionText, setQuestionText] = useState('');
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState({ name: '', subject: '' });
  
  const subjects = ['전체', '국어', '영어', '수학', '과학', '사회'];
  
  const onlineMentors = [
    { id: 1, name: '김수학쌤', subject: '수학', status: 'online', rating: 4.9, answers: 234 },
    { id: 2, name: '이영어쌤', subject: '영어', status: 'online', rating: 4.8, answers: 189 },
    { id: 3, name: '박과학쌤', subject: '과학', status: 'busy', rating: 4.7, answers: 156 },
    { id: 4, name: '최국어쌤', subject: '국어', status: 'online', rating: 4.9, answers: 201 },
  ];

  const recentQuestions = [
    {
      id: 1,
      subject: '수학',
      question: '분수의 나눗셈은 어떻게 계산하나요?',
      student: '김민준',
      time: '10분 전',
      status: 'answered',
      mentor: '김수학쌤'
    },
    {
      id: 2,
      subject: '영어',
      question: '현재완료 시제는 언제 사용하나요?',
      student: '이서연',
      time: '30분 전',
      status: 'answering',
      mentor: '이영어쌤'
    },
    {
      id: 3,
      subject: '과학',
      question: '전기회로에서 직렬과 병렬의 차이점이 뭔가요?',
      student: '박지호',
      time: '1시간 전',
      status: 'waiting',
      mentor: null
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">1:1 학습 질문방</h2>
            <p className="text-gray-600 mt-1">실시간으로 멘토 선생님께 질문하세요</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">실시간 멘토 4명 대기중</span>
            </div>
          </div>
        </div>

        {/* 빠른 질문하기 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">빠른 질문하기</h3>
          <div className="space-y-4">
            <div className="flex space-x-2">
              {subjects.slice(1).map(subject => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedSubject === subject
                      ? 'bg-white text-blue-600'
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="질문을 입력하세요..."
                className="flex-1 px-4 py-3 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 text-white focus:outline-none focus:bg-opacity-30"
              />
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                질문하기
              </button>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  setSelectedMentor({ name: '김수학쌤', subject: '수학' });
                  setIsVideoCallOpen(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Video className="w-4 h-4" />
                <span className="text-sm">화상 질문</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors">
                <Mic className="w-4 h-4" />
                <span className="text-sm">음성 질문</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 최근 질문 목록 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">실시간 질문 현황</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  내 질문 기록
                </button>
              </div>
              <div className="space-y-3">
                {recentQuestions.map(q => (
                  <div key={q.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {q.subject}
                          </span>
                          <span className="text-xs text-gray-500">{q.time}</span>
                          {q.status === 'answered' && (
                            <span className="flex items-center space-x-1 text-green-600 text-xs">
                              <CheckCircle className="w-3 h-3" />
                              <span>답변완료</span>
                            </span>
                          )}
                          {q.status === 'answering' && (
                            <span className="flex items-center space-x-1 text-blue-600 text-xs">
                              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                              <span>답변중</span>
                            </span>
                          )}
                          {q.status === 'waiting' && (
                            <span className="flex items-center space-x-1 text-gray-500 text-xs">
                              <Clock className="w-3 h-3" />
                              <span>대기중</span>
                            </span>
                          )}
                        </div>
                        <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">질문자: {q.student}</span>
                          {q.mentor && (
                            <span className="text-sm text-blue-600">답변: {q.mentor}</span>
                          )}
                        </div>
                      </div>
                      {q.status === 'answered' && (
                        <button className="ml-4 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm">
                          답변보기
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 자주 묻는 질문 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">자주 묻는 질문 TOP 5</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">분수의 덧셈과 뺄셈은 어떻게 하나요?</p>
                    <p className="text-xs text-gray-500 mt-1">조회 234회</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">영어 현재완료와 과거시제의 차이점</p>
                    <p className="text-xs text-gray-500 mt-1">조회 189회</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">태양계 행성의 특징</p>
                    <p className="text-xs text-gray-500 mt-1">조회 156회</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 대기중인 멘토 */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">실시간 멘토</h3>
              <div className="space-y-3">
                {onlineMentors.map(mentor => (
                  <div key={mentor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          mentor.status === 'online' ? 'bg-green-500' :
                          mentor.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{mentor.name}</p>
                        <p className="text-xs text-gray-500">{mentor.subject} • ⭐ {mentor.rating}</p>
                      </div>
                    </div>
                    {mentor.status === 'online' ? (
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => {
                            setSelectedMentor({ name: mentor.name, subject: mentor.subject });
                            setIsVideoCallOpen(true);
                          }}
                          className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          <Video className="w-3 h-3" />
                        </button>
                        <button className="p-1.5 bg-green-500 text-white rounded hover:bg-green-600">
                          <Phone className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">응답중</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 질문 팁 */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">💡 효과적인 질문 팁</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• 구체적으로 모르는 부분을 설명하세요</li>
                <li>• 문제 사진을 함께 첨부하면 좋아요</li>
                <li>• 어디까지 이해했는지 알려주세요</li>
                <li>• 예의 바른 언어를 사용해주세요</li>
              </ul>
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

export default QuestionRoom;