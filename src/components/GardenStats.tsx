import { Flower, CloudRain, Sprout, TrendingUp } from 'lucide-react';

interface GardenStatsProps {
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

export function GardenStats({ positive, negative, neutral, total }: GardenStatsProps) {
  const positivePercentage = total > 0 ? Math.round((positive / total) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        <h2 className="text-xl font-semibold text-slate-800">Garden Overview</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-pink-50 rounded-xl">
          <div className="flex items-center gap-3">
            <Flower className="w-6 h-6 text-pink-500" />
            <span className="font-medium text-slate-700">Blooming Flowers</span>
          </div>
          <span className="text-2xl font-bold text-pink-600">{positive}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <CloudRain className="w-6 h-6 text-slate-600" />
            <span className="font-medium text-slate-700">Wilted Flowers</span>
          </div>
          <span className="text-2xl font-bold text-slate-600">{negative}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
          <div className="flex items-center gap-3">
            <Sprout className="w-6 h-6 text-emerald-500" />
            <span className="font-medium text-slate-700">Growing Sprouts</span>
          </div>
          <span className="text-2xl font-bold text-emerald-600">{neutral}</span>
        </div>
      </div>

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
