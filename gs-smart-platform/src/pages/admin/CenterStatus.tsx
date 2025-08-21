import Layout from '../../components/common/Layout';
import { MapPin, Users, TrendingUp, Activity, Award, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { centers } from '../../data/mockData';

const CenterStatus = () => {
  const [selectedCenter, setSelectedCenter] = useState<any>(null);

  const centerStats = centers.map(center => ({
    ...center,
    activeStudents: Math.floor(Math.random() * 50) + 150,
    todayAttendance: Math.floor(Math.random() * 20) + 80,
    weeklyGrowth: Math.floor(Math.random() * 10) - 2,
    satisfaction: (Math.random() * 0.5 + 4.5).toFixed(1),
    issues: Math.floor(Math.random() * 3)
  }));

  const getStatusColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">센터별 현황</h2>
            <p className="text-gray-600 mt-1">경산시 전체 학습센터 운영 현황</p>
          </div>
          <div className="flex space-x-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>전체 센터</option>
              <option>운영중</option>
              <option>점검중</option>
            </select>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              실시간 모니터링
            </button>
          </div>
        </div>

        {/* 전체 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-sm text-gray-600">운영 센터</h3>
            <p className="text-2xl font-bold text-gray-900">{centerStats.length}개</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-green-500" />
              <span className="text-sm text-green-600">+125명</span>
            </div>
            <h3 className="text-sm text-gray-600">전체 학생</h3>
            <p className="text-2xl font-bold text-gray-900">
              {centerStats.reduce((sum, c) => sum + c.activeStudents, 0)}명
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-sm text-gray-600">평균 출석률</h3>
            <p className="text-2xl font-bold text-gray-900">
              {(centerStats.reduce((sum, c) => sum + c.todayAttendance, 0) / centerStats.length).toFixed(1)}%
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-sm text-gray-600">처리 대기</h3>
            <p className="text-2xl font-bold text-gray-900">
              {centerStats.reduce((sum, c) => sum + c.issues, 0)}건
            </p>
          </div>
        </div>

        {/* 센터 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {centerStats.map((center) => (
            <div 
              key={center.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCenter(center)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{center.name}</h3>
                  <p className="text-sm text-gray-600">경산시</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  center.status === '운영중' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {center.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">활동 학생</span>
                  <span className="font-medium text-gray-900">{center.activeStudents}명</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">오늘 출석률</span>
                  <span className={`font-medium ${getStatusColor(center.todayAttendance)}`}>
                    {center.todayAttendance}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">만족도</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium text-gray-900">{center.satisfaction}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">주간 성장률</span>
                  <span className={`font-medium ${
                    center.weeklyGrowth > 0 ? 'text-green-600' : 
                    center.weeklyGrowth < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {center.weeklyGrowth > 0 ? '+' : ''}{center.weeklyGrowth}%
                  </span>
                </div>
              </div>

              {center.issues > 0 && (
                <div className="mt-4 p-2 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    처리 필요 사항 {center.issues}건
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 센터 상세 모달 */}
        {selectedCenter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedCenter.name}</h3>
                  <p className="text-gray-600">경산시</p>
                </div>
                <button 
                  onClick={() => setSelectedCenter(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">센터장</p>
                  <p className="font-medium text-gray-900">{selectedCenter.director}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">연락처</p>
                  <p className="font-medium text-gray-900">{selectedCenter.contact}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">교사 수</p>
                  <p className="font-medium text-gray-900">{selectedCenter.teachers}명</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">시설 규모</p>
                  <p className="font-medium text-gray-900">{selectedCenter.capacity}명 수용</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">운영 시간</h4>
                  <p className="text-sm text-gray-600">평일: 09:00 - 21:00</p>
                  <p className="text-sm text-gray-600">주말: 10:00 - 18:00</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">주요 프로그램</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">수학</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">영어</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">AI/코딩</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">과학</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CenterStatus;