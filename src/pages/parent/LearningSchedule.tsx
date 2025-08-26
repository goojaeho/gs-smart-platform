import Layout from '../../components/common/Layout';
import { Calendar, Clock, Bell, Plus, ChevronLeft, ChevronRight, MapPin, Video, Book, Users, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { students } from '../../data/mockData';

const LearningSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 25));
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 0, 25));
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const childData = students[0];

  const schedules = [
    {
      id: 1,
      date: '2024-01-25',
      time: '09:00-10:00',
      title: '수학 - 도형의 넓이',
      type: 'online',
      subject: '수학',
      teacher: '김수학 선생님',
      location: '온라인 강의실',
      color: 'bg-blue-500',
      reminder: true,
      status: 'upcoming'
    },
    {
      id: 2,
      date: '2024-01-25',
      time: '14:00-15:00',
      title: '영어 Speaking Practice',
      type: 'online',
      subject: '영어',
      teacher: 'James 선생님',
      location: '화상 멘토링',
      color: 'bg-green-500',
      reminder: true,
      status: 'upcoming'
    },
    {
      id: 3,
      date: '2024-01-25',
      time: '16:00-17:00',
      title: 'Python 프로그래밍',
      type: 'online',
      subject: 'AI/코딩',
      teacher: '이코딩 선생님',
      location: '온라인 실습실',
      color: 'bg-purple-500',
      reminder: false,
      status: 'upcoming'
    },
    {
      id: 4,
      date: '2024-01-26',
      time: '10:00-11:30',
      title: '과학 실험 - 전기회로',
      type: 'offline',
      subject: '과학',
      teacher: '최과학 선생님',
      location: '경산학습센터 3층',
      color: 'bg-pink-500',
      reminder: true,
      status: 'upcoming'
    },
    {
      id: 5,
      date: '2024-01-27',
      time: '14:00-16:00',
      title: '독서 토론회',
      type: 'offline',
      subject: '국어',
      teacher: '강국어 선생님',
      location: '경산도서관',
      color: 'bg-red-500',
      reminder: false,
      status: 'upcoming'
    },
    {
      id: 6,
      date: '2024-01-24',
      time: '15:00-16:00',
      title: '수학 평가',
      type: 'online',
      subject: '수학',
      teacher: '김수학 선생님',
      location: '온라인 시험',
      color: 'bg-orange-500',
      reminder: true,
      status: 'completed',
      result: '92점'
    }
  ];

  const todaySchedules = schedules.filter(s => s.date === '2024-01-25');
  const upcomingSchedules = schedules.filter(s => s.status === 'upcoming').slice(0, 5);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const monthDays = getDaysInMonth(currentDate);
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const getSchedulesForDate = (day: number) => {
    const dateStr = `2024-01-${day.toString().padStart(2, '0')}`;
    return schedules.filter(s => s.date === dateStr);
  };

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">학습 일정</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">{childData.name}의 학습 스케줄 관리</p>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <div className="flex rounded-lg overflow-hidden border border-gray-300">
              {['month', 'week', 'day'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-2 sm:px-4 py-2 text-sm sm:text-base ${
                    viewMode === mode ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {mode === 'month' ? '월' : mode === 'week' ? '주' : '일'}
                </button>
              ))}
            </div>
            <button className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Plus className="w-4 h-4" />
              <span className="text-sm sm:text-base">일정 추가</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* 캘린더 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
                <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 hover:text-gray-900" />
              </button>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
              </h3>
              <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600 hover:text-gray-900" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
              {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-600 py-1 sm:py-2">
                  {day}
                </div>
              ))}
              {monthDays.map((day, index) => {
                const daySchedules = day ? getSchedulesForDate(day) : [];
                const isToday = day === 25;
                const isSelected = day === selectedDate.getDate();
                
                return (
                  <div
                    key={index}
                    onClick={() => day && setSelectedDate(new Date(2024, 0, day))}
                    className={`
                      min-h-[50px] sm:min-h-[80px] p-1 sm:p-2 border rounded cursor-pointer transition-colors
                      ${!day ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}
                      ${isToday ? 'border-blue-500 border-2' : 'border-gray-200'}
                      ${isSelected ? 'bg-blue-50' : ''}
                    `}
                  >
                    {day && (
                      <>
                        <div className={`text-xs sm:text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                          {day}
                        </div>
                        <div className="mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1 hidden sm:block">
                          {daySchedules.slice(0, 2).map((schedule, idx) => (
                            <div
                              key={idx}
                              className={`text-xs px-1 py-0.5 rounded ${schedule.color} text-white truncate`}
                            >
                              {schedule.title}
                            </div>
                          ))}
                          {daySchedules.length > 2 && (
                            <div className="text-xs text-gray-500">+{daySchedules.length - 2}</div>
                          )}
                        </div>
                        {daySchedules.length > 0 && (
                          <div className="sm:hidden mt-0.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${daySchedules[0].color} mx-auto`} />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 오늘의 일정 */}
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <Calendar className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-blue-500" />
                오늘의 일정
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {todaySchedules.length > 0 ? (
                  todaySchedules.map((schedule) => (
                    <div key={schedule.id} className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">{schedule.title}</p>
                          <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{schedule.time}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 sm:mt-1">
                            {schedule.type === 'online' ? (
                              <Video className="w-3 h-3 text-gray-400" />
                            ) : (
                              <MapPin className="w-3 h-3 text-gray-400" />
                            )}
                            <span className="text-xs text-gray-600 truncate">{schedule.location}</span>
                          </div>
                        </div>
                        {schedule.reminder && (
                          <Bell className="w-3 sm:w-4 h-3 sm:h-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs sm:text-sm text-gray-500">오늘은 예정된 일정이 없습니다.</p>
                )}
              </div>
            </div>

            {/* 다가오는 일정 */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">다가오는 일정</h3>
              <div className="space-y-2 sm:space-y-3">
                {upcomingSchedules.map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between py-1.5 sm:py-2 border-b last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{schedule.title}</p>
                      <p className="text-xs text-gray-500">{schedule.date} {schedule.time}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${schedule.color}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 일정 상세 */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
            {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 일정 상세
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {getSchedulesForDate(selectedDate.getDate()).map((schedule) => (
              <div key={schedule.id} className="border rounded-lg p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded text-white text-xs sm:text-sm ${schedule.color}`}>
                        {schedule.subject}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-gray-900">{schedule.time}</span>
                      {schedule.status === 'completed' && schedule.result && (
                        <span className="px-2 py-0.5 sm:py-1 bg-green-100 text-green-700 rounded text-xs">
                          완료 - {schedule.result}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">{schedule.title}</h4>
                    <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span>{schedule.teacher}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {schedule.type === 'online' ? (
                          <Video className="w-3 sm:w-4 h-3 sm:h-4" />
                        ) : (
                          <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />
                        )}
                        <span>{schedule.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <button className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600">
                      <Edit className="w-3 sm:w-4 h-3 sm:h-4" />
                    </button>
                    <button className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600">
                      <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={schedule.reminder}
                      className="rounded text-blue-500"
                      readOnly
                    />
                    <span className="text-xs sm:text-sm text-gray-600">알림 설정</span>
                  </label>
                  {schedule.type === 'online' && schedule.status === 'upcoming' && (
                    <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">
                      강의실 입장 →
                    </button>
                  )}
                </div>
              </div>
            ))}
            {getSchedulesForDate(selectedDate.getDate()).length === 0 && (
              <p className="text-center text-gray-500 py-6 sm:py-8 text-sm">선택한 날짜에 일정이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearningSchedule;