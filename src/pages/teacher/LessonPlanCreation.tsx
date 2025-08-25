import Layout from '../../components/common/Layout';
import { 
  PenTool, Save, Eye, Upload, Plus, Trash2, Timer, 
  BookOpen, Users, Target, Award, MessageSquare, 
  ChevronDown, ChevronRight, Play, Image, Link,
  CheckCircle, XCircle, Clock, Tag
} from 'lucide-react';
import { useState } from 'react';

interface QuizQuestion {
  id: string;
  type: 'multiple' | 'short';
  question: string;
  choices?: string[];
  correctAnswer: string;
  explanation: string;
}

interface DifferentiatedActivity {
  level: 'lower' | 'medium' | 'higher';
  activity: string;
  materials: string;
}

interface LessonPlan {
  subject: string;
  grade: string;
  unitTitle: string;
  lessonTitle: string;
  duration: number;
  objectives: string;
  standards: string;
  introduction: {
    time: number;
    description: string;
    aiCharacterLine: string;
    mediaUrl: string;
  };
  development: {
    time: number;
    description: string;
    activities: DifferentiatedActivity[];
  };
  closure: {
    time: number;
    description: string;
    hasQuiz: boolean;
  };
  quiz: QuizQuestion[];
  rewards: {
    points: number;
    badge: string;
    characterPraise: string;
  };
  visibility: 'private' | 'school' | 'public';
  tags: string[];
}

const LessonPlanCreation = () => {
  const [lessonPlan, setLessonPlan] = useState<LessonPlan>({
    subject: '',
    grade: '',
    unitTitle: '',
    lessonTitle: '',
    duration: 40,
    objectives: '',
    standards: '',
    introduction: {
      time: 5,
      description: '',
      aiCharacterLine: '',
      mediaUrl: ''
    },
    development: {
      time: 25,
      description: '',
      activities: [
        { level: 'lower', activity: '', materials: '' },
        { level: 'medium', activity: '', materials: '' },
        { level: 'higher', activity: '', materials: '' }
      ]
    },
    closure: {
      time: 10,
      description: '',
      hasQuiz: false
    },
    quiz: [],
    rewards: {
      points: 50,
      badge: '',
      characterPraise: ''
    },
    visibility: 'private',
    tags: []
  });

  const [activeTab, setActiveTab] = useState<'lower' | 'medium' | 'higher'>('medium');
  const [expandedSections, setExpandedSections] = useState({
    metadata: true,
    structure: true,
    quiz: false,
    rewards: false
  });
  const [newTag, setNewTag] = useState('');

  const subjects = ['국어', '수학', '과학', '사회', '영어', '예술', '체육', '창의적 체험활동'];
  const grades = ['1', '2', '3', '4', '5', '6'];
  const badges = ['문단 마스터', '수학 천재', '과학 탐험가', '독서왕', '영어 스타', '창의 발명가'];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateLessonPlan = (field: string, value: any) => {
    setLessonPlan(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedField = (section: string, field: string, value: any) => {
    setLessonPlan(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof LessonPlan],
        [field]: value
      }
    }));
  };

  const updateActivity = (level: 'lower' | 'medium' | 'higher', field: 'activity' | 'materials', value: string) => {
    setLessonPlan(prev => ({
      ...prev,
      development: {
        ...prev.development,
        activities: prev.development.activities.map(activity =>
          activity.level === level ? { ...activity, [field]: value } : activity
        )
      }
    }));
  };

  const addQuizQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      type: 'multiple',
      question: '',
      choices: ['', '', '', ''],
      correctAnswer: 'A',
      explanation: ''
    };
    setLessonPlan(prev => ({
      ...prev,
      quiz: [...prev.quiz, newQuestion]
    }));
  };

  const updateQuizQuestion = (id: string, field: keyof QuizQuestion, value: any) => {
    setLessonPlan(prev => ({
      ...prev,
      quiz: prev.quiz.map(q => q.id === id ? { ...q, [field]: value } : q)
    }));
  };

  const removeQuizQuestion = (id: string) => {
    setLessonPlan(prev => ({
      ...prev,
      quiz: prev.quiz.filter(q => q.id !== id)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !lessonPlan.tags.includes(newTag.trim())) {
      setLessonPlan(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setLessonPlan(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const loadTemplate = () => {
    setLessonPlan({
      subject: '국어',
      grade: '3',
      unitTitle: '문단의 짜임',
      lessonTitle: '문단을 나누고 정리하는 방법',
      duration: 40,
      objectives: '학생들은 문단이 무엇인지 설명하고 글을 문단으로 나누는 이유를 말할 수 있다.\n학생들은 주제문을 찾고 세부 내용을 적절한 문단으로 분류할 수 있다.',
      standards: '초등학교 국어과 교육과정 성취기준',
      introduction: {
        time: 5,
        description: '짧은 영상을 보고 문단 나누기의 간단한 예시를 살펴본다.',
        aiCharacterLine: '오늘은 글을 문단으로 나누는 방법을 배워볼거야!',
        mediaUrl: 'https://example.com/paragraph-intro.mp4'
      },
      development: {
        time: 25,
        description: '문단의 개념을 이해하고 실제 텍스트를 활용한 분화된 활동을 진행한다.',
        activities: [
          { 
            level: 'lower', 
            activity: '"문단 나누기 색칠하기" - 미리 표시된 지점에 학생들이 색칠로 문단을 구분한다.', 
            materials: '워크시트, 색연필' 
          },
          { 
            level: 'medium', 
            activity: '"교과서 텍스트 나누기" - 교과서 복사본을 제공하여 학생들이 선을 그어 문단을 나눈다.', 
            materials: '교과서 복사본, 펜' 
          },
          { 
            level: 'higher', 
            activity: '"주제문 찾기 & 나만의 문단 만들기" - 주제문을 파악하고 뒷받침 세부사항을 추가하여 하나의 완전한 문단을 작성한다.', 
            materials: '작문용지, 예시 텍스트' 
          }
        ]
      },
      closure: {
        time: 10,
        description: '문단의 기본 개념에 대한 객관식 퀴즈를 통해 자동 채점을 진행한다.',
        hasQuiz: true
      },
      quiz: [
        {
          id: '1',
          type: 'multiple',
          question: '문단은 주로 무엇에 관한 것인가요?',
          choices: ['무작위로 모인 문장들', '하나의 주요 아이디어를 다루는 문장들', '첫 번째 문장만', '마지막 문장만'],
          correctAnswer: 'B',
          explanation: '문단은 하나의 주요 아이디어에 대한 문장들을 포함합니다.'
        }
      ],
      rewards: {
        points: 50,
        badge: '문단 마스터',
        characterPraise: '글이 어떻게 구성되는지 탐구한 너를 정말 자랑스러워!'
      },
      visibility: 'private',
      tags: ['3학년', '국어', '문단']
    });
  };

  const calculateTotalTime = () => {
    return lessonPlan.introduction.time + lessonPlan.development.time + lessonPlan.closure.time;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <PenTool className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">지도안 생성</h1>
                <p className="text-gray-600">수업 계획을 상세하게 작성하고 공유하세요</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadTemplate}
                className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                예시 템플릿 불러오기
              </button>
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>임시저장</span>
              </button>
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>미리보기</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Metadata Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div 
            className="p-6 border-b border-gray-200 cursor-pointer flex items-center justify-between"
            onClick={() => toggleSection('metadata')}
          >
            <div className="flex items-center space-x-3">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">수업 정보</h2>
            </div>
            {expandedSections.metadata ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
          
          {expandedSections.metadata && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">과목 *</label>
                  <select 
                    value={lessonPlan.subject}
                    onChange={(e) => updateLessonPlan('subject', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">선택하세요</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">학년 *</label>
                  <select 
                    value={lessonPlan.grade}
                    onChange={(e) => updateLessonPlan('grade', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">선택하세요</option>
                    {grades.map(grade => (
                      <option key={grade} value={grade}>{grade}학년</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">수업 시간 (분)</label>
                  <input
                    type="number"
                    value={lessonPlan.duration}
                    onChange={(e) => updateLessonPlan('duration', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                    max="120"
                  />
                </div>
                <div className="flex items-end">
                  <div className="text-sm text-gray-600">
                    <Clock className="w-4 h-4 inline mr-1" />
                    총 계획 시간: {calculateTotalTime()}분
                    {calculateTotalTime() !== lessonPlan.duration && (
                      <span className="text-orange-600 ml-1">⚠️ 불일치</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">단원명 *</label>
                  <input
                    type="text"
                    value={lessonPlan.unitTitle}
                    onChange={(e) => updateLessonPlan('unitTitle', e.target.value)}
                    placeholder="예: 문단의 짜임"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">수업명 *</label>
                  <input
                    type="text"
                    value={lessonPlan.lessonTitle}
                    onChange={(e) => updateLessonPlan('lessonTitle', e.target.value)}
                    placeholder="예: 문단을 나누고 정리하는 방법"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">학습 목표 *</label>
                <textarea
                  value={lessonPlan.objectives}
                  onChange={(e) => updateLessonPlan('objectives', e.target.value)}
                  placeholder="간단한 문장으로 학습 목표를 작성하세요"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">성취기준/교육과정 연계 (선택)</label>
                <textarea
                  value={lessonPlan.standards}
                  onChange={(e) => updateLessonPlan('standards', e.target.value)}
                  placeholder="관련 교육과정 성취기준을 입력하세요"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Lesson Structure Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div 
            className="p-6 border-b border-gray-200 cursor-pointer flex items-center justify-between"
            onClick={() => toggleSection('structure')}
          >
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">수업 구성 및 시간 배분</h2>
            </div>
            {expandedSections.structure ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
          
          {expandedSections.structure && (
            <div className="p-6 space-y-6">
              {/* Introduction */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <Play className="w-4 h-4 mr-2 text-green-600" />
                  도입 단계
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">시간 (분)</label>
                    <input
                      type="number"
                      value={lessonPlan.introduction.time}
                      onChange={(e) => updateNestedField('introduction', 'time', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="1"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">활동 내용</label>
                    <input
                      type="text"
                      value={lessonPlan.introduction.description}
                      onChange={(e) => updateNestedField('introduction', 'description', e.target.value)}
                      placeholder="도입 활동 내용을 간단히 설명하세요"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">AI 캐릭터 대사</label>
                    <input
                      type="text"
                      value={lessonPlan.introduction.aiCharacterLine}
                      onChange={(e) => updateNestedField('introduction', 'aiCharacterLine', e.target.value)}
                      placeholder="AI 캐릭터가 말할 내용"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">미디어 링크 (선택)</label>
                    <div className="flex">
                      <input
                        type="url"
                        value={lessonPlan.introduction.mediaUrl}
                        onChange={(e) => updateNestedField('introduction', 'mediaUrl', e.target.value)}
                        placeholder="동영상 또는 이미지 URL"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors">
                        <Upload className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Development */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-blue-600" />
                  전개 단계
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">시간 (분)</label>
                    <input
                      type="number"
                      value={lessonPlan.development.time}
                      onChange={(e) => updateNestedField('development', 'time', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="1"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">활동 내용</label>
                    <input
                      type="text"
                      value={lessonPlan.development.description}
                      onChange={(e) => updateNestedField('development', 'description', e.target.value)}
                      placeholder="전개 활동 내용을 간단히 설명하세요"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                {/* Differentiated Activities */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">수준별 차별화 활동</label>
                  <div className="flex space-x-1 mb-4">
                    {(['lower', 'medium', 'higher'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setActiveTab(level)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === level
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level === 'lower' ? '하 (Lower)' : level === 'medium' ? '중 (Medium)' : '상 (Higher)'}
                      </button>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">활동 내용</label>
                      <textarea
                        value={lessonPlan.development.activities.find(a => a.level === activeTab)?.activity || ''}
                        onChange={(e) => updateActivity(activeTab, 'activity', e.target.value)}
                        placeholder={`${activeTab === 'lower' ? '하' : activeTab === 'medium' ? '중' : '상'}위권 학생용 활동을 설명하세요`}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">준비물</label>
                      <input
                        type="text"
                        value={lessonPlan.development.activities.find(a => a.level === activeTab)?.materials || ''}
                        onChange={(e) => updateActivity(activeTab, 'materials', e.target.value)}
                        placeholder="필요한 준비물을 입력하세요"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Closure */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-purple-600" />
                  정리 단계
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">시간 (분)</label>
                    <input
                      type="number"
                      value={lessonPlan.closure.time}
                      onChange={(e) => updateNestedField('closure', 'time', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="1"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">활동 내용</label>
                    <input
                      type="text"
                      value={lessonPlan.closure.description}
                      onChange={(e) => updateNestedField('closure', 'description', e.target.value)}
                      placeholder="정리 활동 내용을 간단히 설명하세요"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={lessonPlan.closure.hasQuiz}
                      onChange={(e) => updateNestedField('closure', 'hasQuiz', e.target.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">즉석 퀴즈 활성화</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quiz Section */}
        {lessonPlan.closure.hasQuiz && (
          <div className="bg-white rounded-lg shadow-sm">
            <div 
              className="p-6 border-b border-gray-200 cursor-pointer flex items-center justify-between"
              onClick={() => toggleSection('quiz')}
            >
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900">즉석 퀴즈 (5문항, 자동 채점)</h2>
                <span className="text-sm text-gray-500">({lessonPlan.quiz.length}/5)</span>
              </div>
              {expandedSections.quiz ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </div>
            
            {expandedSections.quiz && (
              <div className="p-6 space-y-4">
                {lessonPlan.quiz.map((question, index) => (
                  <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-md font-medium text-gray-900">문제 {index + 1}</h4>
                      <button
                        onClick={() => removeQuizQuestion(question.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">질문</label>
                        <textarea
                          value={question.question}
                          onChange={(e) => updateQuizQuestion(question.id, 'question', e.target.value)}
                          placeholder="질문을 입력하세요"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {question.choices?.map((choice, choiceIndex) => (
                          <div key={choiceIndex}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              선택지 {String.fromCharCode(65 + choiceIndex)}
                              {question.correctAnswer === String.fromCharCode(65 + choiceIndex) && (
                                <span className="text-green-600 ml-1">✓ 정답</span>
                              )}
                            </label>
                            <input
                              type="text"
                              value={choice}
                              onChange={(e) => {
                                const newChoices = [...(question.choices || [])];
                                newChoices[choiceIndex] = e.target.value;
                                updateQuizQuestion(question.id, 'choices', newChoices);
                              }}
                              placeholder={`선택지 ${String.fromCharCode(65 + choiceIndex)}`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">정답</label>
                          <select
                            value={question.correctAnswer}
                            onChange={(e) => updateQuizQuestion(question.id, 'correctAnswer', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">해설</label>
                          <input
                            type="text"
                            value={question.explanation}
                            onChange={(e) => updateQuizQuestion(question.id, 'explanation', e.target.value)}
                            placeholder="정답 해설을 입력하세요"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {lessonPlan.quiz.length < 5 && (
                  <button
                    onClick={addQuizQuestion}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>문제 추가 ({lessonPlan.quiz.length}/5)</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Rewards Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div 
            className="p-6 border-b border-gray-200 cursor-pointer flex items-center justify-between"
            onClick={() => toggleSection('rewards')}
          >
            <div className="flex items-center space-x-3">
              <Award className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900">보상 설정</h2>
            </div>
            {expandedSections.rewards ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
          
          {expandedSections.rewards && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">포인트</label>
                  <input
                    type="number"
                    value={lessonPlan.rewards.points}
                    onChange={(e) => updateNestedField('rewards', 'points', parseInt(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">뱃지 (선택)</label>
                  <select
                    value={lessonPlan.rewards.badge}
                    onChange={(e) => updateNestedField('rewards', 'badge', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">선택하세요</option>
                    {badges.map(badge => (
                      <option key={badge} value={badge}>{badge}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">캐릭터 칭찬 메시지</label>
                <textarea
                  value={lessonPlan.rewards.characterPraise}
                  onChange={(e) => updateNestedField('rewards', 'characterPraise', e.target.value)}
                  placeholder="학생들에게 보여줄 캐릭터의 격려 메시지를 입력하세요"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Publishing Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">게시 설정</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">공개 범위</label>
              <div className="flex space-x-4">
                {([
                  { value: 'private', label: '비공개' },
                  { value: 'school', label: '학교 내 공유' },
                  { value: 'public', label: '공개' }
                ] as const).map(option => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="visibility"
                      value={option.value}
                      checked={lessonPlan.visibility === option.value}
                      onChange={(e) => updateLessonPlan('visibility', e.target.value)}
                      className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">태그</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {lessonPlan.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary text-white">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-red-200"
                    >
                      <XCircle className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  placeholder="태그를 입력하고 엔터를 누르세요"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  추가
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <button className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            임시저장
          </button>
          <button className="px-6 py-3 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>미리보기</span>
          </button>
          <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>지도안 게시</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LessonPlanCreation;