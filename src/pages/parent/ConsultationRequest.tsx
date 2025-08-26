import Layout from '../../components/common/Layout';
import { MessageSquare, Calendar, Phone, Video, User, Clock, CheckCircle, AlertCircle, FileText, Send } from 'lucide-react';
import { useState } from 'react';
import { students } from '../../data/mockData';

const ConsultationRequest = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationReason, setConsultationReason] = useState('');
  const childData = students[0];

  const consultationHistory = [
    {
      id: 1,
      date: '2024-01-20',
      time: '14:00-14:30',
      teacher: '김수학 선생님',
      subject: '수학',
      type: '화상 상담',
      status: 'completed',
      topic: '학습 진도 상담',
      summary: '분수 단원 이해도가 높음. 심화 학습 권장.',
      satisfaction: 5
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '16:00-16:30',
      teacher: '강국어 선생님',
      subject: '국어',
      type: '전화 상담',
      status: 'completed',
      topic: '글쓰기 능력 향상 방안',
      summary: '단계별 작문 연습 필요. 주 2회 첨삭 지도 예정.',
      satisfaction: 4
    },
    {
      id: 3,
      date: '2024-01-28',
      time: '15:00-15:30',
      teacher: 'James 선생님',
      subject: '영어',
      type: '화상 상담',
      status: 'scheduled',
      topic: '영어 말하기 자신감 향상',
      summary: null,
      satisfaction: null
    },
    {
      id: 4,
      date: '2024-01-10',
      time: '14:30-15:00',
      teacher: '이코딩 선생님',
      subject: 'AI/코딩',
      type: '대면 상담',
      status: 'completed',
      topic: '코딩 영재교육 프로그램 상담',
      summary: 'Python 중급 과정 등록 권장. 알고리즘 대회 참가 추천.',
      satisfaction: 5
    }
  ];

  const teachers = [
    { name: '김수학 선생님', subject: '수학', available: true, rating: 4.9 },
    { name: 'James 선생님', subject: '영어', available: true, rating: 4.8 },
    { name: '이코딩 선생님', subject: 'AI/코딩', available: false, rating: 5.0 },
    { name: '강국어 선생님', subject: '국어', available: true, rating: 4.7 },
    { name: '최과학 선생님', subject: '과학', available: true, rating: 4.8 },
    { name: '정역사 선생님', subject: '사회', available: false, rating: 4.6 }
  ];

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const consultationTopics = [
    '학습 진도 상담',
    '성적 향상 방안',
    '학습 태도 개선',
    '진로 상담',
    '학습 방법 지도',
    '심화 학습 상담',
    '학습 부진 상담',
    '기타'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('상담 신청이 완료되었습니다. 선생님께서 확인 후 연락드리겠습니다.');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">완료</span>;
      case 'scheduled':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">예정</span>;
      case 'cancelled':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">취소</span>;
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>★</span>
    ));
  };

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">상담 신청</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">{childData.name} 학생 학습 상담 예약</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* 상담 신청 폼 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">새로운 상담 신청</h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* 상담 유형 */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  상담 유형 *
                </label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { value: 'video', icon: Video, label: '화상 상담' },
                    { value: 'phone', icon: Phone, label: '전화 상담' },
                    { value: 'offline', icon: User, label: '대면 상담' }
                  ].map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSelectedType(type.value)}
                      className={`p-3 sm:p-4 border rounded-lg flex flex-col items-center space-y-1 sm:space-y-2 transition-colors ${
                        selectedType === type.value
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <type.icon className="w-5 sm:w-6 h-5 sm:h-6" />
                      <span className="text-xs sm:text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 선생님 선택 */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  상담 선생님 *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {teachers.map(teacher => (
                    <button
                      key={teacher.name}
                      type="button"
                      onClick={() => teacher.available && setSelectedTeacher(teacher.name)}
                      disabled={!teacher.available}
                      className={`p-2 sm:p-3 border rounded-lg text-left transition-colors ${
                        selectedTeacher === teacher.name
                          ? 'border-blue-500 bg-blue-50'
                          : teacher.available
                          ? 'border-gray-300 hover:border-gray-400'
                          : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm sm:text-base font-medium text-gray-900">{teacher.name}</p>
                          <p className="text-xs sm:text-sm text-gray-600">{teacher.subject}</p>
                        </div>
                        {teacher.available ? (
                          <span className="text-xs text-green-600">예약가능</span>
                        ) : (
                          <span className="text-xs text-red-600">예약불가</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 날짜 및 시간 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    희망 날짜 *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min="2024-01-26"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    희망 시간 *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">시간 선택</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 상담 주제 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  상담 주제 *
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">주제 선택</option>
                  {consultationTopics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              {/* 상담 내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  상담 내용
                </label>
                <textarea
                  value={consultationReason}
                  onChange={(e) => setConsultationReason(e.target.value)}
                  rows={4}
                  placeholder="상담하고 싶은 내용을 자세히 적어주세요..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Send className="w-5 h-5" />
                <span>상담 신청하기</span>
              </button>
            </form>
          </div>

          {/* 상담 이력 */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">최근 상담 이력</h3>
              <div className="space-y-3">
                {consultationHistory.map(consultation => (
                  <div key={consultation.id} className="border-b last:border-0 pb-3 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-gray-900 text-sm">{consultation.teacher}</p>
                          {getStatusBadge(consultation.status)}
                        </div>
                        <p className="text-xs text-gray-600">{consultation.topic}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{consultation.date}</span>
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{consultation.time}</span>
                        </div>
                        {consultation.satisfaction && (
                          <div className="mt-1">
                            {renderStars(consultation.satisfaction)}
                          </div>
                        )}
                      </div>
                    </div>
                    {consultation.status === 'scheduled' && (
                      <button className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                        일정 변경 →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 상담 안내 */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">상담 안내</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• 상담은 30분 단위로 진행됩니다</li>
                    <li>• 예약 취소는 24시간 전까지 가능합니다</li>
                    <li>• 화상 상담 시 카메라와 마이크를 준비해주세요</li>
                    <li>• 상담 내용은 학생 지도에만 활용됩니다</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 긴급 상담 */}
            <div className="bg-red-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-900">긴급 상담이 필요하신가요?</p>
                  <p className="text-xs text-red-700 mt-1">평일 09:00-18:00</p>
                </div>
                <button className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                  <Phone className="w-3 h-3" />
                  <span>전화</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 상담 이력 상세 */}
        {consultationHistory.filter(c => c.status === 'completed' && c.summary).length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">상담 결과 요약</h3>
            <div className="space-y-4">
              {consultationHistory
                .filter(c => c.status === 'completed' && c.summary)
                .map(consultation => (
                  <div key={consultation.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{consultation.topic}</h4>
                        <p className="text-sm text-gray-600">
                          {consultation.date} | {consultation.teacher} | {consultation.type}
                        </p>
                      </div>
                      <div className="text-sm">
                        {renderStars(consultation.satisfaction || 0)}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex items-start space-x-2">
                        <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                        <p className="text-sm text-gray-700">{consultation.summary}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ConsultationRequest;