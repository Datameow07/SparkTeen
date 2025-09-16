import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Clock, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function MeditationPage({ user, theme, setTheme, onLogout }) {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedMeditation, setSelectedMeditation] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const meditations = [
    {
      id: 1,
      title: "5-Minute Mindfulness",
      description: "A short meditation to center yourself and reduce stress",
      duration: 300, // 5 minutes in seconds
      category: "Beginner",
      icon: "🧘‍♂️"
    },
    {
      id: 2,
      title: "Focus & Concentration",
      description: "Improve your focus and mental clarity with this guided session",
      duration: 600, // 10 minutes
      category: "Intermediate",
      icon: "🎯"
    },
    {
      id: 3,
      title: "Anxiety Relief",
      description: "Calm your nervous system and find peace during stressful times",
      duration: 900, // 15 minutes
      category: "Advanced",
      icon: "🌊"
    },
    {
      id: 4,
      title: "Sleep Meditation",
      description: "Drift off to sleep peacefully with this relaxing guidance",
      duration: 1200, // 20 minutes
      category: "Sleep",
      icon: "🌙"
    }
  ];

  const currentMeditation = meditations[selectedMeditation];

  useEffect(() => {
    let interval;
    if (isPlaying && currentTime < currentMeditation.duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1);
      }, 1000);
    } else if (currentTime >= currentMeditation.duration) {
      setIsPlaying(false);
      setIsCompleted(true);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, currentMeditation.duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = (currentTime / currentMeditation.duration) * 100;

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (currentTime >= currentMeditation.duration) {
      setCurrentTime(0);
      setIsCompleted(false);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setIsCompleted(false);
  };

  const handleSelectMeditation = (index) => {
    setSelectedMeditation(index);
    setIsPlaying(false);
    setCurrentTime(0);
    setIsCompleted(false);
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar currentPage="wellness" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
      <main className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto w-full">
          <button onClick={() => navigate("/wellness")} className="flex items-center text-indigo-600 dark:text-indigo-400 mb-6">
            <ArrowLeft size={16} className="mr-1" /> Back to Wellness
          </button>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-2xl mr-4">
                  <Heart size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Guided Meditation</h1>
                  <p className="text-gray-600 dark:text-gray-300">Relax your mind and reduce stress with guided sessions</p>
                </div>
              </div>

              {/* Meditation Player */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl mb-8">
                <div className="text-center mb-6">
                  <span className="text-4xl">{currentMeditation.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mt-2">{currentMeditation.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{currentMeditation.description}</p>
                  <div className="flex items-center justify-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={14} className="mr-1" />
                    <span>{formatTime(currentMeditation.duration)}</span>
                    <span className="mx-2">•</span>
                    <span>{currentMeditation.category}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(currentMeditation.duration)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  
                  <button 
                    onClick={handlePlayPause}
                    className="p-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  
                  <button 
                    onClick={handleReset}
                    className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                      <path d="M3 3v5h5"></path>
                    </svg>
                  </button>
                </div>

                {isCompleted && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-center"
                  >
                    <Sparkles size={20} className="inline-block text-green-600 dark:text-green-400 mb-2" />
                    <p className="text-green-800 dark:text-green-200">Meditation completed! Great job taking time for yourself.</p>
                  </motion.div>
                )}
              </div>

              {/* Meditation Library */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Meditation Library</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {meditations.map((meditation, index) => (
                    <div 
                      key={meditation.id}
                      onClick={() => handleSelectMeditation(index)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedMeditation === index 
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                          : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                      }`}
                    >
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">{meditation.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 dark:text-white">{meditation.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{meditation.description}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <Clock size={12} className="mr-1" />
                            <span>{formatTime(meditation.duration)}</span>
                            <span className="mx-2">•</span>
                            <span>{meditation.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meditation Tips */}
              <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Meditation Tips</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                  <li>Find a quiet, comfortable place to sit or lie down</li>
                  <li>Focus on your breath - notice the sensation of air moving in and out</li>
                  <li>Don't worry about clearing your mind completely - just observe thoughts without judgment</li>
                  <li>Practice regularly, even if it's just for a few minutes each day</li>
                  <li>Be patient with yourself - meditation is a skill that develops over time</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default MeditationPage;
