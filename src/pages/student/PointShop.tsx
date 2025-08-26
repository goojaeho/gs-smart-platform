import Layout from '../../components/common/Layout';
import { Award, ShoppingCart, Gift, Zap, Star, TrendingUp, Clock } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { students } from '../../data/mockData';

const PointShop = () => {
  const { user } = useAuthStore();
  const studentData = students.find(s => s.id === user?.id) || students[0];
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '학용품', '간식', '문화상품권', '캐릭터', '특별상품'];

  const items = [
    { id: 1, name: '스타벅스 아메리카노', category: '간식', points: 500, image: '☕', stock: 10, isHot: true },
    { id: 2, name: '문화상품권 5000원', category: '문화상품권', points: 550, image: '🎫', stock: 5, isHot: true },
    { id: 3, name: '고급 샤프펜슬', category: '학용품', points: 300, image: '✏️', stock: 20 },
    { id: 4, name: '캐릭터 스티커 세트', category: '캐릭터', points: 150, image: '🎨', stock: 30 },
    { id: 5, name: '피자 1조각 쿠폰', category: '간식', points: 400, image: '🍕', stock: 8 },
    { id: 6, name: '노트북 파우치', category: '학용품', points: 800, image: '💼', stock: 3, isNew: true },
    { id: 7, name: '레고 미니세트', category: '캐릭터', points: 1000, image: '🧱', stock: 2, isSpecial: true },
    { id: 8, name: 'CGV 영화티켓', category: '문화상품권', points: 1200, image: '🎬', stock: 4, isSpecial: true },
  ];

  const pointHistory = [
    { id: 1, description: '일일 미션 완료', points: 50, date: '2024-01-18', type: 'earn' },
    { id: 2, description: '수학 문제 10개 풀기', points: 30, date: '2024-01-18', type: 'earn' },
    { id: 3, description: '스타벅스 아메리카노 구매', points: -500, date: '2024-01-17', type: 'spend' },
    { id: 4, description: '독서 완료 - 어린왕자', points: 100, date: '2024-01-16', type: 'earn' },
  ];

  const filteredItems = selectedCategory === '전체' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">포인트샵</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">열심히 모은 포인트로 상품을 구매하세요!</p>
          </div>
          <div className="flex items-center justify-between sm:justify-start sm:space-x-4 md:space-x-6">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-500">보유 포인트</p>
              <p className="text-2xl sm:text-3xl font-bold text-orange-600">{studentData.points.toLocaleString()}P</p>
            </div>
            <button className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm sm:text-base">장바구니</span>
            </button>
          </div>
        </div>

        {/* 포인트 획득 방법 */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold mb-2">오늘의 포인트 미션</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 mt-3 sm:mt-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-2.5 sm:p-3">
                  <p className="font-medium text-sm sm:text-base mb-1">출석 체크</p>
                  <p className="text-xs sm:text-sm opacity-90">+10P (완료)</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-2.5 sm:p-3">
                  <p className="font-medium text-sm sm:text-base mb-1">학습 1시간</p>
                  <p className="text-xs sm:text-sm opacity-90">+30P (진행중)</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-2.5 sm:p-3">
                  <p className="font-medium text-sm sm:text-base mb-1">문제 20개 풀기</p>
                  <p className="text-xs sm:text-sm opacity-90">+50P</p>
                </div>
              </div>
            </div>
            <Zap className="hidden sm:block w-12 sm:w-16 h-12 sm:h-16 opacity-50" />
          </div>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium whitespace-nowrap transition-colors text-sm sm:text-base ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 상품 목록 */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-3 sm:p-4 hover:shadow-lg transition-shadow">
                  <div className="relative">
                    {item.isHot && (
                      <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full">
                        HOT
                      </span>
                    )}
                    {item.isNew && (
                      <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500 text-white text-[10px] sm:text-xs rounded-full">
                        NEW
                      </span>
                    )}
                    {item.isSpecial && (
                      <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-purple-500 text-white text-[10px] sm:text-xs rounded-full">
                        특별
                      </span>
                    )}
                    <div className="w-full h-20 sm:h-24 bg-gray-100 rounded-lg flex items-center justify-center text-3xl sm:text-4xl mb-2 sm:mb-3">
                      {item.image}
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 text-xs sm:text-sm mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-2">재고: {item.stock}개</p>
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-bold text-orange-600">{item.points}P</span>
                    <button 
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-medium transition-colors ${
                        studentData.points >= item.points
                          ? 'bg-orange-500 text-white hover:bg-orange-600'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={studentData.points < item.points}
                    >
                      구매
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 사이드바 - Hidden on mobile */}
          <div className="hidden lg:block space-y-6">
            {/* 포인트 내역 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">최근 포인트 내역</h3>
              <div className="space-y-3">
                {pointHistory.map(history => (
                  <div key={history.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{history.description}</p>
                      <p className="text-xs text-gray-500">{history.date}</p>
                    </div>
                    <span className={`font-bold ${
                      history.type === 'earn' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {history.type === 'earn' ? '+' : ''}{history.points}P
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
                전체 내역 보기
              </button>
            </div>

            {/* 포인트 랭킹 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">포인트 랭킹</h3>
                <TrendingUp className="w-5 h-5 text-orange-500" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-yellow-500">🥇</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">김민준</p>
                      <p className="text-xs text-gray-500">4,200P</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">#1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-400">🥈</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">이서연</p>
                      <p className="text-xs text-gray-500">3,850P</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">#2</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-orange-600">🥉</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">박지호</p>
                      <p className="text-xs text-gray-500">3,500P</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">#3</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-blue-600">나</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{studentData.name}</p>
                      <p className="text-xs text-gray-500">{studentData.points}P</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">#7</span>
                </div>
              </div>
            </div>

            {/* 포인트 팁 */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-bold text-gray-900 mb-2">💡 포인트 모으기 팁</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• 매일 출석 체크하기 (+10P)</li>
                <li>• 일일 미션 완료하기 (+50P)</li>
                <li>• 독서 완료하기 (+100P)</li>
                <li>• 멘토링 참여하기 (+30P)</li>
                <li>• 주간 목표 달성하기 (+200P)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PointShop;