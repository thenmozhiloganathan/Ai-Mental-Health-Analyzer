export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface EmotionAnalysis {
  emotion: string;
  confidence: number;
  suggestions: string[];
  timestamp: Date;
}

export interface TextAnalysis extends EmotionAnalysis {
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface VoiceAnalysis extends EmotionAnalysis {
  audioFeatures: {
    pitch: number;
    energy: number;
    speakingRate: number;
  };
  duration: number;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  emotionContext?: string;
}

export interface MentalHealthSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  textAnalyses: TextAnalysis[];
  voiceAnalyses: VoiceAnalysis[];
  chatMessages: ChatMessage[];
}