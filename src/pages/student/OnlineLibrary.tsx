import Layout from '../../components/common/Layout';
import { 
  Book, Search, Filter, Star, Clock, Bookmark, TrendingUp, Award,
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, BookOpen, Volume2,
  Sun, Moon, Settings, X, List, FileText
} from 'lucide-react';
import { useState } from 'react';
import princeImage from '../../assets/pictures/lepetitprince.jpg';
import mathImage from  '../../assets/pictures/math.jpg';
import scienceImage from  '../../assets/pictures/science.jpg';
import englishImage from  '../../assets/pictures/john.jpg';
import codingImage from  '../../assets/pictures/coding.jpg';
import aiImage from  '../../assets/pictures/ai.jpg';
import samImage from  '../../assets/pictures/sam.jpg';
import koreanImage from  '../../assets/pictures/hankuksa.jpg';  
import starImage from  '../../assets/pictures/star.jpg';  

const OnlineLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReader, setShowReader] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  
  const categories = ['전체', '교과서', '동화', '과학', '역사', '영어', '코딩'];
  
  const books = [
    { id: 1, title: '어린왕자', author: '생텍쥐페리', category: '동화', rating: 4.8, pages: 120, level: '초급', cover: princeImage, isNew: true },
    { id: 2, title: '수학의 정석', author: '홍성대', category: '교과서', rating: 4.5, pages: 350, level: '중급', cover: mathImage },
    { id: 3, title: '재미있는 과학 이야기', author: '김과학', category: '과학', rating: 4.7, pages: 200, level: '초급', cover: scienceImage },
    { id: 4, title: 'English for Kids', author: 'John Smith', category: '영어', rating: 4.6, pages: 150, level: '초급', cover: englishImage, isRecommended: true },
    { id: 5, title: '한국사 이야기', author: '역사연구소', category: '역사', rating: 4.4, pages: 280, level: '중급', cover: koreanImage },
    { id: 6, title: '스크래치 코딩', author: '코딩선생', category: '코딩', rating: 4.9, pages: 180, level: '초급', cover: codingImage, isNew: true },
    { id: 7, title: '삼국지', author: '나관중', category: '역사', rating: 4.7, pages: 500, level: '고급', cover: samImage },
    { id: 8, title: '별자리 이야기', author: '천문과학관', category: '과학', rating: 4.5, pages: 160, level: '초급', cover: starImage, isRecommended: true },
  ];

  const readingHistory = [
    { title: '어린왕자', progress: 85, lastRead: '2일 전' },
    { title: '수학의 정석', progress: 45, lastRead: '어제' },
    { title: '재미있는 과학 이야기', progress: 100, lastRead: '3일 전' },
  ];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === '전체' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReadBook = (book: any) => {
    setSelectedBook(book);
    setShowReader(true);
    setCurrentPage(1);
  };

  const closeReader = () => {
    setShowReader(false);
    setSelectedBook(null);
  };

  // Sample book content
  const bookContent = {
    chapters: [
      { id: 1, title: '제1장: 시작', pages: [1, 2, 3, 4, 5] },
      { id: 2, title: '제2장: 모험', pages: [6, 7, 8, 9, 10] },
      { id: 3, title: '제3장: 발견', pages: [11, 12, 13, 14, 15] },
    ],
    totalPages: 15,
    content: [
      "옛날 옛적에 한 작은 별에서 살고 있던 어린 왕자가 있었습니다. 그의 별은 너무나 작아서 의자만 조금 움직이면 하루에 여러 번 일몰을 볼 수 있었습니다...",
      "어린 왕자는 자신의 별에 있는 한 송이 장미를 정성스럽게 돌보았습니다. 그 장미는 아름답지만 때로는 허영심이 많았고, 어린 왕자를 힘들게 했습니다...",
      "어느 날, 어린 왕자는 여행을 떠나기로 결심했습니다. 그는 다른 별들을 방문하며 여러 어른들을 만났습니다. 왕, 허영쟁이, 술꾼, 사업가...",
      // ... more pages
    ]
  };

  const getPageContent = () => {
    if (!selectedBook) return '';
    // Sample content for demonstration
    return bookContent.content[currentPage - 1] || `${selectedBook.title} - 페이지 ${currentPage} 내용입니다...`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">온라인 도서관</h2>
            <p className="text-gray-600 mt-1">10,000권 이상의 전자책과 오디오북</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">이번 달 독서</p>
              <p className="text-2xl font-bold text-purple-600">5권</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">독서 포인트</p>
              <p className="text-2xl font-bold text-orange-600">250P</p>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="도서명, 저자명으로 검색..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>상세 필터</span>
            </button>
          </div>
        </div>

        {/* 카테고리 */}
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 도서 목록 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBooks.map(book => (
                <div key={book.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                  <div className="flex space-x-4">
                    <div className="w-20 h-28 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center text-4xl">
                      <img
    src={book.cover}
    alt={book.title}
    className="w-full h-full object-cover rounded-lg"
  />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-gray-900">{book.title}</h3>
                          <p className="text-sm text-gray-600">{book.author}</p>
                        </div>
                        {book.isNew && (
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">NEW</span>
                        )}
                        {book.isRecommended && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">추천</span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{book.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">{book.pages}쪽</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          book.level === '초급' ? 'bg-green-100 text-green-700' :
                          book.level === '중급' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {book.level}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2 mt-3">
                        <button 
                          onClick={() => handleReadBook(book)}
                          className="flex-1 py-1.5 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors"
                        >
                          읽기
                        </button>
                        <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 나의 독서 현황 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">나의 독서 현황</h3>
              <div className="space-y-3">
                {readingHistory.map((book, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{book.title}</h4>
                      <span className="text-xs text-gray-500">{book.lastRead}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            book.progress === 100 ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">{book.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium">
                전체 기록 보기
              </button>
            </div>

            {/* 독서 목표 */}
            <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">월간 독서 목표</h3>
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">목표 권수</span>
                    <span className="font-bold">5/10권</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">독서 시간</span>
                    <span className="font-bold">12/20시간</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full h-2">
                    <div className="bg-white h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 인기 도서 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">인기 도서</h3>
                <TrendingUp className="w-5 h-5 text-red-500" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-red-500">1</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">어린왕자</p>
                    <p className="text-xs text-gray-500">조회 1,234</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-orange-500">2</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">스크래치 코딩</p>
                    <p className="text-xs text-gray-500">조회 987</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-yellow-500">3</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">별자리 이야기</p>
                    <p className="text-xs text-gray-500">조회 856</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* eBook Reader Modal */}
      {showReader && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
          {/* Reader Header */}
          <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={closeReader}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h3 className="font-bold">{selectedBook.title}</h3>
                <p className="text-sm text-gray-400">{selectedBook.author}</p>
              </div>
            </div>
            
            {/* Reader Controls */}
            <div className="flex items-center space-x-4">
              {/* Table of Contents */}
              <button
                onClick={() => setShowTOC(!showTOC)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="목차"
              >
                <List className="w-5 h-5" />
              </button>
              
              {/* Font Size Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="글자 작게"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <span className="text-sm px-2">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  title="글자 크게"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
              
              {/* Dark/Light Mode */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title={isDarkMode ? '밝은 모드' : '어두운 모드'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              {/* Audio */}
              <button
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="오디오북"
              >
                <Volume2 className="w-5 h-5" />
              </button>
              
              {/* Bookmark */}
              <button
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="북마크"
              >
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Reader Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Table of Contents Sidebar */}
            {showTOC && (
              <div className={`w-64 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100'} p-4 overflow-y-auto`}>
                <h4 className="font-bold mb-4">목차</h4>
                <div className="space-y-2">
                  {bookContent.chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        setCurrentPage(chapter.pages[0]);
                        setShowTOC(false);
                      }}
                      className={`w-full text-left p-2 rounded hover:${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} transition-colors`}
                    >
                      <p className="text-sm font-medium">{chapter.title}</p>
                      <p className="text-xs opacity-70">페이지 {chapter.pages[0]}-{chapter.pages[chapter.pages.length - 1]}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Book Content */}
            <div className={`flex-1 flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto p-8">
                  {/* Page Content */}
                  <div 
                    className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} leading-relaxed`}
                    style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                  >
                    <h2 className="text-2xl font-bold mb-6">
                      {bookContent.chapters.find(ch => 
                        ch.pages.includes(currentPage)
                      )?.title || `페이지 ${currentPage}`}
                    </h2>
                    
                    <div className="space-y-4">
                      {/* Display book cover on first page */}
                      {currentPage === 1 && (
                        <div className="flex justify-center mb-8">
                          <img
                            src={selectedBook.cover}
                            alt={selectedBook.title}
                            className="w-48 h-64 object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      )}
                      
                      {/* Sample text content */}
                      <p className="text-justify">
                        {getPageContent()}
                      </p>
                      <p className="text-justify">
                        이 페이지는 샘플 콘텐츠입니다. 실제 전자책 리더에서는 책의 실제 내용이 표시됩니다.
                        글자 크기를 조절하거나, 다크 모드로 전환하여 편안하게 읽을 수 있습니다.
                      </p>
                      <p className="text-justify">
                        좌우 화살표 버튼이나 키보드 화살표 키를 사용하여 페이지를 넘길 수 있습니다.
                        목차 버튼을 클릭하면 원하는 챕터로 바로 이동할 수 있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Page Navigation */}
              <div className={`border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'} p-4`}>
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 1 
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDarkMode 
                          ? 'hover:bg-gray-700 text-white' 
                          : 'hover:bg-gray-200'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>이전</span>
                  </button>

                  <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="font-medium">{currentPage}</span>
                    <span className="mx-2">/</span>
                    <span>{selectedBook.pages || bookContent.totalPages}</span>
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(bookContent.totalPages, currentPage + 1))}
                    disabled={currentPage === bookContent.totalPages}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      currentPage === bookContent.totalPages 
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDarkMode 
                          ? 'hover:bg-gray-700 text-white' 
                          : 'hover:bg-gray-200'
                    }`}
                  >
                    <span>다음</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="max-w-3xl mx-auto mt-4">
                  <div className={`h-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                    <div 
                      className="h-1 bg-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${(currentPage / bookContent.totalPages) * 100}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-2 text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    읽기 진행률: {Math.round((currentPage / bookContent.totalPages) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default OnlineLibrary;