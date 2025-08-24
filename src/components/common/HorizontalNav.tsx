import { useAuthStore } from '../../store/authStore';
import { 
  Home, BookOpen, Users, MessageSquare, Award, 
  BarChart3, Settings, FileText, Video, HelpCircle,
  Calendar, Library, Monitor, Brain, Heart, ClipboardList,
  Target, Bell, ShoppingCart
} from 'lucide-react';

const HorizontalNav = () => {
  const { user } = useAuthStore();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { icon: Heart, label: '러닝메이트', path: '/student', isMain: true },
          { icon: BookOpen, label: '오늘의 학습', path: '/student/today' },
          { icon: Target, label: '문제풀이', path: '/student/problems' },
          { icon: Library, label: '온라인 도서관', path: '/student/library' },
          { icon: MessageSquare, label: '질문방', path: '/student/questions' },
          { icon: Video, label: '멘토링', path: '/student/mentoring' },
          { icon: Bell, label: '알림장', path: '/student/notices' },
          { icon: ShoppingCart, label: '포인트샵', path: '/student/points' },
        ];
      case 'parent':
        return [
          { icon: Home, label: '대시보드', path: '/parent', isMain: true },
          { icon: BarChart3, label: '학습 현황', path: '/parent/progress' },
          { icon: FileText, label: '월간 리포트', path: '/parent/reports' },
          { icon: Heart, label: '멘토링 일지', path: '/parent/mentoring' },
          { icon: Calendar, label: '학습 일정', path: '/parent/schedule' },
          { icon: MessageSquare, label: '상담 신청', path: '/parent/consultation' },
        ];
      case 'teacher':
        return [
          { icon: Home, label: '대시보드', path: '/teacher', isMain: true },
          { icon: Users, label: '학생 관리', path: '/teacher/students' },
          { icon: BarChart3, label: '학습 리포트', path: '/teacher/reports' },
          { icon: Heart, label: '멘토링 관리', path: '/teacher/mentoring' },
          { icon: Calendar, label: '수업 일정', path: '/teacher/schedule' },
          { icon: FileText, label: '공지사항', path: '/teacher/notices' },
          { icon: Brain, label: 'AI 학습진단', path: '/teacher/ai-diagnosis' },
        ];
      case 'admin':
        return [
          { icon: Home, label: '통합 대시보드', path: '/admin', isMain: true },
          { icon: Monitor, label: '센터별 현황', path: '/admin/centers' },
          { icon: Users, label: '사용자 관리', path: '/admin/users' },
          { icon: BarChart3, label: '통계 분석', path: '/admin/analytics' },
          { icon: Brain, label: 'AI 진단 관리', path: '/admin/ai' },
          { icon: Settings, label: '시스템 설정', path: '/admin/settings' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav className="fixed top-[120px] left-0 right-0 bg-white shadow-md border-b border-gray-200 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center space-x-1 py-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = window.location.pathname === item.path;
            
            return (
              <a
                key={index}
                href={item.path}
                className={`flex items-center flex-col space-y-1 px-4 py-3 rounded-lg transition-all duration-200 min-w-[100px] ${
                  isActive
                    ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                } ${item.isMain ? '' : ''}`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'text-white' : ''}`} />
                <span className={`text-sm font-medium text-center ${isActive ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>
      
      {/* Help button - positioned separately */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <button className="flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-medium hidden md:block">도움말</span>
        </button>
      </div>
    </nav>
  );
};

export default HorizontalNav;