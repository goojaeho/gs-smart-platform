import Layout from '../../components/common/Layout';
import { FileText, Plus, Pin, Calendar, User, Eye, Edit, Trash2, Search, Filter } from 'lucide-react';
import { useState } from 'react';

const Notices = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const notices = [
    {
      id: 1,
      title: '2024년 1월 수학 학습 계획 안내',
      category: '학습',
      content: '이번 달은 도형의 넓이와 통계 단원을 집중적으로 학습합니다.',
      author: '김수학',
      date: '2024-01-20',
      views: 234,
      isPinned: true,
      attachments: 2
    },
    {
      id: 2,
      title: '수학 경시대회 참가 안내',
      category: '이벤트',
      content: '2월 15일 경산시 수학 경시대회가 개최됩니다. 참가 희망 학생은 신청해주세요.',
      author: '김수학',
      date: '2024-01-18',
      views: 156,
      isPinned: true,
      attachments: 1
    },
    {
      id: 3,
      title: '온라인 학습실 이용 수칙',
      category: '공지',
      content: '온라인 학습실 이용 시 카메라와 마이크를 켜고 참여해주세요.',
      author: '관리자',
      date: '2024-01-15',
      views: 412,
      isPinned: false,
      attachments: 0
    },
    {
      id: 4,
      title: '1월 멘토링 일정 변경 안내',
      category: '일정',
      content: '설 연휴로 인해 멘토링 일정이 조정되었습니다.',
      author: '김수학',
      date: '2024-01-12',
      views: 89,
      isPinned: false,
      attachments: 1
    },
    {
      id: 5,
      title: '학부모 상담 주간 안내',
      category: '상담',
      content: '1월 마지막 주에 학부모 상담 주간을 운영합니다.',
      author: '김수학',
      date: '2024-01-10',
      views: 145,
      isPinned: false,
      attachments: 0
    }
  ];

  const categories = [
    { value: 'all', label: '전체' },
    { value: '학습', label: '학습' },
    { value: '공지', label: '공지' },
    { value: '이벤트', label: '이벤트' },
    { value: '일정', label: '일정' },
    { value: '상담', label: '상담' }
  ];

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch(category) {
      case '학습': return 'bg-blue-100 text-blue-700';
      case '공지': return 'bg-red-100 text-red-700';
      case '이벤트': return 'bg-green-100 text-green-700';
      case '일정': return 'bg-purple-100 text-purple-700';
      case '상담': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">공지사항</h2>
            <p className="text-gray-600 mt-1">학생 및 학부모 공지사항 관리</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            <span>공지 작성</span>
          </button>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="공지사항 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 공지사항 목록 */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">제목</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">카테고리</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">작성자</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">작성일</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">조회수</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredNotices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {notice.isPinned && (
                          <Pin className="w-4 h-4 text-red-500" />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{notice.title}</p>
                          <p className="text-sm text-gray-500 truncate max-w-md">{notice.content}</p>
                        </div>
                        {notice.attachments > 0 && (
                          <span className="text-xs text-gray-500">
                            📎 {notice.attachments}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(notice.category)}`}>
                        {notice.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{notice.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{notice.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span>{notice.views}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-gray-600 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 공지 작성 모달 */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">새 공지사항 작성</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제목
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="공지사항 제목을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>카테고리 선택</option>
                    {categories.slice(1).map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    내용
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="공지사항 내용을 입력하세요"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-500" />
                    <span className="text-sm text-gray-700">상단 고정</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded text-blue-500" />
                    <span className="text-sm text-gray-700">학부모 공유</span>
                  </label>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    작성 완료
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

export default Notices;