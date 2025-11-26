import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { TextAnalyzer } from './components/TextAnalyzer'; // 👈 your Mood Journal


const AppContent: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <AuthForm
        mode={authMode}
        onToggleMode={() =>
          setAuthMode(authMode === 'login' ? 'register' : 'login')
        }
      />
    );
  }

  return (
    <Routes>
      {/* Dashboard page */}
      <Route path="/" element={<Dashboard />} />

      {/* Mood Journal page */}
      <Route path="/mood-journal" element={<TextAnalyzer />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
