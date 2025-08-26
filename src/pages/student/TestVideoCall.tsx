import { useState } from 'react';
import Layout from '../../components/common/Layout';
import VideoCallModal from '../../components/VideoCallModal';

const TestVideoCall = () => {
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  return (
    <Layout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">화상회의 테스트</h1>
          <p className="text-sm sm:text-base text-gray-600">화상통화 기능을 테스트해보세요</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="space-y-4">
            <button 
              onClick={() => {
                console.log('Button clicked!');
                setIsVideoCallOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm sm:text-base"
            >
              화상회의 열기
            </button>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                상태: <span className="font-medium">{isVideoCallOpen ? '화상회의 진행중' : '대기중'}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">화상회의 기능</h2>
          <ul className="space-y-2 text-sm sm:text-base text-blue-800">
            <li>• 실시간 화상통화</li>
            <li>• 채팅 메시지</li>
            <li>• 화면 공유</li>
            <li>• 마이크/카메라 제어</li>
          </ul>
        </div>
      </div>

      <VideoCallModal 
        isOpen={isVideoCallOpen}
        onClose={() => {
          console.log('Closing modal');
          setIsVideoCallOpen(false);
        }}
        mentorName="테스트 멘토"
        subject="테스트 과목"
      />
    </Layout>
  );
};

export default TestVideoCall;