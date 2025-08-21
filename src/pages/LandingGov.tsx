import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Monitor, Brain, MessageCircle, Users, BookOpen, 
  Settings, ArrowRight, ChevronDown, Menu, X, Phone, Mail, MapPin,
  Clock, Award, TrendingUp, ChevronLeft, ChevronRight,
  Home, Search, User as UserIcon, Globe, CheckCircle, AlertCircle,
  FileText, Calendar, BarChart3, Headphones
} from 'lucide-react';

// 정부 표준 색상
const govColors = {
  primary: '#1e4788',
  secondary: '#2e5ba6',
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fontSize, setFontSize] = useState('medium');

  // 메인 비주얼 슬라이드
  const slides = [
    {
      title: "모든 아이에게 평등한 교육 기회를",
      subtitle: "경산시 스마트학습 플랫폼이 교육 격차를 해소합니다",
      image: "bg-gradient-to-br from-[#1e4788] to-[#2e5ba6]"
    },
    {
      title: "AI 기반 맞춤형 학습 지원",
      subtitle: "개인별 학습 수준에 최적화된 교육 콘텐츠 제공",
      image: "bg-gradient-to-br from-[#2e5ba6] to-[#4a90e2]"
    },
    {
      title: "전문 교사와 함께하는 온라인 멘토링",
      subtitle: "실시간 화상 수업으로 언제 어디서나 학습 가능",
      image: "bg-gradient-to-br from-[#1e4788] to-[#4a90e2]"
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
          <div className="flex justify-between items-center h-10">
            {/* 좌측: 관련 사이트 */}
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-[#666666] hover:text-[#1e4788] transition">경산시청</a>
              <span className="text-[#cccccc]">|</span>
              <a href="#" className="text-[#666666] hover:text-[#1e4788] transition">경산교육지원청</a>
            </div>
            
            {/* 우측: 글자 크기, 언어, 로그인 */}
            <div className="flex items-center space-x-4 text-sm">
              {/* 글자 크기 조절 */}
              <div className="flex items-center space-x-1">
                <span className="text-[#666666] mr-2">글자크기</span>
                <button 
                  onClick={() => adjustFontSize('small')}
                  className={`px-2 py-1 border ${fontSize === 'small' ? 'bg-[#1e4788] text-white' : 'bg-white text-[#666666]'}`}
                  aria-label="글자 작게"
                >
                  가-
                </button>
                <button 
                  onClick={() => adjustFontSize('medium')}
                  className={`px-2 py-1 border ${fontSize === 'medium' ? 'bg-[#1e4788] text-white' : 'bg-white text-[#666666]'}`}
                  aria-label="글자 보통"
                >
                  가
                </button>
                <button 
                  onClick={() => adjustFontSize('large')}
                  className={`px-2 py-1 border ${fontSize === 'large' ? 'bg-[#1e4788] text-white' : 'bg-white text-[#666666]'}`}
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
              
              {/* 로그인 */}
              <button onClick={handleLogin} className="text-[#1e4788] hover:underline font-medium">
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
            <div className="flex items-center justify-between h-20">
              {/* 로고 */}
              <div className="flex items-center space-x-4">
                <a href="/" className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#1e4788] rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#333333]">경산시 스마트학습 플랫폼</div>
                    <div className="text-xs text-[#666666]">Gyeongsan Smart Learning Platform</div>
                  </div>
                </a>
              </div>

              {/* 검색바 */}
              <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="무엇을 도와드릴까요?"
                    className="w-full px-4 py-2 pr-10 border border-[#cccccc] rounded-lg focus:outline-none focus:border-[#1e4788]"
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
          <nav className="hidden lg:block bg-[#1e4788]">
            <div className="max-w-[1280px] mx-auto px-4">
              <ul className="flex">
                {[
                  { icon: Home, label: '홈', active: true },
                  { icon: Monitor, label: '온라인 학습' },
                  { icon: Brain, label: 'AI 학습진단' },
                  { icon: Users, label: '멘토링' },
                  { icon: BookOpen, label: '학습자료실' },
                  { icon: FileText, label: '공지사항' },
                  { icon: Headphones, label: '고객지원' }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <li key={idx}>
                      <button className={`flex items-center space-x-2 px-6 py-4 text-white hover:bg-[#2e5ba6] transition ${item.active ? 'bg-[#2e5ba6]' : ''}`}>
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
                <button key={idx} className="w-full text-left py-3 px-4 text-[#333333] hover:bg-[#f5f5f5] rounded">
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* 메인 비주얼 */}
      <section id="main-content" className="relative h-[330px] overflow-hidden">
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
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-white/90 mb-8">
                    {slide.subtitle}
                  </p>
                  <button 
                    onClick={handleLogin}
                    className="px-8 py-3 bg-white text-[#1e4788] rounded-lg font-medium hover:bg-[#f5f5f5] transition"
                  >
                    학습 시작하기
                    <ArrowRight className="inline-block w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 슬라이드 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>

        {/* 슬라이드 컨트롤 */}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          aria-label="이전 슬라이드"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition"
          aria-label="다음 슬라이드"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </section>

      {/* 빠른 링크 - 히어로 섹션 바로 아래로 이동 */}
      <section className="py-8 bg-[#f8f9fa]">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { icon: '📚', label: '학습가이드' },
              { icon: '📝', label: '과제제출' },
              { icon: '📊', label: '성적확인' },
              { icon: '👨‍🏫', label: '멘토찾기' },
              { icon: '📅', label: '학습일정' },
              { icon: '💬', label: '질문하기' },
              { icon: '🎓', label: '수료증' },
              { icon: '📞', label: '상담예약' }
            ].map((link, idx) => (
              <button key={idx} className="bg-white rounded-lg p-4 hover:shadow-md transition text-center group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{link.icon}</div>
                <div className="text-sm text-[#666666]">{link.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 공지사항 & 자료실 */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 공지사항 */}
            <div className="bg-white rounded-lg border border-[#dee2e6] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#333333] flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-[#d9534f]" />
                  공지사항
                </h3>
                <button className="text-sm text-[#1e4788] hover:underline">
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
                  <li key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center space-x-2">
                      {item.isImportant && (
                        <span className="px-2 py-1 bg-[#d9534f] text-white text-xs rounded">중요</span>
                      )}
                      {item.isNew && (
                        <span className="px-2 py-1 bg-[#f0ad4e] text-white text-xs rounded">NEW</span>
                      )}
                      <a href="#" className="text-[#333333] hover:text-[#1e4788] hover:underline">
                        {item.title}
                      </a>
                    </div>
                    <span className="text-sm text-[#999999]">{item.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 학습자료실 */}
            <div className="bg-white rounded-lg border border-[#dee2e6] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#333333] flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-[#1e4788]" />
                  학습자료실
                </h3>
                <button className="text-sm text-[#1e4788] hover:underline">
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
                  <li key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-[#f5f5f5] text-[#666666] text-xs rounded">
                        {item.category}
                      </span>
                      <a href="#" className="text-[#333333] hover:text-[#1e4788] hover:underline">
                        {item.title}
                      </a>
                    </div>
                    <span className="text-sm text-[#999999]">↓ {item.downloads}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 서비스 */}
      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#333333] text-center mb-10">주요 서비스</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Monitor, title: '온라인 학습', desc: '24시간 이용 가능한\n온라인 학습 시스템', color: '#1e4788' },
              { icon: Brain, title: 'AI 학습진단', desc: '인공지능 기반\n맞춤형 학습 분석', color: '#2e5ba6' },
              { icon: Users, title: '1:1 멘토링', desc: '전문 교사와 함께하는\n개인 맞춤 지도', color: '#4a90e2' },
              { icon: BookOpen, title: '학습자료실', desc: '다양한 학습 자료와\n전자책 제공', color: '#5cb85c' }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="bg-white rounded-lg p-5 text-center hover:shadow-lg transition group cursor-pointer">
                  <div 
                    className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: service.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-[#333333] mb-2">{service.title}</h3>
                  <p className="text-sm text-[#666666] whitespace-pre-line">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 통계 정보 */}
      <section className="py-16 bg-[#1e4788]">
        <div className="max-w-[1280px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">플랫폼 현황</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: '누적 이용자', value: '2,847', unit: '명', icon: Users },
              { label: '학습 콘텐츠', value: '15,342', unit: '개', icon: BookOpen },
              { label: '전문 멘토', value: '128', unit: '명', icon: Award },
              { label: '만족도', value: '95.7', unit: '%', icon: BarChart3 }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="text-white">
                  <Icon className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <div className="text-3xl font-bold mb-2">
                    {stat.value}<span className="text-xl">{stat.unit}</span>
                  </div>
                  <div className="text-white/80">{stat.label}</div>
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
              <div className="flex space-x-2">
                {['페이스북', '유튜브', '인스타그램', '블로그'].map((sns, idx) => (
                  <button key={idx} className="w-8 h-8 bg-[#666666] rounded hover:bg-[#999999] transition text-xs">
                    {sns[0]}
                  </button>
                ))}
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