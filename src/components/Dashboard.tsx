import React, { useState, useEffect } from 'react';
import { MessageCircle, Mic, FileText, TrendingUp, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TextAnalyzer } from './TextAnalyzer';
import { VoiceAnalyzer } from './VoiceAnalyzer';
import GratitudeGarden from './GratitudeGame';
import { Chatbot } from './Chatbot';
import { ThemeToggle } from './ThemeToggle'; // 👈 import toggle
import { Gamepad } from 'lucide-react';
import logo from '../Asset/logo1.jpg';

type ActiveTab = 'overview' | 'text' | 'voice' | 'chat' | 'gratitude';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const { user, logout } = useAuth();

  useEffect(() => {
  let pageTitle = "AgapeLight";

  switch (activeTab) {
    case "overview":
      pageTitle = "Dashboard | AgapeLight";
      break;
    case "text":
      pageTitle = "Mood Journal | AgapeLight";
      break;
    case "voice":
      pageTitle = "Voice Check-In | AgapeLight";
      break;
    case "chat":
      pageTitle = "AI Companion | AgapeLight";
      break;
    case "gratitude":
      pageTitle = "Gratitude Garden | AgapeLight";
      break;
    default:
      pageTitle = "AgapeLight";
  }
  document.title = pageTitle;
}, [activeTab]);


  const tabs = [
    { id: 'overview' as const, label: 'Dashboard', icon: TrendingUp },
    { id: 'text' as const, label: 'Mood Journal', icon: FileText },
    { id: 'voice' as const, label: 'Voice Check-In', icon: Mic },
    { id: 'chat' as const, label: 'AI Companion', icon: MessageCircle },
    { id: 'gratitude' as const, label: 'Gratitude Garden', icon: Gamepad },
  ];

  const renderTabContent = () => {
  switch (activeTab) {
    case 'overview':
      return <OverviewPanel setActiveTab={setActiveTab} />;
    case 'text':
      return <TextAnalyzer />;
    case 'voice':
      return <VoiceAnalyzer />;
    case 'chat':
      return <Chatbot />;
    case 'gratitude':
      return <GratitudeGarden />;
    default:
      return <OverviewPanel setActiveTab={setActiveTab} />;
  }
};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-transparent">
    <img
      src={logo}
      alt="AI Mental Health Analysis"
      className="h-8 w-8 object-contain rounded-lg"
    />
  </div>
  <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
    AgapeLight
  </h1>
</div>


            <div className="flex items-center space-x-4">
              <ThemeToggle /> {/* 👈 Dark/Light toggle button */}

              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-700'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

const OverviewPanel: React.FC<{ setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>> }> = ({ setActiveTab }) => {

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          AI Mental Analyzer – Your Personal Emotional Wellness Hub
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Discover insights about your emotions and get personalized guidance for a healthier mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Mood Journal ✍️
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Write your thoughts and let AI uncover your emotional patterns instantly.
          </p>
          <div
  onClick={() => setActiveTab('text')}
  className="bg-blue-50 dark:bg-blue-950 rounded-lg p-3 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition"
>
  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
    Share your thoughts and get instant emotional insights
  </p>
</div>

        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
              <Mic className="h-5 w-5 text-teal-600 dark:text-teal-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Voice Check-In 🎙️
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Speak freely—AI detects emotional tones in your voice for deeper insights.
          </p>
          <div
  onClick={() => setActiveTab('voice')}
  className="bg-teal-50 dark:bg-teal-950 rounded-lg p-3 cursor-pointer hover:bg-teal-100 dark:hover:bg-teal-900 transition"
>
  <p className="text-sm text-teal-700 dark:text-teal-300 font-medium">
    Voice patterns reveal emotional insights
  </p>
</div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Companion 💬
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Get personalized support and coping strategies, anytime you need.
          </p>
          <div
  onClick={() => setActiveTab('chat')}
  className="bg-green-50 dark:bg-green-950 rounded-lg p-3 cursor-pointer hover:bg-green-100 dark:hover:bg-green-900 transition"
>
  <p className="text-sm text-green-700 dark:text-green-300 font-medium">
    Get contextual guidance and support
  </p>
</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Mental Health Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://www.youtube.com/watch?v=LiUnFJ8P4gM"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900 transition">
              <h4 className="font-medium text-purple-900 dark:text-purple-200 mb-2">
                🌬️ Calm Breathing
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Practice quick breathing hacks to ease anxiety.
              </p>
            </div>
          </a>

          <a
            href="https://www.youtube.com/watch?v=Evgx9yX2Vw8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900 transition">
              <h4 className="font-medium text-indigo-900 dark:text-indigo-200 mb-2">
                🧘 Mindful Moments
              </h4>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">
                Try grounding techniques for instant calm.
              </p>
            </div>
          </a>

          <a
            href="https://www.youtube.com/watch?v=q7amXedTasQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-4 bg-pink-50 dark:bg-pink-950 rounded-lg cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900 transition">
              <h4 className="font-medium text-pink-900 dark:text-pink-200 mb-2">
                😴 Better Sleep
              </h4>
              <p className="text-sm text-pink-700 dark:text-pink-300">
                Tips to build a restful sleep routine.
              </p>
            </div>
          </a>

          <a
            href="https://www.youtube.com/watch?v=Nt3Qh_oJ3YY"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900 transition">
              <h4 className="font-medium text-orange-900 dark:text-orange-200 mb-2">
                🏃 Move for Mood
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Short exercises to boost energy and happiness.
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
