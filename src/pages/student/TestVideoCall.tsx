import { useState } from 'react';
import Layout from '../../components/common/Layout';
import VideoCallModal from '../../components/VideoCallModal';

const TestVideoCall = () => {
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">화상회의 테스트</h1>
        <button 
          onClick={() => {
            console.log('Button clicked!');
            setIsVideoCallOpen(true);
          }}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          화상회의 열기
        </button>
        
        <p className="mt-4">isVideoCallOpen: {isVideoCallOpen ? 'true' : 'false'}</p>
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