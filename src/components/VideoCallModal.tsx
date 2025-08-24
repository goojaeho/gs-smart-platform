import { useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, Phone, MessageSquare, Users, Settings, Maximize2, Monitor } from 'lucide-react';

interface VideoCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorName: string;
  subject: string;
}

const VideoCallModal = ({ isOpen, onClose, mentorName, subject }: VideoCallModalProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'mentor', text: '안녕하세요! 무엇을 도와드릴까요?' },
    { sender: 'me', text: '분수의 나눗셈이 어려워요' }
  ]);
  const [messageInput, setMessageInput] = useState('');

  if (!isOpen) return null;

  const sendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, { sender: 'me', text: messageInput }]);
      setMessageInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-6xl h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div>
              <h3 className="text-white font-bold">{mentorName} 선생님과 화상 멘토링</h3>
              <p className="text-gray-400 text-sm">{subject} • 연결됨</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white">
              <Maximize2 className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Video Area */}
          <div className="flex-1 flex flex-col p-4">
            {/* Main Video */}
            <div className="flex-1 relative bg-gray-800 rounded-lg overflow-hidden">
              {/* Mentor Video (Placeholder) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-16 h-16 text-gray-500" />
                  </div>
                  <p className="text-white font-medium">{mentorName} 선생님</p>
                  <p className="text-gray-400 text-sm mt-1">카메라 연결중...</p>
                </div>
              </div>
              
              {/* My Video (Small) */}
              <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600">
                <div className="w-full h-full flex items-center justify-center">
                  {isVideoOn ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gray-600 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-300 text-xs mt-2">나</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <VideoOff className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="text-gray-400 text-xs mt-2">비디오 꺼짐</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Screen Share Indicator */}
              {isScreenSharing && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-full flex items-center space-x-2">
                  <Monitor className="w-4 h-4" />
                  <span>화면 공유중</span>
                </div>
              )}
            </div>

            {/* Control Bar */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-colors ${
                  isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-white" />}
              </button>
              
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-4 rounded-full transition-colors ${
                  !isVideoOn ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {isVideoOn ? <Video className="w-5 h-5 text-white" /> : <VideoOff className="w-5 h-5 text-white" />}
              </button>

              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-4 rounded-full transition-colors ${
                  isScreenSharing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Monitor className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={onClose}
                className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
              >
                <Phone className="w-5 h-5 text-white" style={{ transform: 'rotate(135deg)' }} />
              </button>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-80 border-l border-gray-700 flex flex-col">
            <div className="p-3 border-b border-gray-700">
              <h4 className="text-white font-medium flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>채팅</span>
              </h4>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-3 py-2 rounded-lg ${
                    msg.sender === 'me' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-white'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="메시지 입력..."
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  전송
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;