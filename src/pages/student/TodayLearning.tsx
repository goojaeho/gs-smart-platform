import Layout from '../../components/common/Layout';
import { Clock, Play, CheckCircle, Award, Brain, Target, User, Eye, ThumbsUp, ArrowLeft, Pause, SkipBack, SkipForward, Volume2, Settings, Maximize, BookOpen } from 'lucide-react';
import { useState } from 'react';
import fractionImage from '../../assets/pictures/fraction.jpg';
import englishImage from '../../assets/pictures/english.jpg';
import aiImage from '../../assets/pictures/ai.png';
import Codingimage from '../../assets/pictures/game.webp';
import galaxyImage from '../../assets/pictures/galaxy.webp';
import chosenImage from '../../assets/pictures/chosen.jpg';
import literacyImage from '../../assets/pictures/literacy.png';
import chatgptImage from '../../assets/pictures/chatgpt.jpeg';
import pythonImage from '../../assets/pictures/python.jpeg';
import chemImage from '../../assets/pictures/chemistry.jpg';
import ingangImage from '../../assets/pictures/ingang.jpg';

const TodayLearning = () => {
  const [selectedSubject, setSelectedSubject] = useState('전체');
  const [currentView, setCurrentView] = useState('main'); // 'main', 'lectureList', 'videoPlayer'
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedLecture, setSelectedLecture] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const subjects = ['전체', '국어', '영어', '수학', '과학', '사회', 'AI', '코딩'];
  
  const videoLessons = [
    {
      id: 1,
      title: '[5학년] 분수의 나눗셈 - 기초부터 심화까지',
      subject: '수학',
      teacher: '김수학 선생님',
      duration: 25,
      thumbnail: fractionImage,
      views: 1234,
      likes: 89,
      difficulty: 'medium',
      progress: 0,
      isNew: true
    },
    {
      id: 2,
      title: 'AI의 이해 - 인공지능이란 무엇인가?',
      subject: 'AI',
      teacher: '이AI 선생님',
      duration: 20,
      thumbnail: aiImage,
      views: 2341,
      likes: 156,
      difficulty: 'easy',
      progress: 45,
      isRecommended: true
    },
    {
      id: 3,
      title: '스크래치로 만드는 첫 게임',
      subject: '코딩',
      teacher: '박코딩 선생님',
      duration: 30,
      thumbnail: Codingimage,
      views: 3456,
      likes: 234,
      difficulty: 'easy',
      progress: 100,
      isPopular: true
    },
    {
      id: 4,
      title: 'Present Perfect - 현재완료 시제 마스터하기',
      subject: '영어',
      teacher: 'James 선생님',
      duration: 15,
      thumbnail: englishImage,
      views: 987,
      likes: 67,
      difficulty: 'medium',
      progress: 30,
      isNew: true
    },
    {
      id: 5,
      title: '태양계와 행성 - 우주여행을 떠나요',
      subject: '과학',
      teacher: '최과학 선생님',
      duration: 18,
      thumbnail: galaxyImage,
      views: 1567,
      likes: 98,
      difficulty: 'easy',
      progress: 0,
      isRecommended: true
    },
    {
      id: 6,
      title: '조선시대 왕들의 이야기',
      subject: '사회',
      teacher: '정역사 선생님',
      duration: 22,
      thumbnail: chosenImage,
      views: 876,
      likes: 54,
      difficulty: 'medium',
      progress: 60
    },
    {
      id: 7,
      title: '논설문 쓰기의 기초',
      subject: '국어',
      teacher: '강국어 선생님',
      duration: 20,
      thumbnail: literacyImage,
      views: 654,
      likes: 43,
      difficulty: 'hard',
      progress: 0
    },
    {
      id: 8,
      title: 'ChatGPT 활용법 - AI와 대화하기',
      subject: 'AI',
      teacher: '이AI 선생님',
      duration: 15,
      thumbnail: chatgptImage,
      views: 4321,
      likes: 312,
      difficulty: 'easy',
      progress: 0,
      isPopular: true
    },
    {
      id: 9,
      title: 'Python 첫걸음 - 변수와 자료형',
      subject: '코딩',
      teacher: '박코딩 선생님',
      duration: 35,
      thumbnail: pythonImage,
      views: 2890,
      likes: 201,
      difficulty: 'medium',
      progress: 20,
      fit: 'contain'
    },
    {
      id: 10,
      title: '화학반응과 실험',
      subject: '과학',
      teacher: '최과학 선생님',
      duration: 28,
      thumbnail: chemImage,
      views: 1123,
      likes: 78,
      difficulty: 'hard',
      progress: 0
    }
  ];

  const filteredContents = selectedSubject === '전체' 
    ? videoLessons 
    : videoLessons.filter(c => c.subject === selectedSubject);

  const aiRecommendations = [
    { subject: '수학', topic: '분수의 나눗셈', reason: '지난 평가에서 취약점 발견', priority: 'high' },
    { subject: '영어', topic: '현재완료 시제', reason: 'AI 분석 결과 보충 필요', priority: 'medium' },
    { subject: '과학', topic: '전기회로', reason: '관련 단원 예습 권장', priority: 'low' },
  ];

  // Functions for navigation
  const handleStartLearning = (recommendation: any) => {
    setSelectedTopic(recommendation);
    setCurrentView('lectureList');
  };

  const handleLectureClick = (lecture: any) => {
    setSelectedLecture(lecture);
    setCurrentView('videoPlayer');
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleBackToMain = () => {
    setCurrentView('main');
    setSelectedTopic(null);
    setSelectedLecture(null);
  };

  const handleBackToLectureList = () => {
    setCurrentView('lectureList');
    setSelectedLecture(null);
  };

  // Get sample lectures based on selected topic
  const getSampleLecturesByTopic = () => {
    if (!selectedTopic) return [];
    
    // Sample lectures for 분수의 나눗셈
    if (selectedTopic.topic === '분수의 나눗셈') {
      return [
        {
          id: 'fraction1',
          title: '[기초] 분수의 나눗셈이란? - 개념 이해하기',
          subject: '수학',
          teacher: '김분수 선생님',
          duration: 15,
          thumbnail: fractionImage,
          views: 2340,
          likes: 189,
          difficulty: 'easy',
          progress: 0,
          isRecommended: true,
          description: '분수를 나누는 것의 의미를 쉽게 알아보고, 기본 개념을 익혀봅시다.'
        },
        {
          id: 'fraction2', 
          title: '[중급] 분수 나눗셈의 원리 - 역수 곱하기',
          subject: '수학',
          teacher: '김분수 선생님', 
          duration: 18,
          thumbnail: fractionImage,
          views: 1876,
          likes: 156,
          difficulty: 'medium',
          progress: 0,
          isNew: true,
          description: '왜 분수를 나눌 때 역수를 곱하는지 원리를 이해해봅시다.'
        },
        {
          id: 'fraction3',
          title: '[실습] 분수 나눗셈 문제 풀어보기',
          subject: '수학',
          teacher: '이수학 선생님',
          duration: 25,
          thumbnail: fractionImage,
          views: 3210,
          likes: 287,
          difficulty: 'medium', 
          progress: 0,
          isPopular: true,
          description: '다양한 분수 나눗셈 문제를 단계별로 풀어보며 실력을 키워봅시다.'
        },
        {
          id: 'fraction4',
          title: '[심화] 대분수와 소분수 나눗셈',
          subject: '수학',
          teacher: '박수학 선생님',
          duration: 22,
          thumbnail: fractionImage,
          views: 1543,
          likes: 98,
          difficulty: 'hard',
          progress: 0,
          description: '대분수와 소분수가 섞인 복잡한 나눗셈 문제를 해결해봅시다.'
        },
        {
          id: 'fraction5',
          title: '[응용] 분수 나눗셈 실생활 문제',
          subject: '수학', 
          teacher: '최수학 선생님',
          duration: 20,
          thumbnail: fractionImage,
          views: 987,
          likes: 74,
          difficulty: 'hard',
          progress: 0,
          description: '실생활에서 분수 나눗셈이 어떻게 쓰이는지 문제를 통해 알아봅시다.'
        },
        {
          id: 'fraction6',
          title: '덧셈과 뺄셈',
          subject: '수학',
          teacher: '김분수 선생님',
          duration: 12,
          thumbnail: ingangImage,
          views: 2156,
          likes: 203,
          difficulty: 'easy',
          progress: 0,
          description: '분수 나눗셈에서 자주 하는 실수들을 점검하고 올바른 방법을 익혀봅시다.'
        }
      ];
    }
    
    // Sample lectures for 현재완료 시제  
    if (selectedTopic.topic === '현재완료 시제') {
      return [
        {
          id: 'present1',
          title: '[기초] Present Perfect - 현재완료의 개념',
          subject: '영어',
          teacher: 'Sarah 선생님',
          duration: 20,
          thumbnail: englishImage,
          views: 1789,
          likes: 145,
          difficulty: 'easy',
          progress: 0,
          isRecommended: true,
          description: '현재완료 시제가 무엇인지, 언제 사용하는지 기본 개념을 알아봅시다.'
        },
        {
          id: 'present2',
          title: '[중급] Have/Has + Past Participle 완벽 정리',
          subject: '영어', 
          teacher: 'James 선생님',
          duration: 25,
          thumbnail: englishImage,
          views: 2344,
          likes: 198,
          difficulty: 'medium',
          progress: 0,
          isNew: true,
          description: 'Have와 Has의 올바른 사용법과 과거분사 변화를 완벽하게 익혀봅시다.'
        },
        {
          id: 'present3',
          title: '[실습] Present Perfect 문장 만들기',
          subject: '영어',
          teacher: 'Emma 선생님', 
          duration: 18,
          thumbnail: englishImage,
          views: 1456,
          likes: 89,
          difficulty: 'medium',
          progress: 0,
          description: '현재완료 시제를 사용한 다양한 문장을 직접 만들어보며 연습합니다.'
        },
        {
          id: 'present4',
          title: '[심화] Present Perfect vs Past Simple 구분하기',
          subject: '영어',
          teacher: 'David 선생님',
          duration: 22,
          thumbnail: englishImage,
          views: 2987,
          likes: 234,
          difficulty: 'hard',
          progress: 0,
          isPopular: true,
          description: '현재완료와 과거시제를 언제 어떻게 구분해서 사용하는지 명확하게 배워봅시다.'
        }
      ];
    }

    // Sample lectures for 전기회로
    if (selectedTopic.topic === '전기회로') {
      return [
        {
          id: 'electric1',
          title: '[기초] 전기회로란? - 전기의 흐름 이해하기',
          subject: '과학',
          teacher: '정과학 선생님',
          duration: 16,
          thumbnail: chemImage,
          views: 1234,
          likes: 87,
          difficulty: 'easy', 
          progress: 0,
          isRecommended: true,
          description: '전기가 어떻게 흐르는지, 회로의 기본 구성요소를 알아봅시다.'
        },
        {
          id: 'electric2',
          title: '[중급] 직렬회로 vs 병렬회로',
          subject: '과학',
          teacher: '김과학 선생님',
          duration: 24,
          thumbnail: chemImage,
          views: 1876,
          likes: 142,
          difficulty: 'medium',
          progress: 0,
          isNew: true,
          description: '직렬회로와 병렬회로의 차이점과 특성을 비교해서 알아봅시다.'
        },
        {
          id: 'electric3',
          title: '[실험] LED 전구 회로 만들기',
          subject: '과학',
          teacher: '이과학 선생님',
          duration: 30,
          thumbnail: chemImage,
          views: 2543,
          likes: 201,
          difficulty: 'medium',
          progress: 0,
          isPopular: true,
          description: '실제로 LED 전구를 이용한 간단한 전기회로를 만들어봅시다.'
        }
      ];
    }

    // Return empty array for unhandled topics
    return [];
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render main view
  const renderMainView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">오늘의 학습</h2>
          <p className="text-gray-600 mt-1">AI가 추천하는 맞춤형 학습 콘텐츠</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">오늘 학습 목표</p>
            <p className="text-2xl font-bold text-blue-600">3시간</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">완료한 학습</p>
            <p className="text-2xl font-bold text-green-600">1.5시간</p>
          </div>
        </div>
      </div>

      {/* AI 추천 학습 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-8 h-8" />
            <h3 className="text-xl font-bold">AI 맞춤 추천</h3>
          </div>
          <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
            개인화 분석 기반
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiRecommendations.map((rec, idx) => (
            <div key={idx} className="bg-white bg-opacity-10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{rec.subject}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  rec.priority === 'high' ? 'bg-red-500' :
                  rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                  {rec.priority === 'high' ? '최우선' : 
                   rec.priority === 'medium' ? '권장' : '선택'}
                </span>
              </div>
              <p className="text-lg font-medium mb-1">{rec.topic}</p>
              <p className="text-xs opacity-80">{rec.reason}</p>
              <button 
                onClick={() => handleStartLearning(rec)}
                className="mt-3 w-full py-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors text-sm"
              >
                학습 시작
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 과목 필터 */}
      <div className="flex space-x-2">
        {subjects.map(subject => (
          <button
            key={subject}
            onClick={() => setSelectedSubject(subject)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedSubject === subject
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* 영상 강의 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredContents.map((lesson) => (
          <div 
            key={lesson.id} 
            onClick={() => handleLectureClick(lesson)}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
              {/* 썸네일 영역 */}
              <div className="relative">
                <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {typeof lesson.thumbnail === 'string' && lesson.thumbnail.includes('.') ? (
                    <img 
                      src={lesson.thumbnail} 
                      alt={lesson.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-5xl">{lesson.thumbnail}</div>
                  )}
                </div>
                {/* 진행률 바 */}
                {lesson.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
                    <div 
                      className="h-full bg-red-500"
                      style={{ width: `${lesson.progress}%` }}
                    />
                  </div>
                )}
                {/* 동영상 시간 */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded">
                  {lesson.duration}:00
                </div>
                {/* 재생 버튼 */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-30">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </div>
                </div>
                {/* 라벨 */}
                {lesson.isNew && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs rounded">NEW</span>
                )}
                {lesson.isRecommended && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">AI 추천</span>
                )}
                {lesson.isPopular && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-orange-500 text-white text-xs rounded">인기</span>
                )}
                {/* 난이도 */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                  lesson.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  lesson.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {lesson.difficulty === 'easy' ? '기초' : 
                   lesson.difficulty === 'medium' ? '중급' : '심화'}
                </div>
              </div>
              
              {/* 콘텐츠 정보 */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 hover:text-blue-600">
                  {lesson.title}
                </h3>
                
                <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                  <User className="w-3 h-3" />
                  <span>{lesson.teacher}</span>
                  <span className="text-gray-400">•</span>
                  <span className={`font-medium ${
                    lesson.subject === 'AI' ? 'text-purple-600' :
                    lesson.subject === '코딩' ? 'text-blue-600' :
                    lesson.subject === '수학' ? 'text-green-600' :
                    lesson.subject === '영어' ? 'text-orange-600' :
                    lesson.subject === '과학' ? 'text-pink-600' :
                    lesson.subject === '국어' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {lesson.subject}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{lesson.views.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{lesson.likes}</span>
                    </span>
                  </div>
                  <span className="text-orange-500 font-medium">+30P</span>
                </div>
                
                {/* 학습 상태 */}
                {lesson.progress === 100 && (
                  <div className="mt-2 flex items-center space-x-1 text-green-600 text-xs">
                    <CheckCircle className="w-3 h-3" />
                    <span>학습 완료</span>
                  </div>
                )}
                {lesson.progress > 0 && lesson.progress < 100 && (
                  <div className="mt-2 flex items-center space-x-1 text-blue-600 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>학습중 {lesson.progress}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 일일 미션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">일일 미션</h3>
            <Target className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">수학 문제 10개 풀기</span>
              </div>
              <span className="text-sm text-green-600 font-medium">완료 +50P</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                <span className="text-gray-700">영어 단어 20개 암기</span>
              </div>
              <span className="text-sm text-gray-500">진행중 70%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                <span className="text-gray-700">독서 30분</span>
              </div>
              <span className="text-sm text-gray-500">미완료</span>
            </div>
          </div>
        </div>

      {/* 일일 미션 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">일일 미션</h3>
          <Target className="w-5 h-5 text-orange-500" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">수학 문제 10개 풀기</span>
            </div>
            <span className="text-sm text-green-600 font-medium">완료 +50P</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
              <span className="text-gray-700">영어 단어 20개 암기</span>
            </div>
            <span className="text-sm text-gray-500">진행중 70%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
              <span className="text-gray-700">독서 30분</span>
            </div>
            <span className="text-sm text-gray-500">미완료</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Render lecture list view
  const renderLectureListView = () => {
    const sampleLectures = getSampleLecturesByTopic();
    
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleBackToMain}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedTopic?.subject} - {selectedTopic?.topic}
            </h2>
            <p className="text-gray-600 mt-1">관련 강의 목록</p>
          </div>
        </div>

        {/* Topic info card */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <BookOpen className="w-6 h-6" />
            <h3 className="text-lg font-bold">{selectedTopic?.topic}</h3>
          </div>
          <p className="text-sm opacity-90 mb-3">{selectedTopic?.reason}</p>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            selectedTopic?.priority === 'high' ? 'bg-red-500 bg-opacity-80' :
            selectedTopic?.priority === 'medium' ? 'bg-yellow-500 bg-opacity-80' : 'bg-green-500 bg-opacity-80'
          }`}>
            {selectedTopic?.priority === 'high' ? '최우선 학습' : 
             selectedTopic?.priority === 'medium' ? '권장 학습' : '선택 학습'}
          </span>
        </div>

        {/* Lecture list */}
        <div className="space-y-3">
          {sampleLectures.map((lecture, index) => (
            <div 
              key={lecture.id}
              onClick={() => handleLectureClick(lecture)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-primary transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-lg font-medium text-gray-800">
                      {index + 1}.
                    </span>
                    <h3 className="font-bold text-gray-900 text-lg flex-1">
                      {lecture.title}
                    </h3>
                    {/* Labels */}
                    {lecture.isRecommended && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">추천</span>
                    )}
                    {lecture.isNew && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium">NEW</span>
                    )}
                    {lecture.isPopular && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded font-medium">인기</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span className="font-medium">{lecture.teacher}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{lecture.duration}분</span>
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      lecture.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      lecture.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {lecture.difficulty === 'easy' ? '기초' : 
                       lecture.difficulty === 'medium' ? '중급' : '심화'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {lecture.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{lecture.views.toLocaleString()}회 시청</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{lecture.likes}개 좋아요</span>
                      </span>
                    </div>
                    <span className="text-orange-500 font-medium">학습 완료 시 +30P</span>
                  </div>
                  
                  {/* Learning status */}
                  {lecture.progress === 100 && (
                    <div className="mt-2 flex items-center space-x-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>학습 완료</span>
                    </div>
                  )}
                  {lecture.progress > 0 && lecture.progress < 100 && (
                    <div className="mt-2 flex items-center space-x-1 text-blue-600 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>학습중 {lecture.progress}%</span>
                    </div>
                  )}
                </div>
                
                <div className="ml-4 flex items-center">
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center text-primary hover:bg-opacity-20 transition-colors">
                    <Play className="w-6 h-6 ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sampleLectures.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">관련 강의를 준비 중입니다</h3>
            <p className="text-gray-600">곧 다양한 강의가 추가될 예정입니다.</p>
          </div>
        )}
      </div>
    );
  };

  // Render video player view
  const renderVideoPlayerView = () => {
    if (!selectedLecture) return null;
    
    const totalSeconds = selectedLecture.duration * 60;
    const progress = (currentTime / totalSeconds) * 100;
    
    return (
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleBackToLectureList}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{selectedLecture.title}</h2>
            <p className="text-gray-600">{selectedLecture.teacher}</p>
          </div>
        </div>

        {/* Video player */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Video area */}
          <div className="relative bg-black aspect-video">
            {typeof selectedLecture.thumbnail === 'string' && selectedLecture.thumbnail.includes('.') ? (
              <img 
                src={selectedLecture.thumbnail} 
                alt={selectedLecture.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-8xl mb-4">{selectedLecture.thumbnail}</div>
                  <p className="text-lg">샘플 비디오</p>
                </div>
              </div>
            )}
            
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <button 
                onClick={togglePlayPause}
                className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-gray-900" />
                ) : (
                  <Play className="w-10 h-10 text-gray-900 ml-1" />
                )}
              </button>
            </div>
          </div>
          
          {/* Video controls */}
          <div className="bg-gray-900 text-white p-4">
            {/* Progress bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-700 rounded-full h-1 mb-2">
                <div 
                  className="bg-primary h-1 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-300">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(totalSeconds)}</span>
              </div>
            </div>
            
            {/* Control buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-700 rounded">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button 
                  onClick={togglePlayPause}
                  className="p-3 bg-primary hover:bg-primary-dark rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white ml-0.5" />
                  )}
                </button>
                <button className="p-2 hover:bg-gray-700 rounded">
                  <SkipForward className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-700 rounded">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{selectedLecture.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{selectedLecture.teacher}</span>
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  selectedLecture.subject === 'AI' ? 'bg-purple-100 text-purple-700' :
                  selectedLecture.subject === '코딩' ? 'bg-blue-100 text-blue-700' :
                  selectedLecture.subject === '수학' ? 'bg-green-100 text-green-700' :
                  selectedLecture.subject === '영어' ? 'bg-orange-100 text-orange-700' :
                  selectedLecture.subject === '과학' ? 'bg-pink-100 text-pink-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {selectedLecture.subject}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  selectedLecture.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  selectedLecture.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedLecture.difficulty === 'easy' ? '기초' : 
                   selectedLecture.difficulty === 'medium' ? '중급' : '심화'}
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                이 강의에서는 {selectedLecture.title}에 대해 자세히 알아보겠습니다. 
                단계별로 설명하여 누구나 쉽게 이해할 수 있도록 구성되어 있습니다.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">강의 정보</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">재생 시간</span>
                  <span className="font-medium">{selectedLecture.duration}분</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">조회수</span>
                  <span className="font-medium">{selectedLecture.views.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">좋아요</span>
                  <span className="font-medium">{selectedLecture.likes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">학습 완료 시</span>
                  <span className="font-medium text-orange-600">+30 포인트</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {currentView === 'main' && renderMainView()}
      {currentView === 'lectureList' && renderLectureListView()}
      {currentView === 'videoPlayer' && renderVideoPlayerView()}
    </Layout>
  );
};

export default TodayLearning;