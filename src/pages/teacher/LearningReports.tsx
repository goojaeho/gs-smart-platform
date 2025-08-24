import Layout from '../../components/common/Layout';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { FileText, Download, TrendingUp, Users, Award, AlertTriangle, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';

const LearningReports = () => {
  const [selectedClass, setSelectedClass] = useState('5-3');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const classPerformance = [
    { subject: '국어', average: 78, highest: 95, lowest: 62 },
    { subject: '영어', average: 82, highest: 98, lowest: 65 },
    { subject: '수학', average: 85, highest: 100, lowest: 68 },
    { subject: '과학', average: 80, highest: 96, lowest: 64 },
    { subject: '사회', average: 76, highest: 92, lowest: 60 },
    { subject: 'AI/코딩', average: 88, highest: 100, lowest: 70 },
  ];

  const weeklyProgress = [
    { week: '1주', average: 75, participation: 85 },
    { week: '2주', average: 78, participation: 88 },
    { week: '3주', average: 82, participation: 92 },
    { week: '4주', average: 85, participation: 90 },
  ];

  const studentRankings = [
    { rank: 1, name: '최유나', score: 95, change: 'up', previousRank: 2 },
    { rank: 2, name: '김민준', score: 92, change: 'down', previousRank: 1 },
    { rank: 3, name: '이서연', score: 88, change: 'same', previousRank: 3 },
    { rank: 4, name: '박지호', score: 85, change: 'up', previousRank: 6 },
    { rank: 5, name: '정현우', score: 82, change: 'down', previousRank: 4 },
  ];

  const skillsAnalysis = [
    { skill: '문제해결', value: 85 },
    { skill: '창의력', value: 78 },
    { skill: '협업', value: 82 },
    { skill: '의사소통', value: 75 },
    { skill: '비판적사고', value: 80 },
    { skill: '디지털역량', value: 90 },
  ];

  const needsAttention = [
    { name: '정현우', issue: '출석률 저하', severity: 'high', attendance: '65%' },
    { name: '박지호', issue: '과제 미제출', severity: 'medium', missedAssignments: 3 },
    { name: '이민수', issue: '성적 하락', severity: 'high', decline: '-15%' },
  ];

  const getRankChangeIcon = (change: string, previousRank: number, currentRank: number) => {
    if (change === 'up') {
      return <span className="text-green-600 text-xs">↑ {previousRank - currentRank}</span>;
    } else if (change === 'down') {
      return <span className="text-red-600 text-xs">↓ {currentRank - previousRank}</span>;
    }
    return <span className="text-gray-500 text-xs">-</span>;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">학습 리포트</h2>
            <p className="text-gray-600 mt-1">학급별 학습 성과 분석</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="5-3">5학년 3반</option>
              <option value="5-1">5학년 1반</option>
              <option value="6-2">6학년 2반</option>
            </select>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">주간</option>
              <option value="month">월간</option>
              <option value="quarter">분기</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Download className="w-4 h-4" />
              <span>리포트 다운로드</span>
            </button>
          </div>
        </div>

        {/* 핵심 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-green-600">+2명</span>
            </div>
            <h3 className="text-sm text-gray-600">전체 학생</h3>
            <p className="text-2xl font-bold text-gray-900">28명</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-sm text-green-600">+5%</span>
            </div>
            <h3 className="text-sm text-gray-600">평균 성취도</h3>
            <p className="text-2xl font-bold text-gray-900">82.5%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-purple-500" />
              <span className="text-sm text-green-600">+12개</span>
            </div>
            <h3 className="text-sm text-gray-600">획득 배지</h3>
            <p className="text-2xl font-bold text-gray-900">156개</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
              <span className="text-sm text-red-600">3명</span>
            </div>
            <h3 className="text-sm text-gray-600">관리 필요</h3>
            <p className="text-2xl font-bold text-gray-900">10.7%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 과목별 성취도 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">과목별 성취도 분석</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" fill="#3b82f6" name="평균" />
                <Bar dataKey="highest" fill="#22c55e" name="최고" />
                <Bar dataKey="lowest" fill="#ef4444" name="최저" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 주간 진도 추이 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">주간 학습 추이</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} name="평균 성취도" />
                <Line type="monotone" dataKey="participation" stroke="#22c55e" strokeWidth={2} name="참여율" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 학생 순위 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">상위 학생</h3>
            <div className="space-y-3">
              {studentRankings.map((student) => (
                <div key={student.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      student.rank === 1 ? 'bg-yellow-500' :
                      student.rank === 2 ? 'bg-gray-400' :
                      student.rank === 3 ? 'bg-orange-600' :
                      'bg-gray-300'
                    }`}>
                      {student.rank}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.score}점</p>
                    </div>
                  </div>
                  {getRankChangeIcon(student.change, student.previousRank, student.rank)}
                </div>
              ))}
            </div>
          </div>

          {/* 역량 분석 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">핵심 역량 분석</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={skillsAnalysis}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="역량" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 관리 필요 학생 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">관리 필요 학생</h3>
            <div className="space-y-3">
              {needsAttention.map((student, idx) => (
                <div key={idx} className={`p-3 rounded-lg border-l-4 ${
                  student.severity === 'high' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.issue}</p>
                    </div>
                    <span className={`text-xs font-medium ${
                      student.severity === 'high' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {student.attendance || student.missedAssignments || student.decline}
                    </span>
                  </div>
                </div>
              ))}
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium mt-2">
                전체 목록 보기 →
              </button>
            </div>
          </div>
        </div>

        {/* AI 분석 및 권장사항 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">AI 분석 및 권장사항</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">강점 분야</h4>
              <p className="text-sm text-white/90">
                AI/코딩 과목에서 탁월한 성과를 보이고 있으며, 
                디지털 역량이 학년 평균 대비 15% 높습니다.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">개선 필요</h4>
              <p className="text-sm text-white/90">
                국어와 사회 과목의 평균 성취도가 낮습니다. 
                독서 프로그램 강화를 권장합니다.
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">다음 주 집중 사항</h4>
              <p className="text-sm text-white/90">
                3명의 학생이 지속적인 출석률 저하를 보입니다. 
                개별 상담이 필요합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearningReports;