import Layout from '../../components/common/Layout';
import { MessageSquare, Clock, User, Calendar, AlertTriangle, Send, PenTool, Eraser, Download, Undo, Redo, Circle, Square, Type, Search, Filter, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Question {
  id: number;
  studentName: string;
  studentGrade: string;
  subject: string;
  title: string;
  content: string;
  attachments?: string[];
  timestamp: string;
  status: 'pending' | 'answered' | 'in-progress';
  priority: 'high' | 'medium' | 'low';
  replies?: Reply[];
}

interface Reply {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  hasDrawing?: boolean;
  drawingUrl?: string;
}

const QAManagement = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      studentName: '김민준',
      studentGrade: '5학년',
      subject: '수학',
      title: '분수 나눗셈이 어려워요',
      content: '분수끼리 나누는 방법이 헷갈려요. 특히 대분수를 가분수로 바꿔서 계산하는 부분이 잘 이해가 안 됩니다.',
      timestamp: '10분 전',
      status: 'pending',
      priority: 'high',
      replies: []
    },
    {
      id: 2,
      studentName: '이서연',
      studentGrade: '5학년',
      subject: '영어',
      title: 'Present Perfect가 헷갈려요',
      content: 'have/has + 과거분사 형태는 알겠는데, 언제 사용하는지 잘 모르겠어요.',
      timestamp: '30분 전',
      status: 'in-progress',
      priority: 'medium',
      replies: [
        {
          id: 1,
          author: '선생님',
          content: '좋은 질문이에요! Present Perfect는 과거에 일어난 일이 현재와 연관이 있을 때 사용해요.',
          timestamp: '20분 전',
          hasDrawing: false
        }
      ]
    },
    {
      id: 3,
      studentName: '박지호',
      studentGrade: '6학년',
      subject: '과학',
      title: '화학반응식을 모르겠어요',
      content: '원소기호는 알겠는데, 화학반응식을 쓰는 방법이 어려워요.',
      timestamp: '1시간 전',
      status: 'answered',
      priority: 'low',
      replies: [
        {
          id: 1,
          author: '선생님',
          content: '화학반응식은 반응물과 생성물을 화살표로 연결해서 표현해요. 아래 그림을 참고하세요.',
          timestamp: '45분 전',
          hasDrawing: true,
          drawingUrl: '#'
        },
        {
          id: 2,
          author: '박지호',
          content: '아, 이제 이해가 됐어요! 감사합니다 선생님!',
          timestamp: '30분 전',
          hasDrawing: false
        }
      ]
    }
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCanvas, setShowCanvas] = useState(false);

  // Canvas 관련 state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState<'pen' | 'eraser' | 'circle' | 'rectangle' | 'text'>('pen');
  const [drawingColor, setDrawingColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [canvasHistory, setCanvasHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = drawingTool === 'eraser' ? '#FFFFFF' : drawingColor;
    ctx.lineCap = 'round';

    if (drawingTool === 'pen' || drawingTool === 'eraser') {
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveCanvasState();
  };

  const saveCanvasState = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = canvasHistory.slice(0, historyStep + 1);
    newHistory.push(imageData);
    setCanvasHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      setHistoryStep(historyStep - 1);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvasHistory[historyStep - 1]) {
        ctx.putImageData(canvasHistory[historyStep - 1], 0, 0);
      }
    }
  };

  const redo = () => {
    if (historyStep < canvasHistory.length - 1) {
      setHistoryStep(historyStep + 1);
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (ctx && canvasHistory[historyStep + 1]) {
        ctx.putImageData(canvasHistory[historyStep + 1], 0, 0);
      }
    }
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveCanvasState();
  };

  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawing.png';
    a.click();
  };

  // Initialize canvas
  useEffect(() => {
    if (showCanvas && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        saveCanvasState();
      }
    }
  }, [showCanvas]);

  const handleReply = () => {
    if (!selectedQuestion || !replyContent.trim()) return;

    const newReply: Reply = {
      id: (selectedQuestion.replies?.length || 0) + 1,
      author: '선생님',
      content: replyContent,
      timestamp: '방금 전',
      hasDrawing: showCanvas,
      drawingUrl: showCanvas ? '#' : undefined
    };

    const updatedQuestions = questions.map(q => {
      if (q.id === selectedQuestion.id) {
        return {
          ...q,
          status: 'answered' as const,
          replies: [...(q.replies || []), newReply]
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    setSelectedQuestion({
      ...selectedQuestion,
      status: 'answered',
      replies: [...(selectedQuestion.replies || []), newReply]
    });
    setReplyContent('');
    setShowCanvas(false);
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.studentName.includes(searchTerm);
    const matchesSubject = filterSubject === 'all' || q.subject === filterSubject;
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-red-100 text-red-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'answered': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return '대기중';
      case 'in-progress': return '답변중';
      case 'answered': return '답변완료';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">1:1 질문 답변</h2>
            <p className="text-gray-600 mt-1">학생들의 질문을 관리하고 답변합니다</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
              대기중 {questions.filter(q => q.status === 'pending').length}
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
              답변중 {questions.filter(q => q.status === 'in-progress').length}
            </span>
          </div>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="질문 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 과목</option>
              <option value="수학">수학</option>
              <option value="영어">영어</option>
              <option value="과학">과학</option>
              <option value="국어">국어</option>
              <option value="사회">사회</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체 상태</option>
              <option value="pending">대기중</option>
              <option value="in-progress">답변중</option>
              <option value="answered">답변완료</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 질문 목록 */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b">
                <h3 className="font-bold text-gray-900">질문 목록</h3>
              </div>
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    onClick={() => setSelectedQuestion(question)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${
                      selectedQuestion?.id === question.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{question.studentName}</span>
                          <span className="text-xs text-gray-500">{question.studentGrade}</span>
                          <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                            {question.subject}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 line-clamp-1">{question.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{question.content}</p>
                      </div>
                      <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${getPriorityColor(question.priority)}`} />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">{question.timestamp}</span>
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(question.status)}`}>
                        {getStatusLabel(question.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 질문 상세 및 답변 */}
          <div className="lg:col-span-2">
            {selectedQuestion ? (
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{selectedQuestion.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(selectedQuestion.status)}`}>
                          {getStatusLabel(selectedQuestion.status)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{selectedQuestion.studentName} ({selectedQuestion.studentGrade})</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{selectedQuestion.timestamp}</span>
                        </span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                          {selectedQuestion.subject}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedQuestion.content}</p>
                  </div>
                </div>

                {/* 답변 스레드 */}
                <div className="p-6 border-b max-h-96 overflow-y-auto">
                  <h4 className="font-medium text-gray-900 mb-4">답변 스레드</h4>
                  {selectedQuestion.replies && selectedQuestion.replies.length > 0 ? (
                    <div className="space-y-4">
                      {selectedQuestion.replies.map((reply) => (
                        <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{reply.author}</span>
                            <span className="text-xs text-gray-500">{reply.timestamp}</span>
                          </div>
                          <p className="text-gray-700">{reply.content}</p>
                          {reply.hasDrawing && (
                            <div className="mt-3 p-2 bg-white rounded border">
                              <p className="text-xs text-gray-500 mb-2">📎 첨부된 설명 그림</p>
                              <div className="bg-gray-200 h-32 rounded flex items-center justify-center">
                                <span className="text-gray-500">그림 미리보기</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">아직 답변이 없습니다</p>
                  )}
                </div>

                {/* 답변 작성 */}
                <div className="p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">답변 작성</label>
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="답변을 입력하세요..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                    />
                  </div>

                  {/* Drawing Canvas Toggle */}
                  <div className="mb-4">
                    <button
                      onClick={() => setShowCanvas(!showCanvas)}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                    >
                      <PenTool className="w-4 h-4" />
                      <span>{showCanvas ? '그림판 닫기' : '그림으로 설명하기'}</span>
                    </button>
                  </div>

                  {/* Drawing Canvas */}
                  {showCanvas && (
                    <div className="mb-4 border rounded-lg p-4 bg-gray-50">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setDrawingTool('pen')}
                            className={`p-2 rounded ${drawingTool === 'pen' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                          >
                            <PenTool className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDrawingTool('eraser')}
                            className={`p-2 rounded ${drawingTool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                          >
                            <Eraser className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDrawingTool('circle')}
                            className={`p-2 rounded ${drawingTool === 'circle' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                          >
                            <Circle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDrawingTool('rectangle')}
                            className={`p-2 rounded ${drawingTool === 'rectangle' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                          >
                            <Square className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDrawingTool('text')}
                            className={`p-2 rounded ${drawingTool === 'text' ? 'bg-blue-500 text-white' : 'bg-white'}`}
                          >
                            <Type className="w-4 h-4" />
                          </button>
                          <input
                            type="color"
                            value={drawingColor}
                            onChange={(e) => setDrawingColor(e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer"
                          />
                          <select
                            value={lineWidth}
                            onChange={(e) => setLineWidth(Number(e.target.value))}
                            className="px-2 py-1 border rounded"
                          >
                            <option value="1">얇게</option>
                            <option value="2">보통</option>
                            <option value="4">굵게</option>
                            <option value="8">매우 굵게</option>
                          </select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={undo}
                            className="p-2 bg-white rounded hover:bg-gray-100"
                            disabled={historyStep <= 0}
                          >
                            <Undo className="w-4 h-4" />
                          </button>
                          <button
                            onClick={redo}
                            className="p-2 bg-white rounded hover:bg-gray-100"
                            disabled={historyStep >= canvasHistory.length - 1}
                          >
                            <Redo className="w-4 h-4" />
                          </button>
                          <button
                            onClick={clearCanvas}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                          >
                            지우기
                          </button>
                          <button
                            onClick={downloadCanvas}
                            className="p-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <canvas
                        ref={canvasRef}
                        width={700}
                        height={400}
                        className="border bg-white rounded cursor-crosshair w-full"
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                      />
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      onClick={handleReply}
                      disabled={!replyContent.trim()}
                      className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      <span>답변 전송</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12">
                <div className="text-center text-gray-500">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>질문을 선택하여 상세 내용을 확인하세요</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QAManagement;