import { TextAnalysis, VoiceAnalysis, ChatMessage } from '../types';
const emotions = [
  'happy',
  'sad',
  'anxious',
  'calm',
  'frustrated',
  'excited',
  'stressed',
  'content',
  'love'
];

const positiveEmotions = ['happy', 'calm', 'excited', 'content', 'love'];
const negativeEmotions = ['sad', 'anxious', 'frustrated', 'stressed'];

export const analyzeText = async (text: string): Promise<TextAnalysis> => {
  // Mock NLP analysis - in production, this would use a real NLP service
  await new Promise(resolve => setTimeout(resolve, 800));

  const words = text
    .toLowerCase()
    .replace(/[.,!?']/g, '') // remove punctuation
    .split(/\s+/);

  // Direct keyword → emotion map
  const keywordEmotionMap: { [key: string]: string } = {
  // 😊 Positive / Happy
  good: 'happy',
  great: 'happy',
  happy: 'happy',
  excellent: 'happy',
  wonderful: 'happy',
  amazing: 'happy',
  awesome: 'happy',
  fantastic: 'happy',
  fabulous: 'happy',
  delightful: 'happy',
  joyful: 'happy',
  cheerful: 'happy',
  bright: 'happy',
  pleased: 'happy',
  glad: 'happy',
  satisfied: 'happy',
  positive: 'happy',
  upbeat: 'happy',
  radiant: 'happy',
  thankful: 'happy',

  // 🤩 Excitement / Energy
  excited: 'excited',
  thrilled: 'excited',
  energetic: 'excited',
  motivated: 'excited',
  inspired: 'excited',
  enthusiastic: 'excited',
  pumped: 'excited',
  hyped: 'excited',
  eager: 'excited',
  amazed: 'excited',
  wow: 'excited',

  // 😌 Calm / Peace
  peaceful: 'calm',
  calm: 'calm',
  relaxed: 'calm',
  serene: 'calm',
  tranquil: 'calm',
  content: 'calm',
  chill: 'calm',
  easygoing: 'calm',
  balanced: 'calm',
  quiet: 'calm',

  // 😢 Sadness / Loneliness
  sad: 'sad',
  bad: 'sad',
  down: 'sad',
  unhappy: 'sad',
  depressed: 'sad',
  miserable: 'sad',
  heartbroken: 'sad',
  broken: 'sad',
  // upset: 'sad',
  gloomy: 'sad',
  lonely: 'sad',
  hopeless: 'sad',
  terrible: 'sad',
  awful: 'sad',
  disappointed: 'sad',
  regret: 'sad',
  dump: 'sad',
  miss: 'sad',
  hurt: 'sad',
  crying: 'sad',

  // 😠 Anger / Frustration
  angry: 'frustrated',
  mad: 'frustrated',
  frustrated: 'frustrated',
  annoyed: 'frustrated',
  irritated: 'frustrated',
  furious: 'frustrated',
  rage: 'frustrated',
  hate: 'frustrated',
  upset: 'frustrated',
  offended: 'frustrated',
  pissed: 'frustrated',
  madly: 'frustrated',

  // 😰 Stress / Anxiety
  stressed: 'stressed',
  pressure: 'stressed',
  overwhelmed: 'stressed',
  tense: 'stressed',
  exhausted: 'stressed',
  tired: 'stressed',
  burnout: 'stressed',
  busy: 'stressed',
  drained: 'stressed',

  worried: 'anxious',
  anxious: 'anxious',
  nervous: 'anxious',
  scared: 'anxious',
  fearful: 'anxious',
  uneasy: 'anxious',
  insecure: 'anxious',
  doubtful: 'anxious',
  uncertain: 'anxious',
  panicked: 'anxious',

  // ❤ Love / Affection
  love: 'love',
  affection: 'love',
  adoration: 'love',
  fondness: 'love',
  devotion: 'love',
  passion: 'love',
  caring: 'love',
  tenderness: 'love',
  cherish: 'love',
  romantic: 'love',
  heartfelt: 'love',
  amour: 'love',
  admiration: 'love',
  intimacy: 'love',
  warmth: 'love',
  kiss: 'love',
  hug: 'love',
  darling: 'love',
  sweetheart: 'love',
  crush: 'love',
  beloved: 'love',

  // 😎 Confidence / Pride
  confident: 'confident',
  proud: 'confident',
  strong: 'confident',
  bold: 'confident',
  fearless: 'confident',
  brave: 'confident',
  courageous: 'confident',
  independent: 'confident',
  capable: 'confident',
  unstoppable: 'confident',
  empowered: 'confident',

  // 🌈 Gratitude / Fulfillment
  grateful: 'grateful',
  // thankful: 'grateful',
  blessed: 'grateful',
  fulfilled: 'grateful',
  appreciative: 'grateful',
  // satisfied: 'grateful',
  lucky: 'grateful'
  };

  let emotion = 'neutral';
  let confidence = 0.5;
  let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';

  // Check words against mapping
  for (const [keyword, mappedEmotion] of Object.entries(keywordEmotionMap)) {
    if (words.includes(keyword)) {
      emotion = mappedEmotion;
      confidence = 0.85; // higher confidence since direct match
      break;
    }
  }

  // Assign sentiment
  if (positiveEmotions.includes(emotion)) {
    sentiment = 'positive';
  } else if (negativeEmotions.includes(emotion)) {
    sentiment = 'negative';
  }

  const suggestions = getSuggestions(emotion);

  return {
    text,
    emotion,
    confidence,
    suggestions,
    sentiment,
    timestamp: new Date(),
  };
};

export const analyzeVoice = async (audioBlob: Blob): Promise<VoiceAnalysis> => {
  // Mock voice analysis - in production, this would use real audio processing
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const duration = Math.random() * 30 + 5; // 5-35 seconds
  const emotion = emotions[Math.floor(Math.random() * emotions.length)];
  const confidence = Math.random() * 0.4 + 0.6; // 0.6-1.0
  
  const audioFeatures = {
    pitch: Math.random() * 200 + 100, // Hz
    energy: Math.random() * 100, // %
    speakingRate: Math.random() * 3 + 2 // words per second
  };
  
  const suggestions = getSuggestions(emotion);
  
  return {
    emotion,
    confidence,
    suggestions,
    audioFeatures,
    duration,
    timestamp: new Date()
  };
};

export const generateChatbotResponse = async (message: string, emotionContext?: string): Promise<ChatMessage> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses = {
    greeting: [
      "Hello! I'm here to support you. How are you feeling today?",
      "Hi there! I'm glad you're here. What's on your mind?",
      "Welcome! I'm here to listen and help. How can I support you today?"
    ],
    positive: [
      "That's wonderful to hear! It's great that you're feeling positive.",
      "I'm so glad you're having a good day! What's contributing to these positive feelings?",
      "Your positive energy is beautiful. How can we maintain this feeling?"
    ],
    negative: [
      "I hear that you're going through a difficult time. Thank you for sharing with me.",
      "It takes courage to express these feelings. I'm here to support you.",
      "Your feelings are valid. Let's work through this together."
    ],
    anxious: [
      "Anxiety can be overwhelming. Have you tried some deep breathing exercises?",
      "It's okay to feel anxious. What techniques have helped you cope in the past?",
      "Remember, this feeling will pass. You're stronger than you know."
    ],
    love: [
      "Love is such a beautiful feeling. Who or what is making you feel this way?",
      "That's wonderful—love can truly uplift us. Would you like to share more?",
      "Cherishing love is important. How do you want to express it?"
    ],
    default: [
      "I understand. Can you tell me more about what you're experiencing?",
      "Thank you for sharing. Your mental health journey is important.",
      "I'm here to listen. How else can I support you today?"
    ]
  };
  
  let responseCategory = 'default';
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    responseCategory = 'greeting';
  } else if (emotionContext) {
    if (positiveEmotions.includes(emotionContext)) {
      responseCategory = 'positive';
    } else if (negativeEmotions.includes(emotionContext)) {
      responseCategory = 'negative';
    } else if (emotionContext === 'anxious') {
      responseCategory = 'anxious';
    } else if (emotionContext === 'love') {
      responseCategory = 'love';
    }
  }
  
  const categoryResponses = responses[responseCategory as keyof typeof responses];
  const response = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    content: response,
    sender: 'bot',
    timestamp: new Date(),
    emotionContext
  };
};

const getSuggestions = (emotion: string): string[] => {
  const suggestionMap: { [key: string]: string[] } = {
    happy: [
      "Keep doing what makes you feel good!",
      "Consider journaling about positive experiences",
      "Share your joy with others"
    ],
    sad: [
      "It's okay to feel sad. Consider talking to a friend",
      "Try gentle exercise or a walk outside",
      "Practice self-compassion and be patient with yourself"
    ],
    anxious: [
      "Try deep breathing exercises (4-7-8 technique)",
      "Consider grounding techniques (5-4-3-2-1 method)",
      "Limit caffeine and practice mindfulness"
    ],
    calm: [
      "Maintain this peaceful state with meditation",
      "Continue practices that bring you serenity",
      "Use this calm energy for creative activities"
    ],
    frustrated: [
      "Take a break and practice deep breathing",
      "Consider physical exercise to release tension",
      "Talk through your frustrations with someone you trust"
    ],
    excited: [
      "Channel this energy into productive activities",
      "Share your excitement with others",
      "Use this motivation to pursue your goals"
    ],
    stressed: [
      "Practice progressive muscle relaxation",
      "Break tasks into smaller, manageable steps",
      "Consider professional support if stress persists"
    ],
    content: [
      "Appreciate this sense of contentment",
      "Reflect on what's contributing to this feeling",
      "Use this stable emotional state for planning"
    ],
    love: [
      "Express your love openly to those who matter",
      "Cherish the moments of affection and warmth",
      "Consider writing down what you appreciate about loved ones"
    ]
  };
  
  return suggestionMap[emotion] || ["Take care of yourself and consider professional support if needed"];
};
