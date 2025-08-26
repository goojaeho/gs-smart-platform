import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Bell, LogOut, User, GraduationCap, Search, MessageSquare, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [fontSize, setFontSize] = useState('medium');
  const [unreadQuestions, setUnreadQuestions] = useState(3); // Mock data for unread questions
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getRoleName = (role: string) => {
    const roleNames = {
      student: '학생',
      parent: '학부모',
      teacher: '교사',
      admin: '관리자'
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

  // Font size adjustment function (matches LandingGov)
  const adjustFontSize = (size: string) => {
    setFontSize(size);
    document.documentElement.style.fontSize = 
      size === 'small' ? '14px' : 
      size === 'large' ? '18px' : '16px';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      {/* 상단 유틸리티 바 (LandingGov 스타일) - 모바일에서 숨김 */}
      <div className="hidden sm:block bg-[#f8f9fa] border-b border-[#dee2e6]">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            {/* 좌측: 관련 사이트 */}
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-[#666666] hover:text-[#0397D6] transition">경산시청</a>
              <span className="text-[#cccccc]">|</span>
              <a href="#" className="text-[#666666] hover:text-[#0397D6] transition">경산교육지원청</a>
            </div>
            
            {/* 우측: 글자 크기, 언어, 사용자 정보 */}
            <div className="flex items-center space-x-4 text-sm">
              {/* 글자 크기 조절 */}
              <div className="flex items-center space-x-1">
                <span className="text-[#666666] mr-2">글자크기</span>
                <button 
                  onClick={() => adjustFontSize('small')}
                  className={`px-2 py-1 border ${fontSize === 'small' ? 'bg-[#0397D6] text-white' : 'bg-white text-[#666666]'}`}
                  aria-label="글자 작게"
                >
                  가-
                </button>
                <button 
                  onClick={() => adjustFontSize('medium')}
                  className={`px-2 py-1 border ${fontSize === 'medium' ? 'bg-[#0397D6] text-white' : 'bg-white text-[#666666]'}`}
                  aria-label="글자 보통"
                >
                  가
                </button>
                <button 
                  onClick={() => adjustFontSize('large')}
                  className={`px-2 py-1 border ${fontSize === 'large' ? 'bg-[#0397D6] text-white' : 'bg-white text-[#666666]'}`}
                  aria-label="글자 크게"
                >
                  가+
                </button>
              </div>
              
              <span className="text-[#cccccc]">|</span>
              
              {/* 언어 선택 */}
              <select className="bg-transparent text-[#666666] outline-none">
                <option>한국어</option>
                <option>English</option>
                <option>中文</option>
              </select>
              
              <span className="text-[#cccccc]">|</span>
              
              {/* 사용자 정보 */}
              <span className="text-[#666666]">{user?.name} ({getRoleName(user?.role || '')})</span>
              
              <button
                onClick={logout}
                className="text-[#0397D6] hover:underline font-medium"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 헤더 (LandingGov 스타일) */}
      <div className="bg-white shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* 로고 */}
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0397D6] rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div>
                  <div className="text-base sm:text-xl font-bold text-[#333333]">경산시 스마트학습 플랫폼</div>
                  <div className="hidden sm:block text-xs text-[#666666]">Gyeongsan Smart Learning Platform</div>
                </div>
              </a>
            </div>

            {/* 검색바 */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="무엇을 도와드릴까요?"
                  className="w-full px-4 py-2 pr-10 border border-[#cccccc] rounded-lg focus:outline-none focus:border-[#0397D6]"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-[#666666]" />
                </button>
              </div>
            </div>

            {/* 알림 및 빠른 액세스 버튼 */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Teacher Q&A Button - 모바일에서 아이콘만 표시 */}
              {user?.role === 'teacher' && (
                <button 
                  onClick={() => navigate('/teacher/qa')}
                  className="relative flex items-center space-x-2 px-2 sm:px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm font-medium">질문 답변</span>
                  {unreadQuestions > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadQuestions}
                    </span>
                  )}
                </button>
              )}
              
              {/* Notification Bell */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              <span className="text-xs text-gray-500">{getRoleName(user?.role || '')}</span>
            </div>
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left text-sm text-red-600 hover:text-red-700 font-medium py-2"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;