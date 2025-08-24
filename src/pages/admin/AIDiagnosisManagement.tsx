import Layout from '../../components/common/Layout';
import { Brain, Settings, TrendingUp, AlertCircle, CheckCircle, RefreshCw, BarChart, Users } from 'lucide-react';
import { useState } from 'react';

const AIDiagnosisManagement = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-4');

  const aiModels = [
    { id: 'gpt-4', name: 'GPT-4', status: 'active', accuracy: 94, usage: 1234 },
    { id: 'claude', name: 'Claude', status: 'active', accuracy: 92, usage: 987 },
    { id: 'gemini', name: 'Gemini', status: 'testing', accuracy: 89, usage: 456 },
  ];

  const diagnosisRecords = [
    {
      id: 1,
      studentName: '김민준',
      date: '2024-01-25',
      type: '학습 스타일 분석',
      model: 'GPT-4',
      result: '시각적 학습자',
      confidence: 92,
      recommendations: ['동영상 학습 자료 활용', '다이어그램 중심 설명', '마인드맵 활용']
    },
    {
      id: 2,
      studentName: '이서연',
      date: '2024-01-24',
      type: '취약 과목 진단',
      model: 'Claude',
      result: '수학 기초 부족',
      confidence: 88,
      recommendations: ['기초 연산 강화', '단계별 학습', '반복 훈련']
    },
    {
      id: 3,
      studentName: '박지호',
      date: '2024-01-23',
      type: '진로 적성 검사',
      model: 'GPT-4',
      result: '공학/기술 분야',
      confidence: 85,
      recommendations: ['코딩 교육 강화', 'STEM 프로그램 참여', '과학 실험 활동']
    }
  ];

  const performanceMetrics = [
    { metric: '일일 진단 건수', value: 156, change: '+12%' },
    { metric: '평균 정확도', value: '91.5%', change: '+2.3%' },
    { metric: '처리 시간', value: '3.2초', change: '-0.5초' },
    { metric: '만족도', value: '4.6/5.0', change: '+0.2' }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">AI 진단 관리</h2>
            <p className="text-gray-600 mt-1">AI 학습 진단 시스템 관리 및 모니터링</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <RefreshCw className="w-4 h-4" />
              <span>모델 업데이트</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Settings className="w-4 h-4" />
              <span>설정</span>
            </button>
          </div>
        </div>

        {/* 성능 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-sm text-gray-600 mb-2">{metric.metric}</h3>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <span className={`text-sm ${
                  metric.change.startsWith('+') ? 'text-green-600' : 
                  metric.change.startsWith('-') && !metric.metric.includes('시간') ? 'text-red-600' : 
                  'text-green-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI 모델 상태 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">AI 모델 상태</h3>
            <div className="space-y-4">
              {aiModels.map((model) => (
                <div key={model.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Brain className="w-6 h-6 text-purple-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">{model.name}</h4>
                        <p className="text-sm text-gray-600">모델 ID: {model.id}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      model.status === 'active' ? 'bg-green-100 text-green-700' : 
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {model.status === 'active' ? '활성' : '테스트중'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">정확도</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${model.accuracy}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{model.accuracy}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">오늘 사용</p>
                      <p className="text-sm font-medium">{model.usage}회</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 진단 유형별 통계 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">진단 유형별 분포</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BarChart className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-gray-900">학습 스타일 분석</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">456건</p>
                  <p className="text-xs text-gray-500">35%</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-900">취약 과목 진단</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">389건</p>
                  <p className="text-xs text-gray-500">30%</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-900">진로 적성 검사</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">312건</p>
                  <p className="text-xs text-gray-500">24%</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium text-gray-900">학습 부진 예측</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">143건</p>
                  <p className="text-xs text-gray-500">11%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 최근 진단 기록 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">최근 진단 기록</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">학생</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">날짜</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">진단 유형</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">AI 모델</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">결과</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">신뢰도</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">추천사항</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {diagnosisRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{record.studentName}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{record.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{record.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{record.model}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{record.result}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              record.confidence >= 90 ? 'bg-green-500' :
                              record.confidence >= 80 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${record.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm">{record.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        보기 ({record.recommendations.length})
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI 설정 패널 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-4">AI 진단 설정</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">기본 모델</h4>
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 bg-white/20 rounded text-white placeholder-white/70 focus:outline-none focus:bg-white/30"
              >
                {aiModels.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">최소 신뢰도</h4>
              <input
                type="range"
                min="70"
                max="95"
                defaultValue="85"
                className="w-full"
              />
              <p className="text-sm text-white/80 mt-1">85%</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">자동 재진단</h4>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">30일마다 자동 실행</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIDiagnosisManagement;