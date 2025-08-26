import Layout from '../../components/common/Layout';
import { useState } from 'react';
import { 
  Bell, Search, Filter, Eye, MessageCircle, Paperclip, 
  Image as ImageIcon, Link, Calendar, User, ChevronDown,
  CheckCircle, Star, AlertCircle
} from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  author: {
    name: string;
    profileImage?: string;
  };
  date: string;
  target: 'all' | 'class' | 'individual';
  targetLabel: string;
  contentPreview: string;
  fullContent: string;
  hasAttachment: boolean;
  hasImage: boolean;
  hasLink: boolean;
  views: number;
  comments: number;
  isNew: boolean;
  isRead: boolean;
  isPinned: boolean;
  isImportant: boolean;
  attachments?: Array<{
    name: string;
    type: string;
    url: string;
  }>;
}

const NoticeBoard = () => {
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'important'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const notices: Notice[] = [
    {
      id: 1,
      title: '2025년 1학기 시간표 안내',
      author: {
        name: '김담임 선생님',
        profileImage: '👩‍🏫'
      },
      date: '2025-01-24',
      target: 'all',
      targetLabel: '전체 학생',
      contentPreview: '새 학기를 맞아 변경된 시간표를 안내드립니다. 수학 수업이 화요일로 이동되었으니...',
      fullContent: `새 학기를 맞아 변경된 시간표를 안내드립니다.

주요 변경사항:
• 수학 수업: 월요일 → 화요일 3교시
• 과학 수업: 화요일 → 수요일 2교시
• 체육 수업: 목요일 → 금요일 5교시

자세한 시간표는 첨부파일을 확인해주세요.`,
      hasAttachment: true,
      hasImage: false,
      hasLink: false,
      views: 156,
      comments: 8,
      isNew: true,
      isRead: false,
      isPinned: true,
      isImportant: true,
      attachments: [
        { name: '2025년_1학기_시간표.pdf', type: 'pdf', url: '#' }
      ]
    },
    {
      id: 2,
      title: '체험학습 신청 안내 - 과학관 견학',
      author: {
        name: '박과학 선생님',
        profileImage: '👨‍🔬'
      },
      date: '2025-01-23',
      target: 'class',
      targetLabel: '5학년 1반',
      contentPreview: '다음 주 금요일 과학관 견학을 위한 체험학습 신청서를 제출해주세요...',
      fullContent: `다음 주 금요일 과학관 견학을 위한 체험학습 신청서를 제출해주세요.

일정: 2025년 1월 31일 (금) 오전 9시 ~ 오후 3시
장소: 국립중앙과학관
준비물: 도시락, 물병, 필기구, 카메라(선택)

신청서는 다음 링크에서 다운로드하세요: https://example.com/form`,
      hasAttachment: false,
      hasImage: true,
      hasLink: true,
      views: 89,
      comments: 12,
      isNew: false,
      isRead: true,
      isPinned: false,
      isImportant: false
    },
    {
      id: 3,
      title: '독서감상문 대회 참가 안내',
      author: {
        name: '이국어 선생님',
        profileImage: '👨‍🏫'
      },
      date: '2025-01-22',
      target: 'all',
      targetLabel: '전체 학생',
      contentPreview: '제15회 독서감상문 대회가 개최됩니다. 많은 참여 바랍니다...',
      fullContent: `제15회 독서감상문 대회가 개최됩니다.

대회 일정:
• 접수 기간: 2025년 2월 1일 ~ 2월 15일
• 심사 기간: 2월 16일 ~ 2월 28일
• 시상식: 3월 5일

상금:
• 대상: 10만원 상품권 + 상장
• 우수상: 5만원 상품권 + 상장
• 참가상: 도서 3권`,
      hasAttachment: true,
      hasImage: false,
      hasLink: false,
      views: 234,
      comments: 5,
      isNew: false,
      isRead: false,
      isPinned: false,
      isImportant: true,
      attachments: [
        { name: '독서감상문_대회_안내문.docx', type: 'doc', url: '#' }
      ]
    },
    {
      id: 4,
      title: '개인별 학습 진단 결과 안내',
      author: {
        name: 'AI 학습분석 시스템',
        profileImage: '🤖'
      },
      date: '2025-01-21',
      target: 'individual',
      targetLabel: '김학생',
      contentPreview: 'AI 분석 결과 수학 분수 단원에서 보충 학습이 필요합니다...',
      fullContent: `AI 분석 결과를 바탕으로 개인별 학습 진단 결과를 안내드립니다.

강점 영역:
• 영어 독해: 92점 (상위 5%)
• 과학 실험: 88점 (상위 15%)

보충 필요 영역:
• 수학 분수: 67점 (보충 권장)
• 국어 문법: 73점 (보충 권장)

추천 학습 콘텐츠가 개별 전송되었습니다.`,
      hasAttachment: false,
      hasImage: false,
      hasLink: true,
      views: 45,
      comments: 2,
      isNew: true,
      isRead: false,
      isPinned: false,
      isImportant: false
    },
    {
      id: 5,
      title: '학부모 상담 주간 안내',
      author: {
        name: '교무부',
        profileImage: '🏫'
      },
      date: '2025-01-20',
      target: 'all',
      targetLabel: '전체 학생',
      contentPreview: '다음 주는 학부모 상담 주간입니다. 학부모님께서 담임 선생님과...',
      fullContent: `다음 주는 학부모 상담 주간입니다.

상담 일정: 2025년 1월 27일 ~ 31일
상담 시간: 오후 2시 ~ 5시
상담 방법: 대면 또는 화상상담 선택 가능

상담 신청은 학교 홈페이지에서 가능합니다.
문의사항이 있으시면 교무실로 연락주세요.

연락처: 02-1234-5678`,
      hasAttachment: false,
      hasImage: false,
      hasLink: true,
      views: 178,
      comments: 15,
      isNew: false,
      isRead: true,
      isPinned: false,
      isImportant: false
    }
  ];

  const filteredNotices = notices.filter(notice => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'unread' && !notice.isRead) || 
      (filter === 'important' && notice.isImportant);
    
    const matchesSearch = 
      searchTerm === '' ||
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.contentPreview.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleNoticeClick = (notice: Notice) => {
    setSelectedNotice(notice);
    // Mark as read
    notice.isRead = true;
    notice.views += 1;
  };

  const handleMarkAsRead = (noticeId: number) => {
    const notice = notices.find(n => n.id === noticeId);
    if (notice) {
      notice.isRead = true;
    }
  };

  const getTargetBadgeColor = (target: string) => {
    switch (target) {
      case 'all': return 'bg-blue-100 text-blue-700';
      case 'class': return 'bg-green-100 text-green-700';
      case 'individual': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long' 
    };
    return date.toLocaleDateString('ko-KR', options);
  };

  if (selectedNotice) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back button */}
          <button 
            onClick={() => setSelectedNotice(null)}
            className="mb-4 sm:mb-6 flex items-center text-blue-600 hover:text-blue-800 text-sm sm:text-base"
          >
            ← 목록으로 돌아가기
          </button>

          {/* Notice Detail */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {selectedNotice.title}
                  </h1>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 sm:w-8 h-6 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm sm:text-lg">
                        {selectedNotice.author.profileImage}
                      </div>
                      <span className="font-medium">{selectedNotice.author.name}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
                      <span>{formatDate(selectedNotice.date)}</span>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${getTargetBadgeColor(selectedNotice.target)}`}>
                      {selectedNotice.targetLabel}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span>{selectedNotice.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span>{selectedNotice.comments}</span>
                  </div>
                </div>
              </div>

              {/* Status indicators */}
              <div className="flex items-center space-x-2">
                {selectedNotice.isPinned && (
                  <span className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                    <Star className="w-3 h-3" />
                    <span>고정</span>
                  </span>
                )}
                {selectedNotice.isImportant && (
                  <span className="flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>중요</span>
                  </span>
                )}
                {selectedNotice.isNew && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    NEW
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <div className="prose max-w-none">
                {selectedNotice.fullContent.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Attachments */}
              {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">첨부파일</h3>
                  <div className="space-y-2">
                    {selectedNotice.attachments.map((attachment, index) => (
                      <a
                        key={index}
                        href={attachment.url}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                      >
                        <Paperclip className="w-4 h-4" />
                        <span>{attachment.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm button */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => handleMarkAsRead(selectedNotice.id)}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={selectedNotice.isRead}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{selectedNotice.isRead ? '읽음 확인됨' : '읽음 확인'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">알림장</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">선생님이 보내주신 공지사항을 확인하세요</p>
          </div>
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-500">읽지 않은 알림</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">
                {notices.filter(n => !n.isRead).length}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-500">전체 알림</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{notices.length}</p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="제목, 내용, 선생님 이름으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                filter === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                filter === 'unread'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              읽지 않음
            </button>
            <button
              onClick={() => setFilter('important')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                filter === 'important'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              중요
            </button>
          </div>
        </div>

        {/* Notice Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => handleNoticeClick(notice)}
              className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer p-4 sm:p-6 border-l-4 ${
                notice.isPinned 
                  ? 'border-l-yellow-500 bg-yellow-50' 
                  : notice.isImportant 
                  ? 'border-l-red-500' 
                  : notice.isNew 
                  ? 'border-l-blue-500' 
                  : 'border-l-gray-300'
              } ${!notice.isRead ? 'ring-2 ring-blue-200' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Title and badges */}
                  <div className="flex items-start space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <h3 className={`text-base sm:text-lg font-bold ${!notice.isRead ? 'text-gray-900' : 'text-gray-700'} flex-1`}>
                      {notice.title}
                    </h3>
                    
                    <div className="flex items-center space-x-1">
                      {notice.isPinned && <Star className="w-4 h-4 text-yellow-500" />}
                      {notice.isImportant && <AlertCircle className="w-4 h-4 text-red-500" />}
                      {notice.isNew && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          NEW
                        </span>
                      )}
                      {!notice.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>

                  {/* Author and meta info */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-3 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs sm:text-sm">
                        {notice.author.profileImage}
                      </div>
                      <span className="font-medium">{notice.author.name}</span>
                    </div>
                    
                    <span className="hidden sm:inline">{formatDate(notice.date)}</span>
                    <span className="sm:hidden">{notice.date}</span>
                    
                    <span className={`px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs ${getTargetBadgeColor(notice.target)}`}>
                      {notice.targetLabel}
                    </span>
                  </div>

                  {/* Content preview */}
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                    {notice.contentPreview}
                  </p>

                  {/* Icons and stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span>{notice.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span>{notice.comments}</span>
                      </div>
                      
                      {/* Attachment indicators */}
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        {notice.hasAttachment && <Paperclip className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />}
                        {notice.hasImage && <ImageIcon className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />}
                        {notice.hasLink && <Link className="w-3 sm:w-4 h-3 sm:h-4 text-gray-400" />}
                      </div>
                    </div>
                    
                    <div className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">
                      클릭하여 자세히 보기
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredNotices.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {filter === 'unread' ? '읽지 않은 알림이 없습니다.' :
               filter === 'important' ? '중요한 알림이 없습니다.' :
               searchTerm ? '검색 결과가 없습니다.' :
               '알림이 없습니다.'}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NoticeBoard;