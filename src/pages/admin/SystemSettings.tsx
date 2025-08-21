import Layout from '../../components/common/Layout';
import { Settings, Shield, Bell, Database, Globe, Mail, Save, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">시스템 설정</h2>
            <p className="text-gray-600 mt-1">플랫폼 전체 설정 관리</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <RefreshCw className="w-4 h-4" />
              <span>초기화</span>
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Save className="w-4 h-4" />
              <span>
                {saveStatus === 'saving' ? '저장 중...' : 
                 saveStatus === 'saved' ? '저장됨' : '변경사항 저장'}
              </span>
            </button>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'general', label: '일반 설정', icon: Settings },
                { id: 'security', label: '보안', icon: Shield },
                { id: 'notification', label: '알림', icon: Bell },
                { id: 'database', label: '데이터베이스', icon: Database },
                { id: 'api', label: 'API', icon: Globe },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {/* 일반 설정 */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">기본 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        플랫폼 이름
                      </label>
                      <input
                        type="text"
                        defaultValue="경산시 스마트학습 플랫폼"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        도메인
                      </label>
                      <input
                        type="text"
                        defaultValue="gs-smart.kr"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        관리자 이메일
                      </label>
                      <input
                        type="email"
                        defaultValue="admin@gyeongsan.kr"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        시간대
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Asia/Seoul (UTC+09:00)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">운영 설정</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                      <span className="text-sm text-gray-700">신규 회원가입 허용</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                      <span className="text-sm text-gray-700">유지보수 모드 (관리자만 접속)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded text-blue-500" />
                      <span className="text-sm text-gray-700">디버그 모드 활성화</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 보안 설정 */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">인증 설정</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        세션 만료 시간 (분)
                      </label>
                      <input
                        type="number"
                        defaultValue="30"
                        className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        최대 로그인 시도 횟수
                      </label>
                      <input
                        type="number"
                        defaultValue="5"
                        className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                        <span className="text-sm text-gray-700">2단계 인증 활성화</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                        <span className="text-sm text-gray-700">비밀번호 복잡도 검사</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded text-blue-500" />
                        <span className="text-sm text-gray-700">IP 기반 접속 제한</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">보안 경고</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        최근 24시간 동안 3건의 비정상적인 로그인 시도가 감지되었습니다.
                      </p>
                      <button className="text-sm text-yellow-900 font-medium mt-2 hover:underline">
                        자세히 보기 →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 알림 설정 */}
            {activeTab === 'notification' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">이메일 알림</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">신규 회원가입</span>
                      <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">시스템 오류</span>
                      <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">일일 리포트</span>
                      <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">보안 알림</span>
                      <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">푸시 알림</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">학습 리마인더</span>
                      <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">멘토링 알림</span>
                      <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">공지사항</span>
                      <input type="checkbox" className="rounded text-blue-500" />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* 데이터베이스 설정 */}
            {activeTab === 'database' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">데이터베이스 정보</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">데이터베이스 유형</p>
                        <p className="font-medium text-gray-900">PostgreSQL 14.5</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">현재 크기</p>
                        <p className="font-medium text-gray-900">3.2 GB</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">최대 연결 수</p>
                        <p className="font-medium text-gray-900">100</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">현재 연결 수</p>
                        <p className="font-medium text-gray-900">23</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">백업 설정</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        자동 백업 주기
                      </label>
                      <select className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>매일</option>
                        <option>매주</option>
                        <option>매월</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        백업 보관 기간
                      </label>
                      <select className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>30일</option>
                        <option>60일</option>
                        <option>90일</option>
                      </select>
                    </div>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      수동 백업 실행
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* API 설정 */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">API 키 관리</h3>
                  <div className="space-y-3">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">OpenAI API</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">활성</span>
                      </div>
                      <p className="text-sm text-gray-600 font-mono">sk-...************************</p>
                      <div className="flex space-x-2 mt-3">
                        <button className="text-sm text-blue-600 hover:text-blue-800">재생성</button>
                        <button className="text-sm text-red-600 hover:text-red-800">삭제</button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Google Maps API</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">활성</span>
                      </div>
                      <p className="text-sm text-gray-600 font-mono">AIza...**********************</p>
                      <div className="flex space-x-2 mt-3">
                        <button className="text-sm text-blue-600 hover:text-blue-800">재생성</button>
                        <button className="text-sm text-red-600 hover:text-red-800">삭제</button>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    + 새 API 키 추가
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">API 사용량</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">오늘 요청 수</span>
                        <span className="font-medium text-gray-900">12,456</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">이번 달 총 요청</span>
                        <span className="font-medium text-gray-900">387,234</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">예상 비용</span>
                        <span className="font-medium text-gray-900">₩234,500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 저장 상태 알림 */}
        {saveStatus === 'saved' && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>설정이 저장되었습니다</span>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SystemSettings;