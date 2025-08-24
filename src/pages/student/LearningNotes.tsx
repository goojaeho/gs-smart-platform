import Layout from '../../components/common/Layout';
import { FileText, Plus, Search, Filter, Star, Calendar, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const LearningNotes = () => {
  const [selectedSubject, setSelectedSubject] = useState('전체');
  const subjects = ['전체', '국어', '영어', '수학', '과학', '사회'];

  const notes = [
    {
      id: 1,
      title: '분수의 나눗셈 정리',
      subject: '수학',
      date: '2024-01-18',
      content: '분수의 나눗셈은 나누는 수를 역수로 바꾸어 곱셈으로...',
      isImportant: true,
      tags: ['분수', '나눗셈', '5학년']
    },
    {
      id: 2,
      title: '현재완료 시제 문법',
      subject: '영어',
      date: '2024-01-17',
      content: 'have/has + 과거분사 형태로 사용하며...',
      isImportant: false,
      tags: ['문법', '시제']
    },
    {
      id: 3,
      title: '태양계 행성 특징',
      subject: '과학',
      date: '2024-01-16',
      content: '수성: 태양과 가장 가까운 행성, 금성: 가장 뜨거운 행성...',
      isImportant: true,
      tags: ['태양계', '행성', '우주']
    },
  ];

  const wrongAnswers = [
    {
      id: 1,
      question: '3/4 ÷ 2/3 = ?',
      myAnswer: '6/12',
      correctAnswer: '9/8',
      subject: '수학',
      date: '2024-01-18',
      reviewed: true
    },
    {
      id: 2,
      question: 'I ___ never been to Paris.',
      myAnswer: 'has',
      correctAnswer: 'have',
      subject: '영어',
      date: '2024-01-17',
      reviewed: false
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">나의 학습노트</h2>
            <p className="text-gray-600 mt-1">학습 내용을 정리하고 복습하세요</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Plus className="w-4 h-4" />
            <span>새 노트 작성</span>
          </button>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="노트 검색..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>필터</span>
            </button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 학습 노트 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">학습 노트</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map(note => (
                  <div key={note.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {note.subject}
                        </span>
                        {note.isImportant && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{note.date}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{note.title}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{note.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {note.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 오답 노트 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">오답 노트</h3>
              <div className="space-y-3">
                {wrongAnswers.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          {item.subject}
                        </span>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      {item.reviewed ? (
                        <span className="text-xs text-green-600">복습완료</span>
                      ) : (
                        <span className="text-xs text-orange-600">복습필요</span>
                      )}
                    </div>
                    <p className="font-medium text-gray-900 mb-2">Q. {item.question}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-red-50 rounded">
                        <span className="text-gray-600">내 답안:</span>
                        <span className="ml-2 text-red-600 line-through">{item.myAnswer}</span>
                      </div>
                      <div className="p-2 bg-green-50 rounded">
                        <span className="text-gray-600">정답:</span>
                        <span className="ml-2 text-green-600 font-medium">{item.correctAnswer}</span>
                      </div>
                    </div>
                    <button className="mt-3 w-full py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 text-sm">
                      다시 풀어보기
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 노트 통계 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">노트 통계</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">전체 노트</span>
                  <span className="font-bold text-gray-900">48개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">이번 주 작성</span>
                  <span className="font-bold text-gray-900">12개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">중요 표시</span>
                  <span className="font-bold text-gray-900">15개</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">오답 노트</span>
                  <span className="font-bold text-gray-900">23개</span>
                </div>
              </div>
            </div>

            {/* 빠른 메모 */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">빠른 메모</h3>
              <textarea
                placeholder="간단한 메모를 작성하세요..."
                className="w-full h-32 p-3 bg-white rounded-lg border border-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              />
              <button className="mt-3 w-full py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500">
                메모 저장
              </button>
            </div>

            {/* 복습 알림 */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">복습 알림</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">오늘 복습할 노트: 3개</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">이번 주 복습 예정: 8개</span>
                </div>
              </div>
              <button className="mt-3 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                복습 시작하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearningNotes;