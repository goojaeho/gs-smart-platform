import { useAuthStore } from '../../store/authStore';
import { 
  Home, BookOpen, Users, MessageSquare, Award, 
  BarChart3, Settings, FileText, Video, HelpCircle,
  Calendar, Library, Monitor, Brain, Heart
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuthStore();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { icon: Home, label: '대시보드', path: '/student' },
          { icon: BookOpen, label: '오늘의 학습', path: '/student/today' },
          { icon: Library, label: '온라인 도서관', path: '/student/library' },
          { icon: MessageSquare, label: '질문방', path: '/student/questions' },
          { icon: Heart, label: '멘토링', path: '/student/mentoring' },
          { icon: FileText, label: '나의 학습노트', path: '/student/notes' },
          { icon: Award, label: '포인트샵', path: '/student/points' },
        ];
      case 'parent':
        return [
          { icon: Home, label: '대시보드', path: '/parent' },
          { icon: BarChart3, label: '학습 현황', path: '/parent/progress' },
          { icon: FileText, label: '월간 리포트', path: '/parent/reports' },
          { icon: Heart, label: '멘토링 일지', path: '/parent/mentoring' },
          { icon: Calendar, label: '학습 일정', path: '/parent/schedule' },
          { icon: MessageSquare, label: '상담 신청', path: '/parent/consultation' },
        ];
      case 'teacher':
        return [
          { icon: Home, label: '대시보드', path: '/teacher' },
          { icon: Users, label: '학생 관리', path: '/teacher/students' },
          { icon: BarChart3, label: '학습 리포트', path: '/teacher/reports' },
          { icon: Heart, label: '멘토링 관리', path: '/teacher/mentoring' },
          { icon: Calendar, label: '수업 일정', path: '/teacher/schedule' },
          { icon: FileText, label: '공지사항', path: '/teacher/notices' },
        ];
      case 'admin':
        return [
          { icon: Home, label: '통합 대시보드', path: '/admin' },
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
    <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 pt-20 z-10">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <a
                  href={item.path}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <button className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 w-full rounded-lg hover:bg-gray-50 transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">도움말</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;