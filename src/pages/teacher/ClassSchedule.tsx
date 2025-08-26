import Layout from '../../components/common/Layout';
import { Calendar, Clock, Users, MapPin, Video, Plus, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ClassSchedule = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date(2024, 0, 22));
  const [selectedClass, setSelectedClass] = useState('all');

  const schedules = [
    {
      id: 1,
      day: '월',
      date: '01/22',
      slots: [
        { time: '09:00-10:00', subject: '수학', class: '5-3', topic: '분수의 나눗셈', type: 'online', students: 28 },
        { time: '14:00-15:00', subject: '수학', class: '5-1', topic: '도형의 넓이', type: 'online', students: 25 },
        { time: '16:00-17:00', subject: '멘토링', class: '1:1', topic: '김민준 - 수학 심화', type: 'online', students: 1 }
      ]
    },
    {
      id: 2,
      day: '화',
      date: '01/23',
      slots: [
        { time: '10:00-11:00', subject: '수학', class: '6-2', topic: '비와 비율', type: 'online', students: 27 },
        { time: '15:00-16:00', subject: '특강', class: '전체', topic: '수학 경시대회 준비', type: 'offline', location: '경산학습센터', students: 15 }
      ]
    },
    {
      id: 3,
      day: '수',
      date: '01/24',
      slots: [
        { time: '09:00-10:00', subject: '수학', class: '5-3', topic: '도형의 넓이', type: 'online', students: 28 },
        { time: '14:00-14:30', subject: '상담', class: '학부모', topic: '박지호 학부모 상담', type: 'phone', students: 1 },
        { time: '16:00-17:00', subject: '멘토링', class: '1:1', topic: '이서연 - 수학 기초', type: 'online', students: 1 }
      ]
    },
    {
      id: 4,
      day: '목',
      date: '01/25',
      slots: [
        { time: '10:00-11:00', subject: '수학', class: '5-1', topic: '통계와 그래프', type: 'online', students: 25 },
        { time: '14:00-15:00', subject: '수학', class: '6-2', topic: '원의 넓이', type: 'online', students: 27 }
      ]
    },
    {
      id: 5,
      day: '금',
      date: '01/26',
      slots: [
        { time: '09:00-10:00', subject: '수학', class: '5-3', topic: '주간 평가', type: 'online', students: 28 },
        { time: '13:00-14:00', subject: '교사회의', class: '교사', topic: '월간 학습 회의', type: 'offline', location: '교무실', students: 12 },
        { time: '15:00-16:00', subject: '특강', class: '전체', topic: '수학 심화반', type: 'online', students: 20 }
      ]
    },
    {
      id: 6,
      day: '토',
      date: '01/27',
      slots: [
        { time: '10:00-12:00', subject: '특별활동', class: '전체', topic: '수학 체험 활동', type: 'offline', location: '과학관', students: 35 }
      ]
    },
    {
      id: 7,
      day: '일',
      date: '01/28',
      slots: []
    }
  ];

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'online': return 'bg-blue-100 text-blue-700';
      case 'offline': return 'bg-green-100 text-green-700';
      case 'phone': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const classes = ['all', '5-1', '5-3', '6-2', '1:1', '특강'];

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">수업 일정</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">주간 수업 및 멘토링 일정</p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>
                  {cls === 'all' ? '전체 학급' : cls === '1:1' ? '1:1 멘토링' : cls === '특강' ? '특별 강의' : `${cls}반`}
                </option>
              ))}
            </select>
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">수업 추가</span>
              <span className="sm:hidden">추가</span>
            </button>
          </div>
        </div>

        {/* 주간 네비게이션 */}
        <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentWeek(new Date(currentWeek.getTime() - 7 * 24 * 60 * 60 * 1000))}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            <h3 className="text-sm sm:text-lg font-bold text-gray-900 text-center">
              <span className="hidden sm:inline">2024년 1월 4주 ({currentWeek.toLocaleDateString('ko-KR')} - {new Date(currentWeek.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR')})</span>
              <span className="sm:hidden">1월 4주</span>
            </h3>
            <button
              onClick={() => setCurrentWeek(new Date(currentWeek.getTime() + 7 * 24 * 60 * 60 * 1000))}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </div>
        </div>

        {/* 주간 시간표 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-700">시간</th>
                  {schedules.map(day => (
                    <th key={day.id} className="px-2 sm:px-4 py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-700 min-w-[100px] sm:min-w-[150px]">
                      <div className="hidden sm:inline">{day.day}요일</div>
                      <div className="sm:hidden">{day.day}</div>
                      <div className="text-xs text-gray-500">{day.date}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['09:00', '10:00', '13:00', '14:00', '15:00', '16:00'].map(hour => (
                  <tr key={hour} className="border-t">
                    <td className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm text-gray-600">{hour}</td>
                    {schedules.map(day => {
                      const slot = day.slots.find(s => s.time.startsWith(hour));
                      const shouldShow = selectedClass === 'all' || slot?.class === selectedClass ||
                                       (selectedClass === '1:1' && slot?.class === '1:1') ||
                                       (selectedClass === '특강' && slot?.subject === '특강');
                      
                      if (slot && shouldShow) {
                        return (
                          <td key={day.id} className="px-1 sm:px-2 py-1 sm:py-2">
                            <div className="p-1 sm:p-2 rounded-lg bg-blue-50 border border-blue-200 cursor-pointer hover:bg-blue-100">
                              <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                                <span className="font-medium text-xs text-gray-900">{slot.subject}</span>
                                <span className={`hidden sm:inline-block px-1 py-0.5 rounded text-xs ${getTypeColor(slot.type)}`}>
                                  {slot.type === 'online' ? '온라인' :
                                   slot.type === 'offline' ? '오프라인' :
                                   slot.type === 'phone' ? '전화' : slot.type}
                                </span>
                              </div>
                              <p className="text-xs text-gray-700 mb-0.5 sm:mb-1 line-clamp-1">{slot.topic}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Users className="w-3 h-3 mr-1" />
                                  {slot.class}
                                </span>
                                <span>{slot.students}명</span>
                              </div>
                              {slot.location && (
                                <div className="mt-1 flex items-center text-xs text-gray-500">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {slot.location}
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      }
                      return <td key={day.id} className="px-1 sm:px-2 py-1 sm:py-2"></td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 오늘의 수업 */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">오늘의 수업</h3>
          <div className="space-y-2 sm:space-y-3">
            {schedules[3].slots.map((slot, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="text-center min-w-[60px] sm:min-w-[auto]">
                    <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 mx-auto" />
                    <p className="text-xs sm:text-sm font-medium text-gray-900 mt-1">{slot.time}</p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm sm:text-base text-gray-900">
                      {slot.subject} - {slot.class}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">{slot.topic}</p>
                    <div className="flex items-center space-x-2 sm:space-x-3 mt-1">
                      <span className="flex items-center text-xs text-gray-500">
                        <Users className="w-3 h-3 mr-1" />
                        {slot.students}명
                      </span>
                      {slot.type === 'online' ? (
                        <span className="flex items-center text-xs text-gray-500">
                          <Video className="w-3 h-3 mr-1" />
                          온라인
                        </span>
                      ) : (
                        <span className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {slot.location || '오프라인'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end sm:justify-start space-x-2">
                  {slot.type === 'online' && (
                    <button className="px-2 sm:px-3 py-1 bg-blue-500 text-white rounded text-xs sm:text-sm hover:bg-blue-600">
                      <span className="hidden sm:inline">강의실 입장</span>
                      <span className="sm:hidden">입장</span>
                    </button>
                  )}
                  <button className="p-1 text-gray-600 hover:text-gray-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClassSchedule;