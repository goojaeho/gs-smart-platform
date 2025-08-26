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
  const [showChat, setShowChat] = useState(false);
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
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
      <div className="bg-gray-900 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
            <div className="min-w-0">
              <h3 className="text-white font-bold text-sm sm:text-base truncate">
                {mentorName} 선생님
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm truncate">{subject} • 연결됨</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-red-500 touch-manipulation flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content - Mobile Optimized */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Video Area */}
          <div className="flex-1 relative bg-gray-800">
            {/* Mentor Video (Main) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 sm:w-32 sm:h-32 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-2 sm:mb-4">
                  <Users className="w-10 h-10 sm:w-16 sm:h-16 text-gray-500" />
                </div>
                <p className="text-white font-medium text-sm sm:text-base">{mentorName} 선생님</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">카메라 연결중...</p>
              </div>
            </div>
            
            {/* My Video (PiP) */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-20 h-28 sm:w-32 sm:h-44 bg-gray-700 rounded-lg overflow-hidden border-2 border-gray-600 shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                {isVideoOn ? (
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto bg-gray-600 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 sm:w-7 sm:h-7 text-gray-400" />
                    </div>
                    <p className="text-gray-300 text-xs mt-1 hidden sm:block">나</p>
                  </div>
                ) : (
                  <VideoOff className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                )}
              </div>
            </div>

            {/* Screen Share Indicator */}
            {isScreenSharing && (
              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-1 bg-blue-600 text-white text-xs rounded-full flex items-center gap-1">
                <Monitor className="w-3 h-3" />
                <span>화면공유</span>
              </div>
            )}

            {/* Mobile Chat Toggle Button */}
            <button
              onClick={() => setShowChat(!showChat)}
              className="lg:hidden absolute bottom-20 right-2 p-3 bg-gray-700 rounded-full shadow-lg touch-manipulation"
            >
              <MessageSquare className="w-5 h-5 text-white" />
              {messages.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>
          </div>

          {/* Control Bar - Mobile Optimized */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center justify-center gap-3 sm:gap-4 p-3 sm:p-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 sm:p-4 rounded-full transition-colors touch-manipulation ${
                  isMuted ? 'bg-red-600' : 'bg-gray-700'
                }`}
                aria-label={isMuted ? '마이크 켜기' : '마이크 끄기'}
              >
                {isMuted ? 
                  <MicOff className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : 
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                }
              </button>
              
              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-3 sm:p-4 rounded-full transition-colors touch-manipulation ${
                  !isVideoOn ? 'bg-red-600' : 'bg-gray-700'
                }`}
                aria-label={isVideoOn ? '비디오 끄기' : '비디오 켜기'}
              >
                {isVideoOn ? 
                  <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : 
                  <VideoOff className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                }
              </button>

              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-3 sm:p-4 rounded-full transition-colors touch-manipulation hidden sm:block ${
                  isScreenSharing ? 'bg-blue-600' : 'bg-gray-700'
                }`}
                aria-label="화면 공유"
              >
                <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>

              <button
                onClick={onClose}
                className="p-3 sm:p-4 bg-red-600 rounded-full transition-colors touch-manipulation"
                aria-label="통화 종료"
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" style={{ transform: 'rotate(135deg)' }} />
              </button>

              {/* Desktop Chat Toggle */}
              <button
                onClick={() => setShowChat(!showChat)}
                className="p-3 sm:p-4 rounded-full bg-gray-700 transition-colors touch-manipulation hidden lg:block"
                aria-label="채팅"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Mobile/Desktop Chat Sidebar */}
          {showChat && (
            <div className={`absolute inset-x-0 bottom-16 sm:bottom-20 lg:bottom-0 lg:right-0 lg:left-auto lg:top-0 lg:w-80 bg-gray-800 border-t lg:border-t-0 lg:border-l border-gray-700 flex flex-col transition-transform z-10 ${
              showChat ? 'translate-y-0 lg:translate-x-0' : 'translate-y-full lg:translate-x-full'
            }`}>
              <div className="p-3 border-b border-gray-700 flex items-center justify-between">
                <h4 className="text-white font-medium text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>채팅</span>
                </h4>
                <button
                  onClick={() => setShowChat(false)}
                  className="lg:hidden p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[40vh] lg:max-h-none">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      msg.sender === 'me' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-white'
                    }`}>
                      <p className="text-xs sm:text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-gray-700">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="메시지 입력..."
                    className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm touch-manipulation"
                  >
                    전송
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;