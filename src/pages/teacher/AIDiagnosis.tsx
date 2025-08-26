import Layout from '../../components/common/Layout';
import { useState } from 'react';
import { 
  Brain, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Star, 
  FileText, BarChart3, Users, Clock, Target, Award, BookOpen, 
  ChevronRight, Eye, MessageSquare, Download, Filter, Search
} from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AIDiagnosis = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const students = [
    {
      id: 1,
      name: '김민준',
      grade: '5학년',
      overallLevel: 'A',
      weaknessLevel: 'C',
      improvementRate: '+15%',
      lastDiagnosis: '2025-01-23',
      subjects: {
        '수학': { level: 'A', accuracy: 92, studyTime: 180, improvement: '+8%' },
        '영어': { level: 'B', accuracy: 85, studyTime: 120, improvement: '+5%' },
        '국어': { level: 'C', accuracy: 75, studyTime: 90, improvement: '-2%' },
        '과학': { level: 'B', accuracy: 88, studyTime: 150, improvement: '+12%' },
        'AI/코딩': { level: 'A', accuracy: 95, studyTime: 200, improvement: '+20%' }
      },
      weakAreas: ['국어 문법', '영어 듣기', '과학 화학'],
      strengths: ['수학 문제해결', 'AI 논리적 사고', '과학 실험'],
      recommendedContent: [
        { subject: '국어', title: '문법의 기초', type: 'video', duration: 25 },
        { subject: '영어', title: 'Listening Skills', type: 'audio', duration: 20 },
        { subject: '과학', title: '화학반응의 이해', type: 'interactive', duration: 30 }
      ],
      learningPattern: {
        peakTime: '오후 3-5시',
        preferredType: '동영상 강의',
        attentionSpan: '25분',
        difficulty: '중급-고급'
      }
    },
    {
      id: 2,
      name: '이서연',
      grade: '5학년',
      overallLevel: 'B',
      weaknessLevel: 'B',
      improvementRate: '+8%',
      lastDiagnosis: '2025-01-22',
      subjects: {
        '수학': { level: 'C', accuracy: 72, studyTime: 100, improvement: '+3%' },
        '영어': { level: 'A', accuracy: 94, studyTime: 180, improvement: '+10%' },
        '국어': { level: 'A', accuracy: 91, studyTime: 160, improvement: '+7%' },
        '과학': { level: 'B', accuracy: 83, studyTime: 120, improvement: '+5%' },
        'AI/코딩': { level: 'B', accuracy: 78, studyTime: 80, improvement: '+15%' }
      },
      weakAreas: ['수학 기하', 'AI 알고리즘', '과학 물리'],
      strengths: ['영어 회화', '국어 독해', '창의적 글쓰기'],
      recommendedContent: [
        { subject: '수학', title: '기하의 기본 원리', type: 'interactive', duration: 35 },
        { subject: 'AI', title: 'Algorithm Basics', type: 'coding', duration: 40 },
        { subject: '과학', title: '물리학 입문', type: 'experiment', duration: 30 }
      ],
      learningPattern: {
        peakTime: '오전 10-12시',
        preferredType: '텍스트 + 그림',
        attentionSpan: '30분',
        difficulty: '중급'
      }
    }
  ];

  const overallStats = {
    totalAnalyzed: 24,
    averageImprovement: '+12%',
    atRiskStudents: 3,
    topPerformers: 8,
    lastUpdate: '2025-01-24 09:30'
  };

  const subjectAnalysis = [
    { subject: '수학', avgLevel: 'B', improvement: '+8%', students: 24 },
    { subject: '영어', avgLevel: 'B+', improvement: '+12%', students: 24 },
    { subject: '국어', avgLevel: 'B', improvement: '+5%', students: 24 },
    { subject: '과학', avgLevel: 'B-', improvement: '+10%', students: 24 },
    { subject: 'AI/코딩', avgLevel: 'A-', improvement: '+18%', students: 20 }
  ];

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'A': return 'text-green-600 bg-green-100';
      case 'B': return 'text-blue-600 bg-blue-100';
      case 'C': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRadarData = (student: any) => [
    { subject: '수학', level: student.subjects['수학'].accuracy },
    { subject: '영어', level: student.subjects['영어'].accuracy },
    { subject: '국어', level: student.subjects['국어'].accuracy },
    { subject: '과학', level: student.subjects['과학'].accuracy },
    { subject: 'AI', level: student.subjects['AI/코딩'].accuracy }
  ];

  const selectedStudentData = selectedStudent ? students.find(s => s.id.toString() === selectedStudent) : null;

  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">AI 학습 진단</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">인공지능 기반 학생 학습 수준 분석 및 개인별 맞춤 추천</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="text-xs text-gray-500">
              마지막 업데이트: {overallStats.lastUpdate}
            </div>
            <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm sm:text-base">
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">새 진단 실행</span>
              <span className="sm:hidden">진단</span>
            </button>
          </div>
        </div>

        {/* 전체 통계 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
            <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2 sm:mb-3 bg-blue-100 rounded-lg">
              <Users className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{overallStats.totalAnalyzed}</div>
            <div className="text-xs sm:text-sm text-gray-600">분석 완료</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
            <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2 sm:mb-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{overallStats.averageImprovement}</div>
            <div className="text-xs sm:text-sm text-gray-600">평균 향상도</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
            <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2 sm:mb-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 sm:w-6 h-5 sm:h-6 text-red-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-red-600">{overallStats.atRiskStudents}</div>
            <div className="text-xs sm:text-sm text-gray-600">위험군 학생</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
            <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2 sm:mb-3 bg-yellow-100 rounded-lg">
              <Star className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{overallStats.topPerformers}</div>
            <div className="text-xs sm:text-sm text-gray-600">우수 학생</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center col-span-2 sm:col-span-1">
            <div className="flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-2 sm:mb-3 bg-purple-100 rounded-lg">
              <Brain className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-600">AI</div>
            <div className="text-xs sm:text-sm text-gray-600">분석 엔진</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* 과목별 분석 */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">과목별 학습 수준 분석</h3>
              <div className="space-y-3">
                {subjectAnalysis.map((subject, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm sm:text-base text-gray-900">{subject.subject}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{subject.students}명 분석</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getLevelColor(subject.avgLevel.charAt(0))}`}>
                        <span className="hidden sm:inline">평균</span> {subject.avgLevel}
                      </div>
                      <div className="text-xs sm:text-sm text-green-600 font-medium mt-0.5 sm:mt-1">{subject.improvement}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 학생별 진단 결과 */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">개별 학생 진단 결과</h3>
                <div className="flex gap-2">
                  <select className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm">
                    <option>전체 학년</option>
                    <option>5학년</option>
                    <option>6학년</option>
                  </select>
                  <button
                    onClick={() => setShowRecommendations(!showRecommendations)}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      showRecommendations ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    추천 보기
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                          {student.name[0]}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{student.name}</h4>
                          <p className="text-sm text-gray-600">{student.grade}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(student.overallLevel)}`}>
                            종합 {student.overallLevel}
                          </div>
                          <div className="text-xs text-green-600 font-medium mt-1">{student.improvementRate}</div>
                        </div>
                        <button 
                          onClick={() => setSelectedStudent(student.id.toString())}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                        >
                          상세보기
                        </button>
                      </div>
                    </div>

                    {/* 과목별 간단 표시 - 모바일에서는 숨김 */}
                    <div className="hidden sm:grid grid-cols-5 gap-2 mb-3">
                      {Object.entries(student.subjects).map(([subject, data]) => (
                        <div key={subject} className="text-center">
                          <div className="text-xs text-gray-600 mb-1">{subject}</div>
                          <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getLevelColor(data.level)}`}>
                            {data.level}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 약점 영역 */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-gray-600">약점 영역: </span>
                        <span className="text-sm text-red-600 font-medium">
                          {student.weakAreas.slice(0, 2).join(', ')}
                          {student.weakAreas.length > 2 && ` 외 ${student.weakAreas.length - 2}개`}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        마지막 진단: {student.lastDiagnosis}
                      </div>
                    </div>

                    {/* 추천 콘텐츠 (토글) */}
                    {showRecommendations && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">AI 추천 학습 콘텐츠</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {student.recommendedContent.map((content, idx) => (
                            <div key={idx} className="p-3 bg-blue-50 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium text-blue-700">{content.subject}</span>
                                <span className="text-xs text-blue-600">{content.duration}분</span>
                              </div>
                              <p className="text-sm text-gray-800 font-medium">{content.title}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className={`text-xs px-2 py-0.5 rounded ${
                                  content.type === 'video' ? 'bg-red-100 text-red-700' :
                                  content.type === 'audio' ? 'bg-green-100 text-green-700' :
                                  content.type === 'interactive' ? 'bg-purple-100 text-purple-700' :
                                  'bg-orange-100 text-orange-700'
                                }`}>
                                  {content.type}
                                </span>
                                <button className="text-xs text-blue-600 hover:text-blue-800">추천하기</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드바 - 모바일에서는 하단에 표시 */}
          <div className="space-y-4 sm:space-y-6">
            {/* AI 추천 액션 */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg shadow-md p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg font-bold">AI 추천 액션</h3>
                <Brain className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-white bg-opacity-10 rounded-lg">
                  <p className="font-medium">즉시 개입 필요</p>
                  <p className="text-sm opacity-90 mt-1">박지호 - 수학 기초 개념 부족</p>
                  <button className="mt-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded">액션 계획</button>
                </div>
                <div className="p-3 bg-white bg-opacity-10 rounded-lg">
                  <p className="font-medium">심화 과정 추천</p>
                  <p className="text-sm opacity-90 mt-1">김민준 - AI/코딩 영재 과정</p>
                  <button className="mt-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded">과정 신청</button>
                </div>
                <div className="p-3 bg-white bg-opacity-10 rounded-lg">
                  <p className="font-medium">학부모 상담 권장</p>
                  <p className="text-sm opacity-90 mt-1">3명의 학생 진도 논의</p>
                  <button className="mt-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded">상담 예약</button>
                </div>
              </div>
            </div>

            {/* 진단 보고서 생성 */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">리포트 생성</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="individual" className="rounded" defaultChecked />
                  <label htmlFor="individual" className="text-sm text-gray-700">개별 학생 리포트</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="class" className="rounded" defaultChecked />
                  <label htmlFor="class" className="text-sm text-gray-700">학급 종합 리포트</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="parent" className="rounded" />
                  <label htmlFor="parent" className="text-sm text-gray-700">학부모용 리포트</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="trend" className="rounded" />
                  <label htmlFor="trend" className="text-sm text-gray-700">추세 분석</label>
                </div>
                <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>리포트 생성</span>
                </button>
              </div>
            </div>

            {/* 빠른 통계 */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">이주간 하이라이트</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">가장 많이 향상된 과목</span>
                  <span className="text-sm font-medium text-green-600">AI/코딩 (+18%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">주의 필요 영역</span>
                  <span className="text-sm font-medium text-red-600">국어 문법</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">평균 학습시간</span>
                  <span className="text-sm font-medium text-blue-600">142분/일</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI 추천 정확도</span>
                  <span className="text-sm font-medium text-purple-600">94.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 학생 상세 모달 */}
        {selectedStudentData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-lg font-medium text-blue-600">
                      {selectedStudentData.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedStudentData.name}</h3>
                      <p className="text-gray-600">{selectedStudentData.grade} - AI 학습 진단</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 레이더 차트 */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">과목별 성취도 분포</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <RadarChart data={getRadarData(selectedStudentData)}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="성취도" dataKey="level" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 학습 패턴 */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">개인별 학습 패턴</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">최적 학습 시간</span>
                        <span className="text-sm font-medium">{selectedStudentData.learningPattern.peakTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">선호 학습 방식</span>
                        <span className="text-sm font-medium">{selectedStudentData.learningPattern.preferredType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">집중 지속 시간</span>
                        <span className="text-sm font-medium">{selectedStudentData.learningPattern.attentionSpan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">적정 난이도</span>
                        <span className="text-sm font-medium">{selectedStudentData.learningPattern.difficulty}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 강점 영역 */}
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-3">강점 영역</h4>
                    <div className="space-y-2">
                      {selectedStudentData.strengths.map((strength, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-700">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 약점 영역 */}
                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-3">보완 필요 영역</h4>
                    <div className="space-y-2">
                      {selectedStudentData.weakAreas.map((weakness, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-gray-700">{weakness}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 맞춤 추천 */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-4">AI 맞춤 학습 추천</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedStudentData.recommendedContent.map((content, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-700">{content.subject}</span>
                          <span className="text-xs text-gray-500">{content.duration}분</span>
                        </div>
                        <h5 className="font-medium text-gray-900 mb-2">{content.title}</h5>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded ${
                            content.type === 'video' ? 'bg-red-100 text-red-700' :
                            content.type === 'audio' ? 'bg-green-100 text-green-700' :
                            content.type === 'interactive' ? 'bg-purple-100 text-purple-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {content.type}
                          </span>
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            추천하기
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AIDiagnosis;