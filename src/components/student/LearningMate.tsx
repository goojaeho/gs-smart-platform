import { useState, useEffect } from 'react';
import { Star, Gift, Zap, Heart, Target, TrendingUp, Crown, Sparkles, Trophy, Sword, Shield } from 'lucide-react';

interface LearningMateProps {
  studentLevel: number;
  currentExp: number;
  nextLevelExp: number;
  studentName: string;
  weeklyProgress: number;
  weakArea?: string;
}

interface CharacterState {
  costume: string;
  accessories: string[];
  abilities: string[];
  unlockedItems: string[];
}

const LearningMate = ({ 
  studentLevel, 
  currentExp, 
  nextLevelExp, 
  studentName,
  weeklyProgress,
  weakArea = "수학 문제"
}: LearningMateProps) => {
  const [emotion, setEmotion] = useState<'happy' | 'thinking' | 'encouraging' | 'excited' | 'struggling'>('happy');
  const [showReward, setShowReward] = useState(false);
  const [rewardType, setRewardType] = useState<'star' | 'gift' | 'levelup' | 'item'>('star');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [characterState, setCharacterState] = useState<CharacterState>({
    costume: 'basic',
    accessories: [],
    abilities: ['기본학습'],
    unlockedItems: []
  });
  const [currentQuest, setCurrentQuest] = useState("오늘은 분수의 모험!");
  const [questProgress, setQuestProgress] = useState(3);
  const [questTarget, setQuestTarget] = useState(5);
  const [userMood, setUserMood] = useState<'good' | 'okay' | 'difficult' | null>(null);

  const expPercentage = (currentExp / nextLevelExp) * 100;

  // Advanced Character Growth System
  const getCharacterEvolution = () => {
    if (studentLevel >= 15) return { tier: 'legendary', title: '전설의 학자', costume: '👑', abilities: ['마스터학습', '튜터모드', '창의력부스트'] };
    if (studentLevel >= 10) return { tier: 'master', title: '학습 마스터', costume: '🏆', abilities: ['고급학습', '문제해결왕', '집중력MAX'] };
    if (studentLevel >= 5) return { tier: 'advanced', title: '똑똑이', costume: '🎓', abilities: ['빠른학습', '기억력UP'] };
    return { tier: 'beginner', title: '새싹 학습자', costume: '🌱', abilities: ['기본학습'] };
  };

  const characterEvolution = getCharacterEvolution();

  // Quest-based Mission System
  const questTemplates = [
    { subject: '수학', quest: '분수의 모험', description: '분수 문제 5개를 정복하여 수학 왕국을 구하자!' },
    { subject: '영어', quest: '단어 탐험가', description: '새로운 영어 단어 10개를 발견하여 보물을 찾자!' },
    { subject: '국어', quest: '독해의 달인', description: '긴 글을 읽고 숨겨진 의미를 찾아내자!' },
    { subject: '과학', quest: '실험실 마법사', description: '과학 실험으로 마법의 비밀을 밝혀내자!' }
  ];

  // Emotional AI Support System
  const getEmotionalResponse = (mood: string) => {
    const responses = {
      'good': {
        message: `${studentName}님 정말 잘하고 있어요! 🎉 계속 이 기세로 가봐요!`,
        suggestion: '더 어려운 문제에 도전해볼까요?',
        emoji: '😊'
      },
      'okay': {
        message: `${studentName}님 괜찮아요! 천천히 해도 돼요 😊`,
        suggestion: '조금씩 차근차근 해봅시다!',
        emoji: '🤗'
      },
      'difficult': {
        message: `${studentName}님 힘든가요? 괜찮아요! 💪 함께 해결해봅시다!`,
        suggestion: '더 쉬운 문제부터 차근차근 해볼까요?',
        emoji: '💪'
      }
    };
    return responses[mood as keyof typeof responses] || responses.okay;
  };

  // Level Up Animation and Rewards
  const triggerLevelUp = () => {
    setShowLevelUp(true);
    setShowReward(true);
    setRewardType('levelup');
    
    // Unlock new items based on level
    const newUnlocks = [];
    if (studentLevel === 5) newUnlocks.push('🎓 똑똑이 모자');
    if (studentLevel === 10) newUnlocks.push('🏆 마스터 트로피');
    if (studentLevel === 15) newUnlocks.push('👑 전설의 왕관');
    
    setCharacterState(prev => ({
      ...prev,
      unlockedItems: [...prev.unlockedItems, ...newUnlocks]
    }));

    setTimeout(() => {
      setShowReward(false);
      setShowLevelUp(false);
    }, 3000);
  };

  // Immediate Feedback System
  const triggerPraise = () => {
    setRewardType('star');
    setShowReward(true);
    setTimeout(() => setShowReward(false), 1500);
  };

  // Character emotion logic with AI support
  useEffect(() => {
    if (userMood) {
      const response = getEmotionalResponse(userMood);
      if (userMood === 'good') setEmotion('excited');
      else if (userMood === 'difficult') setEmotion('struggling');
      else setEmotion('encouraging');
    } else {
      if (weeklyProgress >= 80) setEmotion('happy');
      else if (weeklyProgress >= 50) setEmotion('encouraging');
      else setEmotion('thinking');
    }
  }, [weeklyProgress, userMood]);

  const getCharacterDisplay = () => {
    const baseEmojis = {
      happy: '😊',
      excited: '🤩',
      thinking: '🤔',
      encouraging: '💪',
      struggling: '🤗'
    };
    
    return `${baseEmojis[emotion]}${characterEvolution.costume}`;
  };

  return (
    <div className="bg-[#f9fafb] rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
      {/* Advanced Reward Animations */}
      {showReward && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          {rewardType === 'levelup' && (
            <div className="animate-bounce text-center">
              <div className="text-6xl mb-2">🎉</div>
              <div className="text-2xl font-bold text-primary animate-pulse">레벨 업!</div>
              <div className="text-lg text-secondary">새로운 능력 해금!</div>
            </div>
          )}
          {rewardType === 'star' && (
            <div className="flex space-x-2 animate-bounce">
              <Star className="w-8 h-8 text-yellow-500 animate-spin" />
              <span className="text-yellow-600 font-bold text-lg">+10 EXP</span>
              <Star className="w-8 h-8 text-yellow-500 animate-spin" />
            </div>
          )}
          {rewardType === 'gift' && (
            <div className="text-center animate-pulse">
              <Gift className="w-12 h-12 text-primary mx-auto mb-2" />
              <div className="text-primary font-bold">보상 획득!</div>
            </div>
          )}
        </div>
      )}

      {/* Character Evolution Display */}
      <div className="flex items-center space-x-6 mb-6">
        {/* Enhanced Character with Growth */}
        <div className="flex flex-col items-center space-y-3 relative">
          {/* Character with costume evolution */}
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl shadow-xl transform transition-all duration-300 hover:scale-110 relative">
            {getCharacterDisplay()}
            {/* Sparkle effect for high levels */}
            {studentLevel >= 10 && (
              <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            )}
          </div>
          
          {/* Enhanced Level Badge with Title */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg mb-1">
              Lv.{studentLevel}
            </div>
            <div className="text-xs font-medium text-gray-600">{characterEvolution.title}</div>
          </div>
        </div>

        {/* Progress & Character Info */}
        <div className="flex-1">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">{studentName}</h3>
              <span className="text-sm font-semibold text-primary">{currentExp} / {nextLevelExp} EXP</span>
            </div>
            
            {/* Enhanced EXP Bar with level up indicator */}
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden relative">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000 ease-out relative"
                style={{ width: `${Math.min(expPercentage, 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                {expPercentage > 90 && (
                  <div className="absolute right-0 -top-6 text-xs text-primary font-bold animate-bounce">
                    레벨업 임박!
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">다음 레벨까지 {nextLevelExp - currentExp} EXP</span>
              <button 
                onClick={triggerLevelUp}
                className="text-primary hover:text-secondary transition-colors font-medium"
              >
                레벨업 미리보기
              </button>
            </div>
          </div>

          {/* Character Abilities Display */}
          <div className="mt-4 flex flex-wrap gap-1">
            {characterEvolution.abilities.map((ability, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-xs font-medium rounded-full text-gray-700 border border-gray-200"
              >
                ✨ {ability}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Emotional AI Support - Mood Input */}
      <div className="bg-white rounded-lg p-4 shadow-sm mb-4 border border-gray-100">
        <div className="text-sm text-gray-700 mb-3 text-center">
          <strong>오늘 기분은 어때요?</strong>
        </div>
        <div className="flex justify-center space-x-2">
          {[
            { mood: 'good', emoji: '😊', label: '좋아요' },
            { mood: 'okay', emoji: '😐', label: '보통' },
            { mood: 'difficult', emoji: '😔', label: '힘들어요' }
          ].map((moodOption) => (
            <button
              key={moodOption.mood}
              onClick={() => setUserMood(moodOption.mood as any)}
              className={`p-2 rounded-lg transition-all text-2xl ${
                userMood === moodOption.mood 
                  ? 'bg-primary/20 scale-110 shadow-md' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {moodOption.emoji}
              <div className="text-xs mt-1">{moodOption.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Emotional Response */}
      {userMood && (
        <div className="relative bg-white rounded-lg p-4 shadow-sm mb-4 border border-gray-100">
          <div className="text-sm text-gray-800 font-medium mb-2">
            {getEmotionalResponse(userMood).message}
          </div>
          <div className="text-xs text-gray-600 italic">
            💡 {getEmotionalResponse(userMood).suggestion}
          </div>
          <div className="absolute -top-2 left-6 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
        </div>
      )}

      {/* Quest-based Today's Mission */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Sword className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900">🗡️ {currentQuest}</h4>
            <div className="text-sm text-gray-600">퀘스트 진행도: {questProgress}/{questTarget}</div>
          </div>
        </div>
        
        {/* Quest Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(questProgress / questTarget) * 100}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          분수 문제 5개를 정복하여 수학 왕국을 구하자! 🏰
        </p>
        
        <div className="flex space-x-2">
          <button 
            onClick={triggerPraise}
            className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02] text-sm"
          >
            퀘스트 시작! ⚔️
          </button>
          <button 
            onClick={() => triggerReward('star')}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
          >
            칭찬하기 ⭐
          </button>
        </div>
      </div>

      {/* Weekly Rewards & Unlocks */}
      {characterState.unlockedItems.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-semibold text-yellow-800">새로 해금된 아이템</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {characterState.unlockedItems.map((item, index) => (
              <span key={index} className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Weak Area with AI Guidance */}
      {weakArea && (
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-orange-800">AI 학습 추천</span>
          </div>
          <p className="text-sm text-orange-700 leading-relaxed mb-3">
            <span className="font-semibold">{weakArea}</span>를 더 연습하면 레벨업이 더 빨라져요! 💡
          </p>
          <button 
            onClick={() => setCurrentQuest(`${weakArea} 마스터 도전`)}
            className="w-full py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm"
          >
            맞춤 퀘스트 시작하기 🎯
          </button>
        </div>
      )}
    </div>
  );
};

export default LearningMate;