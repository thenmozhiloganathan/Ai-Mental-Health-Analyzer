import React, { useState } from 'react';
import { Send, Brain, TrendingUp } from 'lucide-react';
import { analyzeText } from '../utils/aiAnalyzer';
import { TextAnalysis } from '../types';

// Emoji map based on emotion
const EMOJI_MAP: Record<string, string> = {
  happy: '😊',
  excited: '🤩',
  content: '😌',
  sad: '😢',
  frustrated: '😤',
  stressed: '😰',
  anxious: '😟',
  calm: '😇',
  love: '❤️'
};

interface EmojiPopup {
  emoji: string;
  id: number;
  x: number;
  y: number;
}

export const TextAnalyzer: React.FC = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<TextAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState<TextAnalysis[]>([]);
  const [emojis, setEmojis] = useState<EmojiPopup[]>([]);

  // Analyze Text and trigger emojis
  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeText(text);
      setAnalysis(result);
      setHistory((prev) => [result, ...prev.slice(0, 4)]); // Keep last 5 analyses
      triggerEmojiPopup(result.emotion); // 🎉 trigger floating emojis
      setText('');
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Floating emoji effect generator
  const triggerEmojiPopup = (emotion: string) => {
    const emoji = EMOJI_MAP[emotion];
    if (!emoji) return;

    const newEmojis: EmojiPopup[] = [];
    for (let i = 0; i < 40; i++) {
      newEmojis.push({
        emoji,
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
      });
    }

    setEmojis((prev) => [...(prev || []), ...newEmojis]);

    setTimeout(() => {
      setEmojis((prev) =>
        prev?.filter((e) => !newEmojis.find((ne) => ne.id === e.id))
      );
    }, 2500);
  };

  const getEmotionColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      happy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      sad: 'bg-blue-100 text-blue-800 border-blue-200',
      anxious: 'bg-red-100 text-red-800 border-red-200',
      calm: 'bg-green-100 text-green-800 border-green-200',
      frustrated: 'bg-orange-100 text-orange-800 border-orange-200',
      excited: 'bg-purple-100 text-purple-800 border-purple-200',
      stressed: 'bg-red-100 text-red-800 border-red-200',
      content: 'bg-teal-100 text-teal-800 border-teal-200',
      love: 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[emotion] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'negative':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 relative overflow-hidden">
      {/* Floating Emoji Animation */}
      {emojis.map(({ emoji, id, x, y }) => (
        <div
          key={id}
          className="absolute text-6xl animate-bounce pointer-events-none"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animation: 'float 2s ease-out forwards'
          }}
        >
          {emoji}
        </div>
      ))}

      {/* Input & Analyze Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Brain className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              How are you feeling today?
            </h2>
            <p className="text-gray-600">
              Type freely, I’ll help you understand your emotions.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="text-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              What's on your mind?
            </label>
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              rows={4}
              placeholder="Share your thoughts, feelings, or what happened in your day..."
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!text.trim() || isAnalyzing}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Analyze Text</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {analysis && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Analysis Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div
                className={`inline-block px-4 py-2 rounded-full border ${getEmotionColor(
                  analysis.emotion
                )}`}
              >
                <span className="font-medium capitalize">
                  {analysis.emotion}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Detected Emotion</p>
            </div>

            <div className="text-center">
              <div
                className={`inline-block px-4 py-2 rounded-full border ${getSentimentColor(
                  analysis.sentiment
                )}`}
              >
                <span className="font-medium capitalize">
                  {analysis.sentiment}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Sentiment</p>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(analysis.confidence * 100)}%
              </div>
              <p className="text-sm text-gray-600">Confidence</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Your text:</h4>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
              {analysis.text}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Personalized Suggestions:
            </h4>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* History Section */}
      {history.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Analyses
            </h3>
          </div>

          <div className="space-y-3">
            {history.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${getEmotionColor(
                      item.emotion
                    )}`}
                  >
                    {item.emotion}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 truncate">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Floating Emoji Animation Style */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-50px) scale(1.2);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
