import Layout from '../../components/common/Layout';
import { Clock, Play, CheckCircle, Award, Brain, Target, User, Eye, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

const TodayLearning = () => {
  const [selectedSubject, setSelectedSubject] = useState('전체');
  const subjects = ['전체', '국어', '영어', '수학', '과학', '사회', 'AI', '코딩'];
  
  const videoLessons = [
    {
      id: 1,
      title: '[5학년] 분수의 나눗셈 - 기초부터 심화까지',
      subject: '수학',
      teacher: '김수학 선생님',
      duration: 25,
      thumbnail: '📐',
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
      thumbnail: '🤖',
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
      thumbnail: '💻',
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
      thumbnail: '🌍',
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
      thumbnail: '🪐',
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
      thumbnail: '🏛️',
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
      thumbnail: '📚',
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
      thumbnail: '💬',
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
      thumbnail: '🐍',
      views: 2890,
      likes: 201,
      difficulty: 'medium',
      progress: 20
    },
    {
      id: 10,
      title: '화학반응과 실험',
      subject: '과학',
      teacher: '최과학 선생님',
      duration: 28,
      thumbnail: '⚗️',
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

  return (
    <Layout>
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
                <button className="mt-3 w-full py-2 bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors text-sm">
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
            <div key={lesson.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
              {/* 썸네일 영역 */}
              <div className="relative">
                <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-5xl">
                  {lesson.thumbnail}
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
      </div>
    </Layout>
  );
};

export default TodayLearning;