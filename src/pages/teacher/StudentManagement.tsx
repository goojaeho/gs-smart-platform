import Layout from '../../components/common/Layout';
import { Users, Search, Filter, TrendingUp, TrendingDown, AlertCircle, Award, BookOpen, Clock, MoreVertical, Eye, MessageSquare, FileText } from 'lucide-react';
import { useState } from 'react';
import { students } from '../../data/mockData';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const managedStudents = [
    {
      id: 1,
      name: '김민준',
      grade: '5학년',
      class: '3반',
      profileImage: '👦',
      subjects: ['수학', '영어', 'AI/코딩'],
      overallProgress: 85,
      weeklyStudyHours: 12.5,
      trend: 'up',
      trendValue: '+5%',
      lastActive: '2시간 전',
      status: 'active',
      achievements: ['수학 마스터', 'Python 입문', '주간 목표 달성'],
      weakSubjects: ['국어'],
      parentContact: '010-1234-5678',
      notes: '수학 재능이 뛰어남. 심화 학습 권장.'
    },
    {
      id: 2,
      name: '이서연',
      grade: '5학년',
      class: '3반',
      profileImage: '👧',
      subjects: ['국어', '영어', '과학'],
      overallProgress: 78,
      weeklyStudyHours: 10.2,
      trend: 'up',
      trendValue: '+3%',
      lastActive: '1일 전',
      status: 'active',
      achievements: ['영어 스피킹 우수', '독서왕'],
      weakSubjects: ['수학'],
      parentContact: '010-2345-6789',
      notes: '언어 능력이 우수. 수학 기초 보강 필요.'
    },
    {
      id: 3,
      name: '박지호',
      grade: '6학년',
      class: '2반',
      profileImage: '👦',
      subjects: ['수학', '과학', '사회'],
      overallProgress: 72,
      weeklyStudyHours: 8.5,
      trend: 'down',
      trendValue: '-2%',
      lastActive: '3일 전',
      status: 'warning',
      achievements: ['과학 실험왕'],
      weakSubjects: ['영어', '국어'],
      parentContact: '010-3456-7890',
      notes: '최근 학습 참여율 저하. 동기부여 필요.'
    },
    {
      id: 4,
      name: '최유나',
      grade: '6학년',
      class: '2반',
      profileImage: '👧',
      subjects: ['국어', '수학', 'AI/코딩'],
      overallProgress: 92,
      weeklyStudyHours: 15.3,
      trend: 'up',
      trendValue: '+8%',
      lastActive: '30분 전',
      status: 'excellent',
      achievements: ['전과목 우수', 'AI 프로젝트 우승', '멘토링 우수상'],
      weakSubjects: [],
      parentContact: '010-4567-8901',
      notes: '전반적으로 우수. 영재교육 프로그램 추천.'
    },
    {
      id: 5,
      name: '정현우',
      grade: '5학년',
      class: '1반',
      profileImage: '👦',
      subjects: ['영어', '사회', '과학'],
      overallProgress: 65,
      weeklyStudyHours: 7.2,
      trend: 'same',
      trendValue: '0%',
      lastActive: '5일 전',
      status: 'inactive',
      achievements: [],
      weakSubjects: ['수학', 'AI/코딩'],
      parentContact: '010-5678-9012',
      notes: '학습 동기 부족. 학부모 상담 필요.'
    }
  ];

  const filteredStudents = managedStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    return matchesSearch && matchesGrade && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'excellent': return 'bg-green-100 text-green-700';
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'excellent': return '우수';
      case 'active': return '활발';
      case 'warning': return '주의';
      case 'inactive': return '비활성';
      default: return status;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">학생 관리</h2>
            <p className="text-gray-600 mt-1">담당 학생 {managedStudents.length}명</p>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            학생 추가
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
                  placeholder="학생 이름 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 학년</option>
              <option value="5학년">5학년</option>
              <option value="6학년">6학년</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 상태</option>
              <option value="excellent">우수</option>
              <option value="active">활발</option>
              <option value="warning">주의</option>
              <option value="inactive">비활성</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>상세 필터</span>
            </button>
          </div>
        </div>

        {/* 학생 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{student.profileImage}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.grade} {student.class}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(student.status)}`}>
                    {getStatusLabel(student.status)}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 진도율 */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">전체 진도율</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-gray-900">{student.overallProgress}%</span>
                    {student.trend === 'up' ? (
                      <span className="flex items-center text-green-600 text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {student.trendValue}
                      </span>
                    ) : student.trend === 'down' ? (
                      <span className="flex items-center text-red-600 text-xs">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        {student.trendValue}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">{student.trendValue}</span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${student.overallProgress}%` }}
                  />
                </div>
              </div>

              {/* 학습 정보 */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">주간 학습시간</span>
                  <span className="font-medium text-gray-900">{student.weeklyStudyHours}시간</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">담당 과목</span>
                  <div className="flex flex-wrap gap-1">
                    {student.subjects.map((subject, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">마지막 접속</span>
                  <span className="text-gray-900">{student.lastActive}</span>
                </div>
              </div>

              {/* 취약 과목 알림 */}
              {student.weakSubjects.length > 0 && (
                <div className="mb-4 p-2 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span className="text-xs text-yellow-800">
                      보강 필요: {student.weakSubjects.join(', ')}
                    </span>
                  </div>
                </div>
              )}

              {/* 액션 버튼 */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedStudent(student)}
                  className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>상세보기</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 text-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span>메시지</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 text-sm">
                  <FileText className="w-4 h-4" />
                  <span>리포트</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 학생 상세 모달 */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{selectedStudent.profileImage}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h3>
                    <p className="text-gray-600">{selectedStudent.grade} {selectedStudent.class}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* 학습 성과 */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">학습 성과</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">전체 진도율</p>
                      <p className="text-xl font-bold text-gray-900">{selectedStudent.overallProgress}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">주간 학습시간</p>
                      <p className="text-xl font-bold text-gray-900">{selectedStudent.weeklyStudyHours}시간</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">현재 학습 단원</span>
                      <span className="font-medium">수학: 분수의 나눗셈</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">단원 진도율</span>
                      <span className="font-medium">75%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">문제풀이 진도율</span>
                      <span className="font-medium">82%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">완료한 학습</span>
                      <span className="font-medium">23/30 단원</span>
                    </div>
                  </div>
                </div>

                {/* 학생 질문 현황 */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">최근 질문내역</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">미답변 질문</span>
                      <span className="font-medium text-red-600">2개</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">이주 내 질문</span>
                      <span className="font-medium">7개</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      마지막 질문: "분수 나눗셈 계산 방법이 헷갈려요" (2시간 전)
                    </div>
                  </div>
                </div>
                
                {/* 멘토링 상태 */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">멘토링 현황</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">총 세션</p>
                      <p className="text-lg font-bold text-purple-600">12회</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">이주 세션</p>
                      <p className="text-lg font-bold text-purple-600">3회</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    다음 세션: 오늘 오후 3시 (수학 보강)
                  </div>
                </div>
                
                {/* 독서 진도 */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">독서 진도</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">이주 내 읽은 책</span>
                      <span className="font-medium">3권</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">이달 목표</span>
                      <span className="font-medium">6권 (50%)</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      현재 독서중: "어린왕자" (진도 65%)
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">획득 배지</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.achievements.map((achievement: string, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        🏆 {achievement}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">교사 노트</h4>
                  <p className="text-sm text-gray-700">{selectedStudent.notes}</p>
                </div>

                {/* 책 추천 */}
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">교사 추천 도서</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">"마당을 떠도는 행리"</span>
                      <button className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">추천</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">"수학의 새로운 발견"</span>
                      <button className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">추천</button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">학부모 연락처</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">{selectedStudent.parentContact}</p>
                    <button className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                      상담 신청
                    </button>
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

export default StudentManagement;