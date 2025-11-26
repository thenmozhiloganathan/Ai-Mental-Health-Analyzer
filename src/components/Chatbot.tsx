import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';

// -------------------------
// Keyword lists & responses
// -------------------------
const positiveKeywords = [
  "good", "great", "happy", "excellent", "wonderful",
  "amazing", "love", "joy", "excited", "cheerful", "optimistic",
  "pleased", "satisfied", "delighted", "energetic", "motivated",
  "confident", "proud", "hopeful", "content"
];

const negativeKeywords = [
  "bad", "terrible", "sad", "awful", "hate",
  "angry", "frustrated", "stressed", "worried", "anxious",
  "lonely", "gloomy", "tired", "bored", "discouraged",
  "overwhelmed", "upset", "resentful", "jealous", "disappointed"
];

const calmKeywords = [
  "peaceful", "calm", "relaxed", "serene", "tranquil",
  "soothing", "quiet", "composed", "balanced", "restful",
  "centered", "mindful", "still", "harmonious", "gentle"
];

const positiveResponses = [
  "That's wonderful! Keep up the positivity 🌟",
  "I'm glad to hear that! 😊",
  "That's great! What made you feel this way?"
];

const negativeResponses = [
  "I'm sorry you're feeling this way 😔. Would you like some tips to feel better?",
  "It's okay to feel down sometimes. I'm here for you.",
  "Take a deep breath. Would you like some tips to feel better?"
];

const calmResponses = [
  "That's peaceful 🌿. Keep enjoying this calm moment.",
  "Sounds like you're feeling relaxed. Stay mindful and serene.",
  "Great! This calm energy is perfect for reflection or creativity."
];

// -------------------------
// Emotion detection
// -------------------------
function detectEmotion(text: string): "positive" | "negative" | "calm" | "neutral" {
  const lowerText = text.toLowerCase();
  if (positiveKeywords.some(word => lowerText.includes(word))) return "positive";
  if (negativeKeywords.some(word => lowerText.includes(word))) return "negative";
  if (calmKeywords.some(word => lowerText.includes(word))) return "calm";
  return "neutral";
}

// -------------------------
// Chatbot response generator
// -------------------------
let previousBotMessage: string | null = null;

async function generateChatbotResponse(userInput: string): Promise<ChatMessage> {
  const lowerText = userInput.trim().toLowerCase();
  let response = "";

  // Handle "yes" after tips suggestion
  if (previousBotMessage?.includes("Would you like some tips")) {
  if (["yes", "sure", "please"].includes(lowerText)) {
    response = "Here’s a helpful video with tips to feel better: https://www.youtube.com/watch?v=LiUnFJ8P4gM";
    previousBotMessage = null;
  } else if (["no"].includes(lowerText)) {
    response = "No problem! Let me know if you want tips later.";
    previousBotMessage = null;
  }
}

// ---------------------------
// Friendly + Mental Health AI Chat Patterns
// ---------------------------
else if (lowerText === "hi" || lowerText === "hello" || lowerText === "hey" || lowerText === "yo") {
  response = "Hey there! 👋 How’s your day going so far?";
}
else if (lowerText.includes("your name") || lowerText.includes("what is your name")) {
  response = "My name is Homie!";
}
else if (lowerText.includes("how are you")) {
  response = "I’m doing well 😄 Thanks for asking! How about you? Feeling good or a bit stressed?";
}
else if (lowerText.includes("what are you doing") || lowerText.includes("wru")) {
  response = "Just chilling here and waiting for you 😎 what about you?";
}
else if (lowerText.includes("i'm sad") || lowerText.includes("feeling down")) {
  response = "I hear you 😔 It’s okay to feel sad sometimes. Want to talk about what’s bothering you?";
}
else if (lowerText.includes("i'm happy") || lowerText.includes("feeling good")) {
  response = "Yay! 😄 I’m glad you’re feeling good! What’s making your day nice?";
}
else if (lowerText.includes("anxious") || lowerText.includes("worried")) {
  response = "It’s normal to feel anxious 😌 Let’s take a deep breath together… Inhale… Exhale… 🌬";
}
else if (lowerText.includes("stressed") || lowerText.includes("overwhelmed")) {
  response = "Sounds like a lot on your mind 😥 Want me to share a quick way to relax?";
}
else if (lowerText.includes("tired") || lowerText.includes("exhausted")) {
  response = "You deserve a break 😴 Maybe a short rest or some water will help!";
}
else if (lowerText.includes("lonely") || lowerText.includes("isolated")) {
  response = "I’m here for you 🤗 You’re not alone. Want to chat for a bit?";
}
else if (lowerText.includes("angry") || lowerText.includes("frustrated")) {
  response = "I get that 😤 Anger is natural. Sometimes talking it out helps. Want to try?";
}
else if (lowerText.includes("happy") || lowerText.includes("joyful")) {
  response = "That’s wonderful 😄 Keep enjoying the good vibes! Anything special happening?";
}
else if (lowerText.includes("love") || lowerText.includes("affection")) {
  response = "Aww ❤ Love makes life brighter! Feeling loved or missing someone?";
}
else if (lowerText.includes("thank")) {
  response = "I’m always here for you 😊 That’s what friends do!";
}
else if (lowerText.includes("bored")) {
  response = "Boredom happens 😅 Want me to suggest a fun activity or something relaxing?";
}
else if (lowerText.includes("good morning")) {
  response = "Good morning! ☀ Hope today brings you lots of positivity!";
}
else if (lowerText.includes("good night")) {
  response = "Good night 🌙 Sleep tight and take care of yourself!";
}
else if (lowerText.includes("i'm stressed about") || lowerText.includes("worried about")) {
  response = "That sounds tough 😔 Want to share more details? Maybe I can help you feel calmer.";
}
else if (lowerText.includes("i feel anxious") || lowerText.includes("panic")) {
  response = "Deep breaths 🌬 Let’s try to focus on the present moment. You’ve got this!";
}
else if (lowerText.includes("motivate me") || lowerText.includes("inspire me")) {
  response = "Remember 💪 Small steps every day make a big difference. You’re doing amazing!";
}
else if (lowerText.includes("help me relax") || lowerText.includes("calm me")) {
  response = "Try this with me: Close your eyes, inhale for 4 seconds, hold 2, exhale 6… Repeat a few times 🌿";
}
else if (lowerText.includes("i'm proud of myself") || lowerText.includes("i did it")) {
  response = "That’s awesome! 🎉 You should feel proud of yourself. Keep it up!";
}
else if (lowerText.includes("i miss someone") || lowerText.includes("feeling lonely")) {
  response = "Missing someone is hard 😔 Want to share memories or talk about them?";
}
else if (lowerText.includes("relax") || lowerText.includes("calm")) {
  response = "Let’s do a quick mental reset 🧘‍♂ Focus on your breath and imagine a peaceful place.";
}
else if (lowerText.includes("joke") || lowerText.includes("funny")) {
  response = "Why don’t scientists trust atoms? Because they make up everything 😂";
}
else if (lowerText.includes("bye") || lowerText.includes("tata") || lowerText.includes("see you")) {
  response = "Take care! 😊 Remember, I’m always here if you want to chat again.";
}

// ---------------------------
// Emotion detection fallback
// ---------------------------
else {
  const emotion = detectEmotion(userInput);

  if (emotion === "positive") {
    response = positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
  } 
  else if (emotion === "negative") {
    response = negativeResponses[Math.floor(Math.random() * negativeResponses.length)];
    if (response.includes("Would you like some tips")) previousBotMessage = response;
  } 
  else if (emotion === "calm") {
    response = calmResponses[Math.floor(Math.random() * calmResponses.length)];
  } 
  else {
    response = "Hmm… tell me more about how you’re feeling 😌 I’m listening.";
  }
}


  previousBotMessage = response;

  return {
    id: Math.random().toString(36).substr(2, 9),
    content: response,
    sender: "bot",
    timestamp: new Date(),
  };
}

// -------------------------
// React Chatbot component
// -------------------------
export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '1',
    content: "Hey there! 🌸 This is your safe space. How’s your day going so far?",
    sender: 'bot',
    timestamp: new Date()
  }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const botResponse = await generateChatbotResponse(inputText);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        content: "I’m having trouble responding right now. Please try again later.",
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-[calc(100vh-12rem)] flex flex-col">
      <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Bot className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Personalized emotional support & analysis</h2>
          <p className="text-sm text-gray-600">Always here to listen and guide you</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex space-x-2 max-w-xs lg:max-w-md xl:max-w-lg ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-green-100'}`}>
                {msg.sender === 'user' ? <User className="h-4 w-4 text-white"/> : <Bot className="h-4 w-4 text-green-600"/>}
              </div>
              <div className={`rounded-lg p-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>{formatTime(msg.timestamp)}</p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex space-x-2 max-w-xs lg:max-w-md xl:max-w-lg">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-green-600" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex space-x-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your thoughts or ask me anything..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none"
            rows={1}
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-green-600 text-white p-3 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
