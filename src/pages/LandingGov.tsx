import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  GraduationCap, Monitor, Brain, MessageCircle, Users, BookOpen, 
  Settings, ArrowRight, ChevronDown, Menu, X, Phone, Mail, MapPin,
  Clock, Award, TrendingUp, ChevronLeft, ChevronRight,
  Home, Search, User as UserIcon, Globe, CheckCircle, AlertCircle,
  FileText, Calendar, BarChart3, Headphones, Facebook, Youtube, 
  Instagram, BookMarked
} from 'lucide-react';

// GS Smart Platform 색상 (PDF 요구사항에 맞춤)
const govColors = {
  primary: '#0397D6',
  secondary: '#63C29D', 
  lightBlue: '#4a90e2',
  success: '#5cb85c',
  warning: '#f0ad4e',
  danger: '#d9534f',
  gray: {
    900: '#212529',
    800: '#333333',
    700: '#495057',
    600: '#666666',
    500: '#999999',
    400: '#cccccc',
    300: '#dee2e6',
    200: '#e9ecef',
    100: '#f5f5f5',
    50: '#f8f9fa'
  }
};

const LandingGov = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fontSize, setFontSize] = useState('medium');

  // 메인 비주얼 슬라이드
  const slides = [
    {
      title: "AI 기술과 인간적 교감이 결합된",
      subtitle: "초개인화 학습 생태계로 경산시 아이들의 무한한 가능성을 펼칩니다",
      image: "bg-gradient-to-br from-[#0397D6] to-[#63C29D]"
    },
    {
      title: "러닝메이트와 함께하는 학습 여행",
      subtitle: "캐릭터 성장과 미션 기반 학습으로 재미있게 공부해요",
      image: "bg-gradient-to-br from-[#63C29D] to-[#0397D6]"
    },
    {
      title: "전문 교사와 함께하는 온라인 멘토링",
      subtitle: "실시간 화상 수업으로 언제 어디서나 학습 가능",
      image: "bg-gradient-to-br from-[#0397D6] to-[#4a90e2]"
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => navigate('/login');

  // 접근성: 글자 크기 조절
  const adjustFontSize = (size: string) => {
    setFontSize(size);
    document.documentElement.style.fontSize = 
      size === 'small' ? '14px' : 
      size === 'large' ? '18px' : '16px';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 접근성 Skip Navigation */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-[#1e4788] text-white p-2 z-50">
        본문 바로가기
      </a>

      {/* 상단 유틸리티 바 */}
      <div className="bg-[#f8f9fa] border-b border-[#dee2e6]">
        <div className="max-w-[1280px] mx-auto px-4">
          {/* Mobile View */}
          <div className="sm:hidden">
            <div className="flex justify-between items-center h-10">
              {/* 좌측: 관련 사이트 드롭다운 */}
              <select className="bg-transparent text-[#666666] text-xs outline-none max-w-[100px] truncate">
                <option>관련사이트</option>
                <option>경산시청</option>
                <option>경산교육지원청</option>
              </select>
              
              {/* 우측: 언어와 로그인 */}
              <div className="flex items-center gap-2 text-xs">
                <select className="bg-transparent text-[#666666] outline-none">
                  <option>한국어</option>
                  <option>English</option>
                  <option>中文</option>
                </select>
                <button onClick={handleLogin} className="text-[#0397D6] font-medium px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                  로그인
                </button>
              </div>
            </div>
          </div>
          
          {/* Desktop View */}
          <div className="hidden sm:flex justify-between items-center h-10">
            {/* 좌측: 관련 사이트 */}
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-[#666666] hover:text-[#1e4788] transition">경산시청</a>
              <span className="text-[#cccccc]">|</span>
              <a href="#" className="text-[#666666] hover:text-[#1e4788] transition">경산교육지원청</a>
            </div>
            
            {/* 우측: 글자 크기, 언어, 로그인 */}
            <div className="flex items-center space-x-2 lg:space-x-4 text-sm">
              {/* 글자 크기 조절 - Hide on tablet, show on desktop */}
              <div className="hidden lg:flex items-center space-x-1">
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
              
              <span className="text-[#cccccc] hidden lg:inline">|</span>
              
              {/* 언어 선택 */}
              <select className="bg-transparent text-[#666666] outline-none">
                <option>한국어</option>
                <option>English</option>
                <option>中文</option>
              </select>
              
              <span className="text-[#cccccc]">|</span>
              
              {/* 로그인 */}
              <button onClick={handleLogin} className="text-[#0397D6] hover:underline font-medium">
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <header className={`sticky top-0 z-40 transition-all ${scrolled ? 'shadow-md' : ''}`}>
        <div className="bg-white">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* 로고 */}
              <div className="flex items-center space-x-4">
                <a href="/" className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0397D6] rounded-lg flex items-center justify-center shadow-sm">
                    <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-xl font-bold text-[#333333] leading-tight">
                      <span className="block sm:inline">경산시 스마트학습</span>
                      <span className="block sm:inline sm:ml-1">플랫폼</span>
                    </div>
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

              {/* 모바일 메뉴 버튼 */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="메뉴"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* GNB 메뉴 */}
          <nav className="hidden lg:block bg-[#0397D6]">
            <div className="max-w-[1280px] mx-auto px-4">
              <ul className="flex">
                {[
                  { icon: Home, label: '홈', active: true },
                  { icon: Monitor, label: '온라인 학습' },
                  { icon: Brain, label: 'AI 학습진단' },
                  { icon: BookOpen, label: '디지털 책방' },
                  { icon: Award, label: '포인트몰' },
                  { icon: FileText, label: '공지사항' },
                  { icon: Headphones, label: '고객지원' },
                  { icon: BookOpen, label: '학습자료실' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={idx}>
                      <button className={`flex items-center space-x-2 px-6 py-4 text-white hover:bg-[#63C29D] transition ${item.active ? 'bg-[#63C29D]' : ''}`}>
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="p-4 space-y-2">
              {['온라인 학습', 'AI 학습진단', '멘토링', '학습자료실', '공지사항', '고객지원'].map((item, idx) => (
                <button key={idx} className="w-full text-left py-3 px-4 text-[#333333] hover:bg-[#f5f5f5] rounded transition-colors touch-manipulation">
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* 메인 비주얼 */}
      <section id="main-content" className="relative h-[280px] sm:h-[330px] md:h-[400px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 ${slide.image}`} />
            <div className="relative h-full flex items-center">
              <div className="max-w-[1280px] mx-auto px-4 w-full">
                <div className="max-w-2xl text-center sm:text-left">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 px-2 sm:px-0">
                    {slide.subtitle}
                  </p>
                  <button 
                    onClick={handleLogin}
                    className="px-6 sm:px-8 py-3 bg-white text-[#0397D6] rounded-lg font-medium hover:bg-[#f5f5f5] transition-all hover:scale-105 shadow-lg"
                  >
                    <span className="text-sm sm:text-base">학습 시작하기</span>
                    <ArrowRight className="inline-block w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 슬라이드 인디케이터 */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all touch-manipulation ${
                index === currentSlide ? 'bg-white w-6 sm:w-8' : 'bg-white/50'
              }`}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>

        {/* 슬라이드 컨트롤 */}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition touch-manipulation"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition touch-manipulation"
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </section>

      {/* 빠른 링크 - 히어로 섹션 바로 아래로 이동 */}
      <section className="py-6 sm:py-8 bg-[#f8f9fa]">
        <div className="max-w-[1280px] mx-auto px-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#333333] text-center mb-4 sm:mb-6">빠른 서비스</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {[
              { icon: '📚', label: '학습가이드', route: '/student/today' },
              { icon: '📝', label: '과제제출', route: '/student/today' },
              { icon: '📊', label: '성적확인', route: '/student' },
              { icon: '👨‍🏫', label: '멘토찾기', route: '/student/mentoring' },
              { icon: '📅', label: '학습일정', route: '/parent/schedule' },
              { icon: '💬', label: '질문하기', route: '/student/questions' },
              { icon: '🎓', label: '수료증', route: '/student/notes' },
              { icon: '📞', label: '상담예약', route: '/parent/consultation' }
            ].map((link, idx) => {
              const handleQuickNavClick = async () => {
                try {
                  // Determine role based on the route
                  const role = link.route.startsWith('/parent') ? 'parent' : 
                               link.route.startsWith('/teacher') ? 'teacher' : 
                               link.route.startsWith('/admin') ? 'admin' : 'student';
                  
                  // Use the same test credentials as LoginPage
                  const testCredentials = {
                    student: { email: 'student@test.com', password: 'password' },
                    parent: { email: 'parent@test.com', password: 'password' },
                    teacher: { email: 'teacher@test.com', password: 'password' },
                    admin: { email: 'admin@test.com', password: 'password' }
                  };
                  
                  const creds = testCredentials[role];
                  
                  // Use the auth store's login function
                  await login(creds.email, creds.password, role);
                  
                  // Navigate after successful login
                  navigate(link.route);
                } catch (error) {
                  console.error('Quick login failed:', error);
                  // Fallback to regular login page if quick login fails
                  navigate('/login');
                }
              };

              return (
                <button 
                  key={idx} 
                  onClick={handleQuickNavClick}
                  className="bg-white rounded-lg p-3 sm:p-4 hover:shadow-md transition-all text-center group cursor-pointer hover:bg-gray-50 hover:scale-105 touch-manipulation"
                >
                  <div className="text-xl sm:text-2xl mb-2 group-hover:scale-110 transition-transform">{link.icon}</div>
                  <div className="text-xs sm:text-sm text-[#666666] font-medium leading-tight">{link.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 공지사항 & 자료실 */}
      <section className="py-8 sm:py-16">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* 공지사항 */}
            <div className="bg-white rounded-lg border border-[#dee2e6] p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#333333] flex items-center">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#d9534f]" />
                  공지사항
                </h3>
                <button className="text-xs sm:text-sm text-[#0397D6] hover:underline font-medium">
                  더보기 →
                </button>
              </div>
              <ul className="space-y-3">
                {[
                  { title: '[중요] 2024년 신학기 플랫폼 이용 안내', date: '2024.01.25', isNew: true, isImportant: true },
                  { title: 'AI 학습진단 서비스 업데이트 안내', date: '2024.01.23', isNew: true },
                  { title: '겨울방학 특별 프로그램 참가자 모집', date: '2024.01.20' },
                  { title: '시스템 정기 점검 일정 안내', date: '2024.01.18' },
                  { title: '1월 멘토링 일정 안내', date: '2024.01.15' }
                ].map((item, idx) => (
                  <li key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b last:border-0 gap-1 sm:gap-2">
                    <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                      {item.isImportant && (
                        <span className="px-2 py-0.5 bg-[#d9534f] text-white text-xs rounded font-medium">중요</span>
                      )}
                      {item.isNew && (
                        <span className="px-2 py-0.5 bg-[#f0ad4e] text-white text-xs rounded font-medium">NEW</span>
                      )}
                      <a href="#" className="text-sm sm:text-base text-[#333333] hover:text-[#0397D6] hover:underline line-clamp-2 sm:line-clamp-1">
                        {item.title}
                      </a>
                    </div>
                    <span className="text-xs sm:text-sm text-[#999999] self-start sm:self-center flex-shrink-0">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 학습자료실 */}
            <div className="bg-white rounded-lg border border-[#dee2e6] p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-[#333333] flex items-center">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#1e4788]" />
                  학습자료실
                </h3>
                <button className="text-xs sm:text-sm text-[#0397D6] hover:underline font-medium">
                  더보기 →
                </button>
              </div>
              <ul className="space-y-3">
                {[
                  { title: '[수학] 5학년 1학기 단원평가 문제', category: '수학', downloads: 234 },
                  { title: '[영어] 기초 문법 정리 자료', category: '영어', downloads: 189 },
                  { title: '[과학] 실험 보고서 작성법', category: '과학', downloads: 156 },
                  { title: '[국어] 독서 감상문 예시 모음', category: '국어', downloads: 145 },
                  { title: '[코딩] Python 기초 교재', category: '코딩', downloads: 312 }
                ].map((item, idx) => (
                  <li key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b last:border-0 gap-1 sm:gap-2">
                    <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                      <span className="px-2 py-0.5 bg-[#f5f5f5] text-[#666666] text-xs rounded font-medium flex-shrink-0">
                        {item.category}
                      </span>
                      <a href="#" className="text-sm sm:text-base text-[#333333] hover:text-[#0397D6] hover:underline line-clamp-2 sm:line-clamp-1">
                        {item.title}
                      </a>
                    </div>
                    <span className="text-xs sm:text-sm text-[#999999] self-start sm:self-center flex-shrink-0">↓ {item.downloads}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 서비스 */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] text-center mb-6 sm:mb-10">주요 서비스</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Monitor, title: '온라인 학습', desc: 'AI 기술과 인간적\n교감이 결합된 학습', color: '#0397D6' },
              { icon: Brain, title: 'AI 학습진단', desc: '개인별 맞춤 학습\n수준 분석 서비스', color: '#63C29D' },
              { icon: BookOpen, title: '디지털 책방', desc: '온라인 독서 서비스\n전자책 제공', color: '#0397D6' },
              { icon: Award, title: '포인트몰', desc: '학습 성과를 포인트로\n다양한 상품 구매', color: '#63C29D' }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="bg-white rounded-lg p-4 sm:p-5 text-center hover:shadow-lg transition-all group cursor-pointer border border-gray-100 hover:scale-105">
                  <div 
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-[#333333] mb-1 sm:mb-2">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-[#666666] whitespace-pre-line leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 통계 정보 */}
      <section className="py-8 sm:py-16 bg-[#0397D6]">
        <div className="max-w-[1280px] mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">플랫폼 현황</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            {[
              { label: '누적 이용자', value: '2,847', unit: '명', icon: Users },
              { label: '학습 콘텐츠', value: '15,342', unit: '개', icon: BookOpen },
              { label: '전문 멘토', value: '128', unit: '명', icon: Award },
              { label: '만족도', value: '95.7', unit: '%', icon: BarChart3 }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-white p-2">
                  <Icon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 opacity-80" />
                  <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                    {stat.value}<span className="text-lg sm:text-xl">{stat.unit}</span>
                  </div>
                  <div className="text-white/80 text-sm sm:text-base">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-[#333333] text-white">
        <div className="max-w-[1280px] mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* 기관 정보 */}
            <div>
              <h4 className="font-bold mb-4">경산시 스마트학습 플랫폼</h4>
              <p className="text-sm text-gray-400 mb-4">
                모든 아이들이 평등하게 학습할 수 있는<br />
                디지털 교육 환경을 만들어갑니다.
              </p>
              <div className="flex space-x-3">
                <button className="w-10 h-10 bg-[#666666] rounded-full hover:bg-[#0397D6] transition flex items-center justify-center group">
                  <Facebook className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-[#666666] rounded-full hover:bg-[#0397D6] transition flex items-center justify-center group">
                  <Youtube className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-[#666666] rounded-full hover:bg-[#0397D6] transition flex items-center justify-center group">
                  <Instagram className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 bg-[#666666] rounded-full hover:bg-[#0397D6] transition flex items-center justify-center group">
                  <BookMarked className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* 이용안내 */}
            <div>
              <h4 className="font-bold mb-4">이용안내</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">이용약관</a></li>
                <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-white">이메일무단수집거부</a></li>
                <li><a href="#" className="hover:text-white">저작권정책</a></li>
                <li><a href="#" className="hover:text-white">접근성정책</a></li>
              </ul>
            </div>

            {/* 관련사이트 */}
            <div>
              <h4 className="font-bold mb-4">관련사이트</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">경산시청</a></li>
                <li><a href="#" className="hover:text-white">경산교육지원청</a></li>
                <li><a href="#" className="hover:text-white">경상북도교육청</a></li>
                <li><a href="#" className="hover:text-white">교육부</a></li>
                <li><a href="#" className="hover:text-white">K-에듀파인</a></li>
              </ul>
            </div>

            {/* 연락처 */}
            <div>
              <h4 className="font-bold mb-4">문의하기</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>053-123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>edu@gyeongsan.go.kr</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>경북 경산시 중앙로 123<br />경산시청 교육지원과</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>평일 09:00 ~ 18:00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="mt-8 pt-8 border-t border-[#666666] text-center text-sm text-gray-400">
            <p>© 2024 경산시. All Rights Reserved.</p>
            <p className="mt-2">
              본 사이트는 대한민국 정부 디자인 시스템(KRDS)을 준수하여 제작되었습니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingGov;