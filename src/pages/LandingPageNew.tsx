import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Monitor, Brain, MessageCircle, Users, BookOpen, 
  Settings, ArrowRight, ChevronDown, Menu, X, Phone, Mail, MapPin,
  Clock, Calendar, Award, TrendingUp, Play, ChevronLeft, ChevronRight,
  Home, Info, BookOpenCheck, Headphones, User, LogIn
} from 'lucide-react';

const LandingPageNew = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countersVisible, setCountersVisible] = useState(false);
  const [counters, setCounters] = useState({ students: 0, contents: 0, mentors: 0, satisfaction: 0 });

  // 슬라이드 데이터
  const slides = [
    {
      title: "AI가 이끄는 맞춤형 학습",
      subtitle: "개인별 학습 패턴을 분석하여 최적의 학습 경로를 제시합니다",
      image: "bg-gradient-to-br from-blue-600 to-purple-700",
      cta: "AI 진단 시작하기"
    },
    {
      title: "1:1 실시간 멘토링",
      subtitle: "전문 선생님과 함께하는 따뜻한 학습 지도",
      image: "bg-gradient-to-br from-purple-600 to-pink-700",
      cta: "멘토링 신청하기"
    },
    {
      title: "언제 어디서나 학습",
      subtitle: "시간과 장소의 제약 없이 자유로운 학습 환경",
      image: "bg-gradient-to-br from-green-600 to-teal-700",
      cta: "무료 체험하기"
    }
  ];

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // 카운터 섹션 가시성 체크
      const counterSection = document.getElementById('stats-section');
      if (counterSection) {
        const rect = counterSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !countersVisible) {
          setCountersVisible(true);
          startCounters();
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [countersVisible]);

  // 슬라이드 자동 전환
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 카운터 애니메이션
  const startCounters = () => {
    const duration = 2000;
    const steps = 50;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCounters({
        students: Math.floor((2500 * currentStep) / steps),
        contents: Math.floor((15000 * currentStep) / steps),
        mentors: Math.floor((120 * currentStep) / steps),
        satisfaction: Math.floor((95 * currentStep) / steps)
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);
  };

  const handleLogin = () => navigate('/login');

  return (
    <div className="min-h-screen bg-white">
      {/* Top Utility Bar */}
      <div className="bg-gray-900 text-white py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">경산시 스마트학습 플랫폼에 오신 것을 환영합니다</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hover:text-blue-400 transition">사이트맵</button>
            <span className="text-gray-500">|</span>
            <button onClick={handleLogin} className="hover:text-blue-400 transition">로그인</button>
            <span className="text-gray-500">|</span>
            <button className="hover:text-blue-400 transition">회원가입</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900">경산시 스마트학습</div>
                <div className="text-xs text-gray-600">Gyeongsan Smart Learning Platform</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center space-x-1">
                <Info className="w-4 h-4" />
                <span>플랫폼 소개</span>
              </button>
              <button className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center space-x-1">
                <Monitor className="w-4 h-4" />
                <span>학습 서비스</span>
              </button>
              <button className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>멘토링</span>
              </button>
              <button className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center space-x-1">
                <BookOpenCheck className="w-4 h-4" />
                <span>학습자료실</span>
              </button>
              <button className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center space-x-1">
                <Headphones className="w-4 h-4" />
                <span>고객지원</span>
              </button>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button 
                onClick={handleLogin}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:shadow-lg transition-all transform hover:scale-105"
              >
                학습 시작하기
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-3">
              <button className="w-full text-left py-2 text-gray-700 hover:text-blue-600">플랫폼 소개</button>
              <button className="w-full text-left py-2 text-gray-700 hover:text-blue-600">학습 서비스</button>
              <button className="w-full text-left py-2 text-gray-700 hover:text-blue-600">멘토링</button>
              <button className="w-full text-left py-2 text-gray-700 hover:text-blue-600">학습자료실</button>
              <button className="w-full text-left py-2 text-gray-700 hover:text-blue-600">고객지원</button>
              <button 
                onClick={handleLogin}
                className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg font-medium"
              >
                학습 시작하기
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Slider */}
      <section className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 ${slide.image}`}>
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <div className="max-w-4xl">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in-up animation-delay-200">
                  {slide.subtitle}
                </p>
                <button 
                  onClick={handleLogin}
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all animate-fade-in-up animation-delay-400"
                >
                  {slide.cta}
                  <ArrowRight className="inline-block w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Slide Navigation */}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </section>

      {/* Quick Menu Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Monitor, title: '온라인 학습', desc: '24시간 학습 가능', color: 'blue' },
              { icon: Brain, title: 'AI 진단', desc: '맞춤형 분석', color: 'purple' },
              { icon: Users, title: '1:1 멘토링', desc: '전문가 상담', color: 'green' },
              { icon: BookOpen, title: '학습자료', desc: '풍부한 콘텐츠', color: 'orange' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={handleLogin}
                  className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 bg-${item.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 text-${item.color}-600`} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              우리가 제공하는 핵심 서비스
            </h2>
            <p className="text-xl text-gray-600">
              최첨단 기술과 교육 전문성이 만나 최고의 학습 경험을 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service Cards */}
            {[
              {
                icon: Monitor,
                title: '온라인 학습 시스템',
                desc: '시간과 장소에 구애받지 않는 자유로운 학습 환경을 제공합니다.',
                features: ['실시간 화상 수업', '녹화 강의 제공', '학습 진도 관리'],
                color: 'blue'
              },
              {
                icon: Brain,
                title: 'AI 학습 진단',
                desc: '인공지능이 학습 패턴을 분석하여 개인별 맞춤 솔루션을 제공합니다.',
                features: ['학습 스타일 분석', '취약점 진단', '맞춤형 커리큘럼'],
                color: 'purple'
              },
              {
                icon: MessageCircle,
                title: '실시간 질문방',
                desc: '궁금한 점을 바로 해결할 수 있는 1:1 화상 질의응답 시스템',
                features: ['즉시 답변', '화면 공유', '자료 첨부'],
                color: 'green'
              },
              {
                icon: Users,
                title: '전문 멘토링',
                desc: '검증된 전문 멘토와 함께하는 체계적인 학습 관리',
                features: ['주간 상담', '학습 계획 수립', '동기부여 코칭'],
                color: 'orange'
              },
              {
                icon: BookOpen,
                title: '디지털 도서관',
                desc: '다양한 전자책과 학습 자료를 언제든지 이용 가능',
                features: ['전자책 열람', '오디오북', '학습 자료 다운로드'],
                color: 'red'
              },
              {
                icon: Settings,
                title: '통합 관리 시스템',
                desc: '학생, 학부모, 교사가 함께하는 통합 학습 관리 플랫폼',
                features: ['실시간 모니터링', '성과 리포트', '학습 일정 관리'],
                color: 'indigo'
              }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all group">
                  <div className={`w-14 h-14 bg-${service.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 text-${service.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start text-sm text-gray-600">
                        <span className="text-blue-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats-section" className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              경산시 스마트학습 플랫폼의 성과
            </h2>
            <p className="text-xl text-blue-100">
              숫자로 보는 우리의 교육 혁신
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">
                {counters.students.toLocaleString()}+
              </div>
              <p className="text-blue-100">누적 학습자</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">
                {counters.contents.toLocaleString()}+
              </div>
              <p className="text-blue-100">학습 콘텐츠</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">
                {counters.mentors}+
              </div>
              <p className="text-blue-100">전문 멘토</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">
                {counters.satisfaction}%
              </div>
              <p className="text-blue-100">만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* News & Notice Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Notice */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">공지사항</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  더보기 <ArrowRight className="inline w-4 h-4" />
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {[
                  { tag: '중요', title: '2024년 신학기 플랫폼 업데이트 안내', date: '2024.01.25' },
                  { tag: '공지', title: 'AI 학습 진단 서비스 정식 오픈', date: '2024.01.20' },
                  { tag: '이벤트', title: '겨울방학 특별 프로그램 참가자 모집', date: '2024.01.15' },
                  { tag: '안내', title: '시스템 정기 점검 일정 안내', date: '2024.01.10' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 transition border-b last:border-0">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        item.tag === '중요' ? 'bg-red-100 text-red-600' :
                        item.tag === '이벤트' ? 'bg-green-100 text-green-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {item.tag}
                      </span>
                      <span className="text-gray-900 hover:text-blue-600 cursor-pointer">{item.title}</span>
                    </div>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* News */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">교육 뉴스</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  더보기 <ArrowRight className="inline w-4 h-4" />
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {[
                  { title: 'AI 교육 혁신 사례로 선정된 경산시', date: '2024.01.24' },
                  { title: '디지털 교육 격차 해소 우수 지자체 표창', date: '2024.01.22' },
                  { title: '학부모 만족도 조사 결과 95% 달성', date: '2024.01.18' },
                  { title: '전국 최초 AI 멘토링 시스템 도입', date: '2024.01.12' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 transition border-b last:border-0">
                    <span className="text-gray-900 hover:text-blue-600 cursor-pointer">{item.title}</span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-6 md:mb-0">
              <h3 className="text-3xl font-bold mb-2">지금 바로 시작하세요!</h3>
              <p className="text-purple-100">무료 체험으로 스마트학습의 혁신을 경험해보세요</p>
            </div>
            <button 
              onClick={handleLogin}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:shadow-xl transform hover:scale-105 transition-all"
            >
              무료 체험 신청하기
              <ArrowRight className="inline-block w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo & Info */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">경산시 스마트학습</span>
              </div>
              <p className="text-sm mb-4">
                AI 기술과 인간적 교감이 만나<br />
                최고의 교육 경험을 제공합니다
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">ⓨ</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <span className="text-xs">ⓑ</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">바로가기</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">플랫폼 소개</a></li>
                <li><a href="#" className="hover:text-white transition">이용 가이드</a></li>
                <li><a href="#" className="hover:text-white transition">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-white transition">1:1 문의</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-4">서비스</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">온라인 학습</a></li>
                <li><a href="#" className="hover:text-white transition">AI 진단</a></li>
                <li><a href="#" className="hover:text-white transition">멘토링</a></li>
                <li><a href="#" className="hover:text-white transition">학습자료실</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">문의하기</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>053-123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>help@gs-smart.kr</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>경북 경산시 중앙로 123</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>평일 09:00 - 18:00</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2024 경산시 스마트학습 플랫폼. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="hover:text-white transition">개인정보처리방침</a>
                <a href="#" className="hover:text-white transition">이용약관</a>
                <a href="#" className="hover:text-white transition">이메일무단수집거부</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default LandingPageNew;