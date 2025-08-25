import { useState, useEffect } from 'react';
import Layout from '../../components/common/Layout';
import { Clock, ChevronRight, ChevronLeft, Check, X, RotateCcw, Target, Award, BookOpen } from 'lucide-react';

interface Problem {
  id: number;
  question: string;
  image?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface UserAnswer {
  problemId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

const ProblemSolving = () => {
  const [activeTab, setActiveTab] = useState<'solving' | 'results'>('solving');
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showOnlyIncorrect, setShowOnlyIncorrect] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Sample problems for Grade 3 Math
  const problems: Problem[] = [
    {
      id: 1,
      question: "진수는 사과 12개를 가지고 있었습니다. 친구들에게 4개를 나누어 주었습니다. 진수에게 남은 사과는 몇 개일까요?",
      options: ["6개", "8개", "9개", "16개"],
      correctAnswer: 1,
      explanation: "12개에서 4개를 빼면 12 - 4 = 8개입니다.",
      subject: "수학",
      difficulty: 'easy'
    },
    {
      id: 2,
      question: "다음 중 가장 큰 분수는 무엇인가요?",
      options: ["1/2", "1/3", "1/4", "1/5"],
      correctAnswer: 0,
      explanation: "분모가 작을수록 분수의 값이 큽니다. 따라서 1/2가 가장 큽니다.",
      subject: "수학",
      difficulty: 'medium'
    },
    {
      id: 3,
      question: "시계가 3시를 가리킬 때, 시침과 분침이 이루는 각도는 몇 도인가요?",
      options: ["60도", "90도", "120도", "180도"],
      correctAnswer: 1,
      explanation: "3시일 때 시침은 3을 가리키고 분침은 12를 가리킵니다. 시계에서 숫자 사이의 각도는 30도씩이므로, 3 × 30 = 90도입니다.",
      subject: "수학",
      difficulty: 'hard'
    },
    {
      id: 4,
      question: "5 × 7의 답은 무엇인가요?",
      options: ["28", "30", "35", "42"],
      correctAnswer: 2,
      explanation: "5 × 7 = 35입니다.",
      subject: "수학",
      difficulty: 'easy'
    },
    {
      id: 5,
      question: "다음 중 홀수는 무엇인가요?",
      options: ["12", "15", "18", "20"],
      correctAnswer: 1,
      explanation: "홀수는 2로 나누어 나머지가 1인 수입니다. 15 ÷ 2 = 7 나머지 1이므로 홀수입니다.",
      subject: "수학",
      difficulty: 'easy'
    },
    {
      id: 6,
      question: "직사각형의 둘레를 구하는 공식은 무엇인가요?",
      options: ["가로 × 세로", "2 × (가로 + 세로)", "가로 + 세로", "가로 × 세로 × 2"],
      correctAnswer: 1,
      explanation: "직사각형의 둘레는 2 × (가로 + 세로)입니다.",
      subject: "수학",
      difficulty: 'medium'
    },
    {
      id: 7,
      question: "100에서 47을 뺀 답은 무엇인가요?",
      options: ["43", "53", "63", "73"],
      correctAnswer: 1,
      explanation: "100 - 47 = 53입니다.",
      subject: "수학",
      difficulty: 'easy'
    },
    {
      id: 8,
      question: "2/4를 기약분수로 나타내면?",
      options: ["1/2", "2/3", "3/4", "4/2"],
      correctAnswer: 0,
      explanation: "2/4의 분자와 분모를 최대공약수 2로 나누면 1/2가 됩니다.",
      subject: "수학",
      difficulty: 'medium'
    },
    {
      id: 9,
      question: "다음 중 가장 작은 수는 무엇인가요?",
      options: ["0.7", "0.5", "0.9", "0.3"],
      correctAnswer: 3,
      explanation: "소수를 비교할 때 0.3이 가장 작습니다.",
      subject: "수학",
      difficulty: 'medium'
    },
    {
      id: 10,
      question: "정사각형의 한 변이 6cm일 때, 넓이는 몇 cm²인가요?",
      options: ["12 cm²", "24 cm²", "36 cm²", "48 cm²"],
      correctAnswer: 2,
      explanation: "정사각형의 넓이는 한 변 × 한 변 = 6 × 6 = 36 cm²입니다.",
      subject: "수학",
      difficulty: 'hard'
    }
  ];

  const currentProblem = problems[currentProblemIndex];
  const totalProblems = problems.length;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && activeTab === 'solving') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, activeTab]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    if (!isSubmitted) {
      setSelectedAnswer(answerIndex);
    }
  };

  // Submit current answer
  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === currentProblem.correctAnswer;
      const newAnswer: UserAnswer = {
        problemId: currentProblem.id,
        selectedAnswer,
        isCorrect
      };
      
      setUserAnswers(prev => [
        ...prev.filter(a => a.problemId !== currentProblem.id),
        newAnswer
      ]);
      setIsSubmitted(true);
    }
  };

  // Navigate to next problem
  const handleNext = () => {
    if (currentProblemIndex < totalProblems - 1) {
      setCurrentProblemIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      
      // Check if there's already an answer for the next problem
      const existingAnswer = userAnswers.find(a => a.problemId === problems[currentProblemIndex + 1].id);
      if (existingAnswer) {
        setSelectedAnswer(existingAnswer.selectedAnswer);
        setIsSubmitted(true);
      }
    }
  };

  // Navigate to previous problem
  const handlePrevious = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      
      // Check if there's already an answer for the previous problem
      const existingAnswer = userAnswers.find(a => a.problemId === problems[currentProblemIndex - 1].id);
      if (existingAnswer) {
        setSelectedAnswer(existingAnswer.selectedAnswer);
        setIsSubmitted(true);
      }
    }
  };

  // Finish the test and go to results
  const handleFinish = () => {
    setIsTimerRunning(false);
    setActiveTab('results');
  };

  // Calculate results
  const correctCount = userAnswers.filter(a => a.isCorrect).length;
  const totalAnswered = userAnswers.length;
  const percentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // Filter results for display
  const getFilteredResults = () => {
    if (showOnlyIncorrect) {
      return problems.filter(problem => {
        const userAnswer = userAnswers.find(a => a.problemId === problem.id);
        return userAnswer && !userAnswer.isCorrect;
      });
    }
    return problems.filter(problem => 
      userAnswers.some(a => a.problemId === problem.id)
    );
  };

  // Retry specific question
  const handleRetry = (problemId: number) => {
    const problemIndex = problems.findIndex(p => p.id === problemId);
    if (problemIndex !== -1) {
      setCurrentProblemIndex(problemIndex);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setActiveTab('solving');
      setIsTimerRunning(true);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">수학 문제 풀이</h1>
              <p className="text-gray-600 mt-1">3학년 수학 - 분수와 사칙연산</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">소요 시간</p>
                <p className="text-2xl font-bold text-blue-600">{formatTime(timeElapsed)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">진행률</p>
                <p className="text-2xl font-bold text-green-600">{totalAnswered}/{totalProblems}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex">
            <button
              onClick={() => setActiveTab('solving')}
              className={`flex-1 py-4 px-6 text-lg font-semibold rounded-t-xl transition-colors ${
                activeTab === 'solving'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Target className="w-5 h-5 inline-block mr-2" />
              문제 풀이
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`flex-1 py-4 px-6 text-lg font-semibold rounded-t-xl transition-colors ${
                activeTab === 'results'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
              disabled={userAnswers.length === 0}
            >
              <Award className="w-5 h-5 inline-block mr-2" />
              결과 확인
            </button>
          </div>

          {/* Problem Solving Tab */}
          {activeTab === 'solving' && (
            <div className="p-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    문제 {currentProblemIndex + 1} / {totalProblems}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(((currentProblemIndex + 1) / totalProblems) * 100)}% 완료
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentProblemIndex + 1) / totalProblems) * 100}%` }}
                  />
                </div>
              </div>

              {/* Problem Card */}
              <div className="bg-gray-50 rounded-xl p-8 mb-8">
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentProblem.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      currentProblem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {currentProblem.difficulty === 'easy' ? '기초' : 
                       currentProblem.difficulty === 'medium' ? '중급' : '심화'}
                    </span>
                    <span className="text-sm text-gray-500">문제 {currentProblem.id}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                    {currentProblem.question}
                  </h2>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentProblem.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isSubmitted}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        selectedAnswer === index
                          ? isSubmitted
                            ? index === currentProblem.correctAnswer
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-red-500 bg-red-50 text-red-700'
                            : 'border-blue-500 bg-blue-50 text-blue-700'
                          : isSubmitted && index === currentProblem.correctAnswer
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index
                            ? isSubmitted
                              ? index === currentProblem.correctAnswer
                                ? 'border-green-500 bg-green-500'
                                : 'border-red-500 bg-red-500'
                              : 'border-blue-500 bg-blue-500'
                            : isSubmitted && index === currentProblem.correctAnswer
                              ? 'border-green-500 bg-green-500'
                              : 'border-gray-300'
                        }`}>
                          {selectedAnswer === index || (isSubmitted && index === currentProblem.correctAnswer) ? (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          ) : null}
                        </div>
                        <span className="font-medium">{option}</span>
                        {isSubmitted && index === currentProblem.correctAnswer && (
                          <Check className="w-5 h-5 text-green-500 ml-auto" />
                        )}
                        {isSubmitted && selectedAnswer === index && index !== currentProblem.correctAnswer && (
                          <X className="w-5 h-5 text-red-500 ml-auto" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Explanation */}
                {isSubmitted && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-blue-800 font-semibold mb-1">해설</h4>
                        <p className="text-blue-700 text-sm leading-relaxed">
                          {currentProblem.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentProblemIndex === 0}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>이전</span>
                </button>

                <div className="flex space-x-3">
                  {!isSubmitted ? (
                    <button
                      onClick={handleSubmit}
                      disabled={selectedAnswer === null}
                      className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                    >
                      답안 제출
                    </button>
                  ) : (
                    <>
                      {currentProblemIndex < totalProblems - 1 ? (
                        <button
                          onClick={handleNext}
                          className="flex items-center space-x-2 px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                        >
                          <span>다음</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleFinish}
                          className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                        >
                          완료
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && (
            <div className="p-8">
              {/* Overall Score */}
              <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-8 text-white mb-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-2">시험 완료!</h2>
                  <div className="text-6xl font-bold mb-4">{percentage}%</div>
                  <div className="text-xl">
                    <span className="font-semibold">{correctCount}</span>개 정답 / 
                    <span className="font-semibold"> {totalAnswered}</span>개 문제
                  </div>
                  <div className="mt-4 text-lg opacity-90">
                    소요 시간: {formatTime(timeElapsed)}
                  </div>
                </div>
              </div>

              {/* Filter Options */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">문제별 결과</h3>
                <button
                  onClick={() => setShowOnlyIncorrect(!showOnlyIncorrect)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    showOnlyIncorrect
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {showOnlyIncorrect ? '모든 문제 보기' : '틀린 문제만 보기'}
                </button>
              </div>

              {/* Results List */}
              <div className="space-y-4">
                {getFilteredResults().map((problem) => {
                  const userAnswer = userAnswers.find(a => a.problemId === problem.id);
                  if (!userAnswer) return null;

                  return (
                    <div key={problem.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg font-bold text-gray-600">Q{problem.id}</span>
                          {userAnswer.isCorrect ? (
                            <span className="flex items-center space-x-1 text-green-600 font-semibold">
                              <Check className="w-5 h-5" />
                              <span>정답</span>
                            </span>
                          ) : (
                            <span className="flex items-center space-x-1 text-red-600 font-semibold">
                              <X className="w-5 h-5" />
                              <span>오답</span>
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleRetry(problem.id)}
                          className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>다시 풀기</span>
                        </button>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-900 font-medium mb-3">{problem.question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <span className="text-sm text-gray-500">내 답:</span>
                            <span className={`ml-2 font-semibold ${
                              userAnswer.isCorrect ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {problem.options[userAnswer.selectedAnswer]}
                            </span>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">정답:</span>
                            <span className="ml-2 font-semibold text-green-600">
                              {problem.options[problem.correctAnswer]}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <BookOpen className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-blue-800 font-semibold mb-1">해설</h4>
                            <p className="text-blue-700 text-sm leading-relaxed">
                              {problem.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {getFilteredResults().length === 0 && showOnlyIncorrect && (
                <div className="text-center py-8">
                  <div className="text-green-500 mb-4">
                    <Check className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">완벽해요!</h3>
                  <p className="text-gray-600">틀린 문제가 없습니다. 모든 문제를 맞혔어요!</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-8">
                <button
                  onClick={() => {
                    setActiveTab('solving');
                    setCurrentProblemIndex(0);
                    setSelectedAnswer(null);
                    setIsSubmitted(false);
                    setUserAnswers([]);
                    setTimeElapsed(0);
                    setIsTimerRunning(true);
                  }}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>다시 풀기</span>
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  돌아가기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProblemSolving;