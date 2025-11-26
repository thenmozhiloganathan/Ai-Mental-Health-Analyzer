import React, { useState } from 'react';
import { Flower, CloudRain, Sprout, Send, TrendingUp } from 'lucide-react'; 

// --- 1. GardenStats Component ---
interface GardenStatsProps {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

function GardenStats({ positive, negative, neutral, total }: GardenStatsProps) {
  const positivePercentage = total > 0 ? Math.round((positive / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        <h2 className="text-xl font-semibold text-slate-800">Garden Overview</h2>
      </div>

      <div className="space-y-3">
        {/* Blooming Flowers */}
        <div className="flex items-center justify-between p-3 bg-pink-50 rounded-xl">
          <div className="flex items-center gap-3">
            <Flower className="w-6 h-6 text-pink-500" />
            <span className="font-medium text-slate-700">Blooming Flowers</span>
          </div>
          <span className="text-2xl font-bold text-pink-600">{positive}</span>
        </div>

        {/* Wilted Flowers */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <CloudRain className="w-6 h-6 text-slate-600" />
            <span className="font-medium text-slate-700">Wilted Flowers</span>
          </div>
          <span className="text-2xl font-bold text-slate-600">{negative}</span>
        </div>

        {/* Growing Sprouts */}
        <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
          <div className="flex items-center gap-3">
            <Sprout className="w-6 h-6 text-emerald-500" />
            <span className="font-medium text-slate-700">Growing Sprouts</span>
          </div>
          <span className="text-2xl font-bold text-emerald-600">{neutral}</span>
        </div>
      </div>

      {/* Positivity Score */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Positivity Score</span>
          <span className="text-lg font-bold text-emerald-600">{positivePercentage}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${positivePercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// --- 2. Type Definitions and Utility Components ---
type Plant = {
  id: number;
  message: string;
  type: 'blooming' | 'wilted' | 'sprout';
  style: {
    top: string;
    left: string;
  };
};

const BloomingFlowerDisplay = () => (
  <Flower className="h-10 w-10 text-pink-500 opacity-90 transform rotate-45 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)] animate-pulse" />
);
const WiltedFlowerDisplay = () => (
  <CloudRain className="h-8 w-8 text-gray-500 opacity-80 drop-shadow-[0_0_6px_rgba(71,85,105,0.4)]" />
);
const GrowingSproutDisplay = () => (
  <Sprout className="h-8 w-8 text-green-500 opacity-90 drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
);

const Sun = () => (
  <div className="absolute top-6 right-6 w-12 h-12 bg-yellow-300 rounded-full opacity-80 shadow-md"></div>
);

// --- 3. Main Gratitude Garden Component ---
function GratitudeGarden() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [input, setInput] = useState('');

  const positiveWords = ['grateful', 'happy', 'joy', 'love', 'excited', 'good', 'beautiful', 'wonderful', 'awesome', 'great', 'amazing', 'fantastic', 'cool', 'nice', 'fun', 'peaceful', 'calm', 'relaxed', 'cheerful', 'smile', 'blessed', 'thankful', 'positive', 'strong', 'confident', 'proud', 'hopeful', 'friendly', 'bright', 'motivated', 'energetic', 'fine', 'okay', 'super', 'yay', 'perfect', 'lovely', 'sweet'];
  const difficultWords = ['sad', 'angry', 'frustrated', 'anxious', 'stressed', 'bad', 'hard', 'difficult', 'upset', 'tired', 'worried', 'scared', 'afraid', 'lonely', 'hurt', 'cry', 'depressed', 'hopeless', 'lost', 'bored', 'confused', 'mad', 'pain', 'hate', 'terrible', 'awful', 'broken', 'useless', 'empty', 'overwhelmed', 'guilty', 'regret', 'angry', 'low', 'stuck', 'nervous', 'weak'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const words = input.toLowerCase().split(/\s+/);
    let type: Plant['type'] = 'sprout';
    
    if (words.some(word => positiveWords.includes(word))) {
      type = 'blooming';
    } else if (words.some(word => difficultWords.includes(word))) {
      type = 'wilted';
    }

    const newPlant: Plant = {
      id: Date.now(),
      message: input,
      type: type,
      style: {
        top: `${Math.random() * 60 + 20}%`,
        left: `${Math.random() * 70 + 15}%`,
      },
    };

    setPlants(prev => [...prev, newPlant]);
    setInput('');
  };

  const bloomingCount = plants.filter(p => p.type === 'blooming').length;
  const wiltedCount = plants.filter(p => p.type === 'wilted').length;
  const sproutCount = plants.filter(p => p.type === 'sprout').length;
  const totalPlants = plants.length;

  return (
    <div className="font-sans p-6 text-gray-800 w-full min-h-screen bg-gray-50"> 
      
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-teal-600">Gratitude Garden ✨</h1>
        <p className="text-gray-600 mt-2 text-base max-w-2xl mx-auto"> 
          Express your emotions and watch your garden grow. Positive thoughts bloom into beautiful flowers, while difficult feelings are acknowledged and nurtured.
        </p>
      </header>
      
      <main className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Left Side: The Garden */}
        <div className="flex-1 bg-gradient-to-br from-blue-50/50 via-teal-100 to-green-100 rounded-2xl shadow-2xl p-4 relative min-h-[600px] lg:min-h-[650px]">
          <Sun />
          {plants.map(plant => (
            <div
              key={plant.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125 group z-10"
              style={plant.style}
            >
              {plant.type === 'blooming' && <BloomingFlowerDisplay />}
              {plant.type === 'wilted' && <WiltedFlowerDisplay />}
              {plant.type === 'sprout' && <GrowingSproutDisplay />}
              
              <div className="absolute bottom-full mb-2 w-max max-w-xs px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {plant.message}
              </div>
            </div>
          ))}

          <form onSubmit={handleSubmit} className="absolute bottom-4 left-4 right-4 flex gap-2 z-20">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-lg"
            />
            <button
              type="submit"
              className="bg-teal-500 text-white rounded-full p-3 hover:bg-teal-600 transition-colors shadow-lg disabled:bg-gray-400"
              disabled={!input.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Right Side: Sidebar */}
        <aside className="w-full lg:w-80 flex flex-col gap-6">
          <GardenStats
            positive={bloomingCount}
            negative={wiltedCount}
            neutral={sproutCount}
            total={totalPlants}
          />

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg text-slate-800 mb-4">Garden Tips</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-2 text-sm">
              <li>Positive words create <strong>blooming flowers</strong>.</li>
              <li>Difficult emotions become <strong>wilted flowers</strong>.</li>
              <li>Neutral thoughts grow into <strong>sprouts</strong>.</li>
              <li>Hover over flowers to see your messages.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default GratitudeGarden;
