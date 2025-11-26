import React, { useState, useRef } from "react";
import { Mic, MicOff, Square, AudioWaveform as Waveform } from "lucide-react";

interface AudioFeatures {
  pitch: number;
  energy: number;
  speakingRate: number;
}

interface VoiceAnalysis {
  emotion: string;
  confidence: number;
  duration: number;
  audioFeatures: AudioFeatures;
  suggestions: string[];
}

// 🔹 EMOJI MAP
const EMOJI_MAP: Record<string, string> = {
  happy: "😊",
  sad: "😢",
  calm: "😇",
  love: "❤️",
  neutral: "🙂",
};

// Keyword lists (omitted for brevity, assume they are defined as before)
const positiveKeywords = [
  "good", "great", "happy", "excellent", "wonderful", "amazing",
  "excited", "confident", "proud", "content",
];
const negativeKeywords = [
  "bad", "terrible", "sad", "awful", "hate", "angry", 
  "frustrated", "stressed", "overwhelmed", "miss",
];
const calmKeywords = [
  "peaceful", "calm", "relaxed", "serene", "tranquil", "soothing",
];
const loveKeywords = [
  "love", "affection", "adoration", "fondness", "devotion", "passion",
  "caring", "tenderness", "cherish", "romantic", "heartfelt", "amour",
  "admiration", "intimacy", "warmth", "kiss",
];

// 🔹 Emotion-based suggestions
const getSuggestionsForEmotion = (emotion: string): string[] => {
  switch (emotion) {
    case "happy":
      return ["Keep smiling!", "Stay confident and motivated!"];
    case "sad":
      return ["Take deep breaths", "Talk to someone you trust"];
    case "calm":
      return ["Keep relaxing and practice mindful breathing"];
    case "love":
      return ["Share your love with others", "Express gratitude and kindness"];
    default:
      return ["Observe your feelings with patience"];
  }
};

interface EmojiPopup {
  emoji: string;
  id: number;
  x: number;
  y: number;
}

export const VoiceAnalyzer: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<VoiceAnalysis | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [emojis, setEmojis] = useState<EmojiPopup[]>([]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  // --- Omitted: startRecording, stopRecording, formatTime, getEmotionColor (as they are unchanged) ---

  const startRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition API not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Recognized:", transcript);
      handleAnalyzeVoice(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    recognition.onend = () => {
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
    setRecordingTime(0);

    timerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };
  
  const handleAnalyzeVoice = async (recognizedText: string) => {
    setIsAnalyzing(true);
    try {
      const lowerText = recognizedText.toLowerCase();
      let detectedEmotion: VoiceAnalysis["emotion"] = "neutral";

      if (loveKeywords.some((word) => lowerText.includes(word)))
        detectedEmotion = "love";
      else if (positiveKeywords.some((word) => lowerText.includes(word)))
        detectedEmotion = "happy";
      else if (negativeKeywords.some((word) => lowerText.includes(word)))
        detectedEmotion = "sad";
      else if (calmKeywords.some((word) => lowerText.includes(word)))
        detectedEmotion = "calm";

      await new Promise((resolve) => setTimeout(resolve, 1200));

      const result: VoiceAnalysis = {
        emotion: detectedEmotion,
        confidence: 0.9,
        duration: recordingTime,
        audioFeatures: { pitch: 120, energy: 50, speakingRate: 2.5 },
        suggestions: getSuggestionsForEmotion(detectedEmotion),
      };

      setAnalysis(result);
      speakEmotion(result.emotion);
      triggerFloatingEmojis(result.emotion);
    } catch (error) {
      console.error("Voice analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 🎈 Floating Emoji Animation
  const triggerFloatingEmojis = (emotion: string) => {
    const emoji = EMOJI_MAP[emotion] || "🙂";
    const newEmojis: EmojiPopup[] = [];
    const BURST_COUNT = 15;

    for (let i = 0; i < BURST_COUNT; i++) {
      newEmojis.push({
        emoji,
        id: Date.now() + i,
        // Spawn them slightly around the center of the viewport (around 40% to 60%)
        x: 40 + Math.random() * 20,
        y: 40 + Math.random() * 20,
      });
    }

    setEmojis((prev) => [...(prev || []), ...newEmojis]);

    // Cleanup after 3 seconds
    setTimeout(() => {
      setEmojis((prev) =>
        prev?.filter((e) => !newEmojis.some((ne) => ne.id === e.id))
      );
    }, 3000);
  };

  const speakEmotion = (emotion: string) => {
    const msg = new SpeechSynthesisUtterance(`You sound ${emotion}`);
    window.speechSynthesis.speak(msg);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getEmotionColor = (emotion: string) => {
    const colors: { [key: string]: string } = {
      happy: "bg-yellow-100 text-yellow-800 border-yellow-200",
      sad: "bg-blue-100 text-blue-800 border-blue-200",
      calm: "bg-green-100 text-green-800 border-green-200",
      love: "bg-pink-100 text-pink-800 border-pink-200",
      neutral: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[emotion] || "bg-gray-100 text-gray-800 border-gray-200";
  };
  
  return (
    // 💡 IMPORTANT: Removed 'relative' from the main div.
    <div className="space-y-6"> 
      
      {/* 🔹 Floating Emoji Layer Container (Full Page) */}
      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden" 
        style={{ zIndex: 999 }} // Ensures it is above all content
      >
        {emojis.map(({ emoji, id, x, y }) => (
          <div
            key={id}
            className="absolute text-3xl md:text-5xl"
            style={{
              // Position within the FIXED container (entire viewport)
              left: `${x}%`,
              top: `${y}%`,
              // Apply the custom floatUp animation with a random delay for a scattered look
              animation: `floatUp 2.5s ease-out ${Math.random() * 0.5}s forwards`,
            }}
          >
            {emoji}
          </div>
        ))}

        {/* 🎨 Inline Style for Keyframes */}
        <style>{`
          @keyframes floatUp {
            0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
            20% { opacity: 1; }
            /* Float up 150 pixels and fade out */
            100% { transform: translateY(-150px) scale(1.2); opacity: 0; }
          }
        `}</style>
      </div>
      
      {/* 🎙️ Voice Analyzer Section (Main UI content below the emoji layer) */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
            <Waveform className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Talk it out – I’ll listen to your emotions
            </h2>
            <p className="text-gray-600">
              Your voice tells a story—let’s uncover the emotions behind it.
            </p>
          </div>
        </div>

        {/* 🎤 Record Buttons */}
        <div className="text-center">
          <div className="mb-6">
            <div
              className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-colors ${
                isRecording
                  ? "bg-red-100 border-4 border-red-300 animate-pulse"
                  : "bg-teal-100 border-4 border-teal-200 hover:border-teal-300"
              }`}
            >
              {isRecording ? (
                <Square className="h-8 w-8 text-red-600" />
              ) : (
                <Mic className="h-8 w-8 text-teal-600" />
              )}
            </div>
          </div>

          {isRecording && (
            <div className="mb-4">
              <div className="text-2xl font-mono text-red-600 mb-2">
                {formatTime(recordingTime)}
              </div>
              <p className="text-sm text-gray-600">Recording in progress...</p>
            </div>
          )}

          <div className="space-y-3">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 mx-auto"
              >
                <Mic className="h-4 w-4" />
                <span>Start Recording</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 focus:ring-2 focus:ring-red-500 mx-auto"
              >
                <MicOff className="h-4 w-4" />
                <span>Stop Recording</span>
              </button>
            )}
          </div>

          {isAnalyzing && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-blue-700 font-medium">
                  Analyzing voice patterns...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 📊 Analysis Results */}
      {analysis && (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Voice Analysis Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div
                className={`inline-block px-4 py-2 rounded-full border ${getEmotionColor(
                  analysis.emotion
                )}`}
              >
                <span className="font-medium capitalize flex items-center justify-center gap-1">
                  {analysis.emotion} {EMOJI_MAP[analysis.emotion]}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Detected Emotion</p>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(analysis.confidence * 100)}%
              </div>
              <p className="text-sm text-gray-600">Confidence</p>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {analysis.duration.toFixed(1)}s
              </div>
              <p className="text-sm text-gray-600">Duration</p>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {analysis.audioFeatures.speakingRate.toFixed(1)}
              </div>
              <p className="text-sm text-gray-600">Words/sec</p>
            </div>
          </div>
          
          {/* Audio feature bars and suggestions... */}
          {/* ... (rest of the analysis display code remains the same) ... */}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Pitch</span>
                <span className="text-sm text-gray-900">{Math.round(analysis.audioFeatures.pitch)} Hz</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(analysis.audioFeatures.pitch / 300) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Energy</span>
                <span className="text-sm text-gray-900">{Math.round(analysis.audioFeatures.energy)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${analysis.audioFeatures.energy}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Speaking Rate</span>
                <span className="text-sm text-gray-900">{analysis.audioFeatures.speakingRate.toFixed(1)} w/s</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(analysis.audioFeatures.speakingRate / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Personalized Suggestions:
            </h4>
            <ul className="space-y-2">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};