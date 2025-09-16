import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCcw, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function BreathingPage({ user, theme, setTheme, onLogout }) {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState("inhale");
  const [cycleCount, setCycleCount] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(0);

  const exercises = [
    {
      id: 1,
      title: "4-7-8 Breathing",
      description: "Calming technique that promotes relaxation and reduces anxiety",
      pattern: [4, 7, 8], // Inhale, Hold, Exhale
      duration: 600, // Total duration in seconds
      color: "bg-blue-500",
      icon: "🌬️"
    },
    {
      id: 2,
      title: "Box Breathing",
      description: "Technique used by Navy SEALs to stay calm and focused",
      pattern: [4, 4, 4, 4], // Inhale, Hold, Exhale, Hold
      duration: 480,
      color: "bg-green-500",
      icon: "🧊"
    },
    {
      id: 3,
      title: "Deep Belly Breathing",
      description: "Simple technique to activate the parasympathetic nervous system",
      pattern: [5, 0, 5], // Inhale, No hold, Exhale
      duration: 300,
      color: "bg-purple-500",
      icon: "🌿"
    },
    {
      id: 4,
      title: "Energizing Breath",
      description: "Stimulating technique to increase energy and alertness",
      pattern: [2, 0, 2], // Short inhale, No hold, Short exhale
      duration: 180,
      color: "bg-orange-500",
      icon: "⚡"
    }
  ];

  const currentExercise = exercises[selectedExercise];
  const [timeLeft, setTimeLeft] = useState(currentExercise.pattern[0]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      const nextStep = (currentStep + 1) % currentExercise.pattern.length;
      setCurrentStep(nextStep);
      
      // Set phase name based on step
      if (currentExercise.pattern.length === 3) {
        setCurrentPhase(nextStep === 0 ? "inhale" : nextStep === 1 ? "hold" : "exhale");
      } else if (currentExercise.pattern.length === 4) {
        setCurrentPhase(nextStep === 0 ? "inhale" : nextStep === 1 ? "hold" : nextStep === 2 ? "exhale" : "hold");
      }
      
      // Reset timer for next phase
      setTimeLeft(currentExercise.pattern[nextStep]);
      
      // Count completed cycles
      if (nextStep === 0) {
        setCycleCount(cycleCount + 1);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentStep, currentExercise.pattern, cycleCount]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentStep(0);
    setCurrentPhase("inhale");
    setTimeLeft(currentExercise.pattern[0]);
    setCycleCount(0);
  };

  const handleSelectExercise = (index) => {
    setSelectedExercise(index);
    setIsActive(false);
    setCurrentStep(0);
    setCurrentPhase("inhale");
    setTimeLeft(exercises[index].pattern[0]);
    setCycleCount(0);
  };

  const getPhaseInstructions = () => {
    switch (currentPhase) {
      case "inhale":
        return "Breathe in slowly through your nose";
      case "exhale":
        return "Breathe out slowly through your mouth";
      case "hold":
        return "Hold your breath";
      default:
        return "Begin when you're ready";
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "inhale":
        return "from-blue-400 to-blue-600";
      case "exhale":
        return "from-green-400 to-green-600";
      case "hold":
        return "from-purple-400 to-purple-600";
      default:
        return "from-gray-400 to-gray-600";
    }
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-2xl mr-4">
                  <Heart size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Breathing Exercises</h1>
                  <p className="text-gray-600 dark:text-gray-300">Calm your nervous system and reduce stress with breathing techniques</p>
                </div>
              </div>

              {/* Breathing Visualizer */}
              <div className="flex flex-col items-center justify-center mb-8">
                <div className={`w-64 h-64 rounded-full flex items-center justify-center mb-6 transition-all duration-1000 ${
                  isActive ? `bg-gradient-to-br ${getPhaseColor()} text-white` : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}>
                  <motion.div
                    animate={{
                      scale: currentPhase === "inhale" ? 1.2 : currentPhase === "exhale" ? 0.8 : 1,
                    }}
                    transition={{
                      duration: currentPhase === "inhale" ? currentExercise.pattern[0] : 
                               currentPhase === "exhale" ? currentExercise.pattern[2] || currentExercise.pattern[0] : 1,
                      ease: "easeInOut"
                    }}
                    className="text-6xl"
                  >
                    {currentExercise.icon}
                  </motion.div>
                </div>
                
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white capitalize">{currentPhase}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{getPhaseInstructions()}</p>
                  <div className="text-4xl font-bold text-gray-800 dark:text-white mt-2">{timeLeft}</div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <button 
                    onClick={handleReset}
                    className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw size={20} />
                  </button>
                  
                  <button 
                    onClick={handleStartStop}
                    className="p-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                  >
                    {isActive ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                </div>

                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Cycle: {cycleCount}
                </div>
              </div>

              {/* Exercise Library */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Breathing Techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exercises.map((exercise, index) => (
                    <div 
                      key={exercise.id}
                      onClick={() => handleSelectExercise(index)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedExercise === index 
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" 
                          : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500"
                      }`}
                    >
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">{exercise.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 dark:text-white">{exercise.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{exercise.description}</p>
                          <div className="mt-2">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Pattern: </span>
                            {exercise.pattern.map((time, i) => (
                              <span key={i} className="text-xs text-gray-500 dark:text-gray-400">
                                {time > 0 ? `${time}s` : "No hold"}
                                {i < exercise.pattern.length - 1 ? " - " : ""}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Breathing Benefits */}
              <div className="mt-8 bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Benefits of Breathing Exercises</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-700 dark:text-green-300">
                  <li>Reduces stress and anxiety levels</li>
                  <li>Lowers blood pressure and heart rate</li>
                  <li>Improves focus and mental clarity</li>
                  <li>Increases oxygen flow to the brain</li>
                  <li>Activates the parasympathetic nervous system (rest and digest)</li>
                  <li>Helps with emotional regulation</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default BreathingPage;
