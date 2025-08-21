import { useAuthStore } from '../../store/authStore';
import { Bell, LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuthStore();

  const getRoleName = (role: string) => {
    const roleNames = {
      student: '학생',
      parent: '학부모',
      teacher: '교사',
      admin: '관리자'
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-20">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">경산시 스마트학습 플랫폼</h1>
          <span className="ml-4 text-sm text-gray-500">gs-smart.kr</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-gray-500">{getRoleName(user?.role || '')}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">로그아웃</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;