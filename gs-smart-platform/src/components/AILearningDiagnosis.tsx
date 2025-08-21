import { useState } from 'react';
import { Brain, TrendingUp, AlertCircle, CheckCircle, Target, BookOpen } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface DiagnosisResult {
  subject: string;
  score: number;
  weakness: string[];
  recommendations: string[];
}

const AILearningDiagnosis = ({ studentId }: { studentId: string }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisComplete, setDiagnosisComplete] = useState(false);
  
  const [results] = useState<DiagnosisResult[]>([
    {
      subject: '수학',
      score: 85,
      weakness: ['분수의 나눗셈', '도형의 넓이'],
      recommendations: ['분수 계산 집중 학습', '도형 문제 추가 연습']
    },
    {
      subject: '영어',
      score: 72,
      weakness: ['문법 - 현재완료', '어휘력'],
      recommendations: ['문법 기초 다지기', '매일 10개 단어 암기']
    },
    {
      subject: '국어',
      score: 88,
      weakness: ['논설문 독해'],
      recommendations: ['논설문 구조 파악 연습', '주제 찾기 훈련']
    },
    {
      subject: '과학',
      score: 80,
      weakness: ['전기와 자기', '태양계'],
      recommendations: ['실험 영상 학습', '개념 정리 노트 작성']
    },
    {
      subject: '사회',
      score: 76,
      weakness: ['조선시대 정치', '경제 용어'],
      recommendations: ['역사 연표 정리', '경제 기초 개념 학습']
    }
  ]);

  const radarData = results.map(r => ({
    subject: r.subject,
    score: r.score,
    fullMark: 100
  }));

  const runDiagnosis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setDiagnosisComplete(true);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-blue-500" />
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI 학습 진단 시스템</h2>
            <p className="text-sm text-gray-600">개인 맞춤형 학습 분석 및 추천</p>
          </div>
        </div>
        {!diagnosisComplete && (
          <button
            onClick={runDiagnosis}
            disabled={isAnalyzing}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isAnalyzing 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isAnalyzing ? '분석 중...' : 'AI 진단 시작'}
          </button>
        )}
      </div>

      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-pulse space-y-4 text-center">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-blue-500 animate-pulse" />
            </div>
            <p className="text-gray-600">AI가 학습 데이터를 분석하고 있습니다...</p>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      {diagnosisComplete && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">종합 학습 프로필</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="점수" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">과목별 진단 결과</h3>
              <div className="space-y-3">
                {results.map((result) => (
                  <div key={result.subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">{result.subject}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              result.score >= 85 ? 'bg-green-500' : 
                              result.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${result.score}%` }}
                          />
                        </div>
                      </div>
                      <span className={`font-bold ${getScoreColor(result.score)}`}>
                        {result.score}점
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">상세 분석 및 추천</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((result) => (
                <div key={result.subject} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{result.subject}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBg(result.score)} ${getScoreColor(result.score)}`}>
                      {result.score >= 85 ? '우수' : result.score >= 70 ? '보통' : '보충필요'}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">취약 영역</span>
                      </div>
                      <ul className="space-y-1">
                        {result.weakness.map((weak, idx) => (
                          <li key={idx} className="text-xs text-gray-600 pl-6">• {weak}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">학습 추천</span>
                      </div>
                      <ul className="space-y-1">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-xs text-gray-600 pl-6">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">AI 맞춤 학습 계획 생성 완료</h3>
                <p className="text-sm text-gray-600 mb-4">
                  분석 결과를 바탕으로 다음 4주간의 맞춤형 학습 계획이 생성되었습니다.
                </p>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                    학습 계획 확인
                  </button>
                  <button className="px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    리포트 다운로드
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AILearningDiagnosis;