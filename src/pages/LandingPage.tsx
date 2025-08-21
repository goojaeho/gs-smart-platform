import { useNavigate } from 'react-router-dom';
import { GraduationCap, Monitor, Brain, MessageCircle, Users, BookOpen, Settings, ArrowRight, ChevronDown, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [counters, setCounters] = useState({ students: 0, contents: 0, mentors: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Counter animation
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCounters(prev => ({
          students: prev.students < 170 ? prev.students + 5 : 170,
          contents: prev.contents < 10000 ? prev.contents + 250 : 10000,
          mentors: prev.mentors < 50 ? prev.mentors + 2 : 50
        }));
      }, 50);
      
      setTimeout(() => clearInterval(interval), 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleStart = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white/90'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">경산시 스마트학습 플랫폼</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#intro" className="text-gray-700 hover:text-blue-600 font-medium transition">플랫폼 소개</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition">핵심 서비스</a>
              <a href="#notice" className="text-gray-700 hover:text-blue-600 font-medium transition">공지사항</a>
              <button 
                onClick={handleLogin}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
              >
                로그인
              </button>
            </nav>
            
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
            AI 기술과 인간적 교감이 결합된<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              초개인화 학습 생태계
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10">
            경산시 아이들의 무한한 가능성을 펼칩니다
          </p>
          <button 
            onClick={handleStart}
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transform transition hover:scale-105"
          >
            학습 시작하기
            <ArrowRight className="inline-block w-5 h-5 ml-2" />
          </button>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white opacity-70 animate-bounce">
            <ChevronDown className="w-8 h-8" />
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section id="services" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              우리가 만들어가는 특별한 학습 경험
            </h2>
            <p className="text-xl text-gray-600">
              최첨단 AI 기술과 따뜻한 교육이 만나는 곳
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Monitor, title: '온라인 학습', desc: '언제 어디서나 접속 가능한 맞춤형 학습 콘텐츠', color: 'blue' },
              { icon: Brain, title: 'AI 학습 진단', desc: '인공지능이 분석하는 개인별 맞춤 학습 전략', color: 'purple' },
              { icon: MessageCircle, title: '1:1 학습 질문방', desc: '실시간 전문 선생님과 화상 질의응답', color: 'green' },
              { icon: Users, title: '멘토링', desc: '경험 많은 멘토의 따뜻한 지도와 상담', color: 'yellow' },
              { icon: BookOpen, title: '온라인 독서', desc: '다양한 전자책으로 독서 습관 형성', color: 'red' },
              { icon: Settings, title: '통합운영관리', desc: '학생, 학부모, 교사가 하나로 연결', color: 'indigo' },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform transition hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-${service.color}-100 rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 text-${service.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              경산시 스마트학습 플랫폼이 만들어가는 변화
            </h2>
            <p className="text-xl text-blue-100">
              우리 아이들의 미래를 위한 투자, 그 성과를 확인하세요
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-white mb-4">
                {counters.students}명
              </div>
              <p className="text-xl text-blue-100">총 참여 학생 수</p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-white mb-4">
                {counters.contents.toLocaleString()}+
              </div>
              <p className="text-xl text-blue-100">총 학습 콘텐츠</p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl md:text-7xl font-bold text-white mb-4">
                {counters.mentors}명+
              </div>
              <p className="text-xl text-blue-100">전문 멘토 선생님</p>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section id="notice" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">새로운 소식</h2>
            <p className="text-xl text-gray-600">경산시 스마트학습 플랫폼의 최신 소식을 확인하세요</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {[
                { type: '중요', color: 'red', title: '2024년 신학기 스마트학습 플랫폼 이용 안내', desc: '새 학기를 맞아 업데이트된 플랫폼 기능과 이용 방법을 안내드립니다.', date: '2024.01.25' },
                { type: '공지', color: 'blue', title: 'AI 학습 진단 서비스 정식 오픈', desc: '개인별 맞춤 학습을 위한 AI 진단 서비스가 정식으로 시작됩니다.', date: '2024.01.20' },
                { type: '이벤트', color: 'green', title: '겨울방학 특별 프로그램 참가자 모집', desc: '코딩, AI, 창의력 향상 프로그램에 참여할 학생을 모집합니다.', date: '2024.01.15' },
                { type: '업데이트', color: 'purple', title: '모바일 앱 v2.0 출시', desc: '더욱 편리해진 모바일 학습 환경을 경험해보세요.', date: '2024.01.10' },
              ].map((notice, idx) => (
                <a key={idx} href="#" className="block px-8 py-6 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className={`inline-block px-3 py-1 bg-${notice.color}-100 text-${notice.color}-600 text-sm rounded-full font-medium mb-2`}>
                        {notice.type}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{notice.title}</h3>
                      <p className="text-gray-600">{notice.desc}</p>
                    </div>
                    <span className="text-sm text-gray-500 ml-4">{notice.date}</span>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="px-8 py-4 bg-gray-50 text-center">
              <button className="text-blue-600 font-medium hover:text-blue-700 transition">
                더보기
                <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">경산시 스마트학습 플랫폼</span>
              </div>
              <p className="text-sm leading-relaxed">
                AI 기술과 인간적 교감이 결합된 초개인화 학습 생태계로<br />
                경산시 아이들의 무한한 가능성을 펼칩니다.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">바로가기</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">플랫폼 소개</a></li>
                <li><a href="#" className="hover:text-white transition">이용 가이드</a></li>
                <li><a href="#" className="hover:text-white transition">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-white transition">고객지원</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">관련 기관</h4>
              <ul className="space-y-2">
                <li><a href="https://www.gbgs.go.kr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">경산시청</a></li>
                <li><a href="http://www.gbe.kr/gs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">경산교육지원청</a></li>
                <li><a href="#" className="hover:text-white transition">경북교육청</a></li>
                <li><a href="#" className="hover:text-white transition">교육부</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm">
                © 2024 경산시 스마트학습 플랫폼. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm hover:text-white transition">개인정보처리방침</a>
                <a href="#" className="text-sm hover:text-white transition">이용약관</a>
                <a href="#" className="text-sm hover:text-white transition">접근성 정책</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;