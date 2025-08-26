import Layout from '../../components/common/Layout';
import { Users, UserPlus, Search, Filter, Edit, Trash2, Shield, Mail, Phone, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const users = [
    { id: 1, name: '김민준', email: 'minjun@example.com', role: 'student', status: 'active', grade: '5학년', registeredDate: '2023-09-01' },
    { id: 2, name: '이서연', email: 'seoyeon@example.com', role: 'student', status: 'active', grade: '5학년', registeredDate: '2023-09-01' },
    { id: 3, name: '박지호 (부)', email: 'jiho_parent@example.com', role: 'parent', status: 'active', child: '박지호', registeredDate: '2023-09-05' },
    { id: 4, name: '김수학', email: 'math@teacher.com', role: 'teacher', status: 'active', subject: '수학', registeredDate: '2023-08-20' },
    { id: 5, name: '관리자', email: 'admin@gyeongsan.kr', role: 'admin', status: 'active', department: '교육청', registeredDate: '2023-08-01' },
    { id: 6, name: '정현우', email: 'hyunwoo@example.com', role: 'student', status: 'inactive', grade: '5학년', registeredDate: '2023-10-15' },
    { id: 7, name: 'James', email: 'james@teacher.com', role: 'teacher', status: 'active', subject: '영어', registeredDate: '2023-08-25' },
    { id: 8, name: '최유나 (모)', email: 'yuna_parent@example.com', role: 'parent', status: 'active', child: '최유나', registeredDate: '2023-09-10' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    const colors = {
      student: 'bg-blue-100 text-blue-700',
      parent: 'bg-green-100 text-green-700',
      teacher: 'bg-purple-100 text-purple-700',
      admin: 'bg-red-100 text-red-700'
    };
    const labels = {
      student: '학생',
      parent: '학부모',
      teacher: '교사',
      admin: '관리자'
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[role as keyof typeof colors]}`}>
        {labels[role as keyof typeof labels]}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
      }`}>
        {status === 'active' ? '활성' : '비활성'}
      </span>
    );
  };

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">사용자 관리</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">전체 사용자 {users.length}명</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base"
          >
            <UserPlus className="w-4 h-4" />
            <span>사용자 추가</span>
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <Users className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600">학생</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {users.filter(u => u.role === 'student').length}명
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <Users className="w-6 sm:w-8 h-6 sm:h-8 text-green-500" />
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600">학부모</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {users.filter(u => u.role === 'parent').length}명
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <Users className="w-6 sm:w-8 h-6 sm:h-8 text-purple-500" />
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600">교사</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {users.filter(u => u.role === 'teacher').length}명
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <Shield className="w-6 sm:w-8 h-6 sm:h-8 text-red-500" />
            </div>
            <h3 className="text-xs sm:text-sm text-gray-600">관리자</h3>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              {users.filter(u => u.role === 'admin').length}명
            </p>
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
                <input
                  type="text"
                  placeholder="이름 또는 이메일 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="all">전체 역할</option>
                <option value="student">학생</option>
                <option value="parent">학부모</option>
                <option value="teacher">교사</option>
                <option value="admin">관리자</option>
              </select>
              <button className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span className="text-sm sm:text-base hidden sm:inline">상세 필터</span>
                <span className="text-sm sm:hidden">필터</span>
              </button>
            </div>
          </div>
        </div>

        {/* 사용자 목록 - 모바일 카드 뷰 */}
        <div className="block sm:hidden space-y-3">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="flex gap-2">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.status)}
                </div>
              </div>
              <div className="text-xs text-gray-600 mb-2">
                {user.role === 'student' && `${user.grade}`}
                {user.role === 'parent' && `자녀: ${user.child}`}
                {user.role === 'teacher' && `담당: ${user.subject}`}
                {user.role === 'admin' && `${user.department}`}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{user.registeredDate}</span>
                <div className="flex gap-2">
                  <button className="text-gray-600 hover:text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 사용자 목록 - 데스크톱 테이블 뷰 */}
        <div className="hidden sm:block bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700">사용자</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700">역할</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700">상태</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 hidden md:table-cell">추가 정보</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700 hidden lg:table-cell">등록일</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-700">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-600 hidden md:table-cell">
                      {user.role === 'student' && `${user.grade}`}
                      {user.role === 'parent' && `자녀: ${user.child}`}
                      {user.role === 'teacher' && `담당: ${user.subject}`}
                      {user.role === 'admin' && `${user.department}`}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 hidden lg:table-cell">
                      {user.registeredDate}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4">
                      <div className="flex gap-1 sm:gap-2">
                        <button className="text-gray-600 hover:text-blue-600">
                          <Edit className="w-3 sm:w-4 h-3 sm:h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-red-600">
                          <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="w-3 sm:w-4 h-3 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 사용자 추가 모달 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">새 사용자 추가</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
              <form className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">이름</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">이메일</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">역할</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                    <option value="student">학생</option>
                    <option value="parent">학부모</option>
                    <option value="teacher">교사</option>
                    <option value="admin">관리자</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base"
                  >
                    추가
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserManagement;