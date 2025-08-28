import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { UserRole } from '../types';
import { User, Lock, Users, GraduationCap, Settings, X, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const roles = [
    { value: 'student' as UserRole, label: '학생', icon: GraduationCap, color: 'bg-blue-500' },
    { value: 'parent' as UserRole, label: '학부모', icon: Users, color: 'bg-green-500' },
    { value: 'teacher' as UserRole, label: '교사', icon: User, color: 'bg-purple-500' },
    { value: 'admin' as UserRole, label: '관리자', icon: Settings, color: 'bg-red-500' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, selectedRole);
    } catch (err) {
      setError('로그인 정보가 올바르지 않습니다.');
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    const quickLogins = {
      student: 'student@test.com',
      parent: 'parent@test.com',
      teacher: 'teacher@test.com',
      admin: 'admin@test.com'
    };
    setEmail(quickLogins[role]);
    setPassword('password');
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        {/* Back/Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="이전 페이지로 돌아가기"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">경산시 스마트학습 플랫폼</h1>
          <p className="text-sm sm:text-base text-gray-600">gs-smart.kr</p>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">사용자 유형을 선택하여 빠른 로그인</p>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.value}
                  onClick={() => {
                    setSelectedRole(role.value);
                    handleQuickLogin(role.value);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    selectedRole === role.value
                      ? `border-blue-500 ${role.color} text-white`
                      : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium block">{role.label}</span>
                  <span className="text-xs opacity-75 mt-1">클릭하여 로그인</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">또는 직접 로그인</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            로그인
          </button>
        </form>

        {/* Quick test login UI - commented out as role buttons now handle quick login
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3">빠른 테스트 로그인</p>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => handleQuickLogin(role.value)}
                className="text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
              >
                {role.label} 로그인
              </button>
            ))}
          </div>
        </div>
        */}
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center space-x-1 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>홈으로 돌아가기</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;