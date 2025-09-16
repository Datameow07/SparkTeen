import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Compass, Target, Book, Users, Video, Bookmark, 
  Check, Trophy, Sparkles, TrendingUp, Calendar,
  ArrowRight, Star, Zap, Heart, Award, Clock,
  ChevronRight, BarChart3, Brain, Coffee, MessageSquare,
  Search, Bell, Menu, X, Moon, Sun, Activity
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function Dashboard({ user, notifications, theme, setTheme, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const completedTests = user.completedTests.length;
  const totalRequiredTests = 4;
  const progressPercentage = (completedTests / totalRequiredTests) * 100;
  
  // Sample data for the enhanced dashboard
  const upcomingEvents = [
    { id: 1, title: "UX Design Workshop", date: "Tomorrow", time: "4:00 PM", type: "workshop" },
    { id: 2, title: "Tech Career Fair", date: "Sep 15", time: "10:00 AM", type: "event" },
    { id: 3, title: "Mentor Session", date: "Sep 12", time: "3:30 PM", type: "mentoring" }
  ];
  
  const recentAchievements = [
    { id: 1, title: "Quest Starter", description: "Completed your first assessment", icon: <Award size={16} />, points: 50, color: "bg-gradient-to-r from-amber-400 to-amber-500" },
    { id: 2, title: "Journal Keeper", description: "Wrote 3 journal entries", icon: <Book size={16} />, points: 30, color: "bg-gradient-to-r from-blue-400 to-blue-500" },
    { id: 3, title: "Community Explorer", description: "Joined first group", icon: <Users size={16} />, points: 25, color: "bg-gradient-to-r from-purple-400 to-purple-500" }
  ];
  
  const motivationalQuotes = [
    "Your career path is a journey of discovery, not a destination.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "You don't have to see the whole staircase, just take the first step.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "The only way to do great work is to love what you do."
  ];
  
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  
  useEffect(() => {
    // Rotate quotes every 10 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    }, 10000);
    
    return () => clearInterval(quoteInterval);
  }, []);
  
  const statsData = [
    { label: "Quest Progress", value: `${progressPercentage}%`, icon: <Compass size={20} />, color: "bg-indigo-500" },
    { label: "Career Matches", value: "12", icon: <Target size={20} />, color: "bg-green-500" },
    { label: "Journal Entries", value: "5", icon: <Book size={20} />, color: "bg-blue-500" },
    { label: "Community Friends", value: "8", icon: <Users size={20} />, color: "bg-purple-500" }
  ];
  
  const recommendedContent = [
    {
      id: 1,
      title: "Day in the Life: UX Designer",
      description: "Watch how a UX designer solves problems creatively and designs user experiences",
      type: "video",
      duration: "12 min",
      icon: <Video size={20} />,
      color: "from-indigo-400 to-indigo-600"
    },
    {
      id: 2,
      title: "Career Path: Content Creation",
      description: "Learn how to build a successful career in content creation across various platforms",
      type: "guide",
      duration: "8 min read",
      icon: <Bookmark size={20} />,
      color: "from-green-400 to-green-600"
    },
    {
      id: 3,
      title: "Tech Interview Prep",
      description: "Master the art of technical interviews with our comprehensive guide",
      type: "course",
      duration: "45 min",
      icon: <Brain size={20} />,
      color: "from-amber-400 to-amber-600"
    }
  ];
  
  const wellnessActivities = [
    { id: 1, title: "Breathing Exercise", duration: "5 min", icon: <Activity size={16} /> },
    { id: 2, title: "Mindfulness Meditation", duration: "10 min", icon: <Brain size={16} /> },
    { id: 3, title: "Career Reflection", duration: "7 min", icon: <Coffee size={16} /> }
  ];
  
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Sidebar currentPage="dashboard" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-6 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CareerQuest</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              <Bell size={20} />
            </button>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div className="mb-4 md:mb-0">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-gray-800 dark:text-white"
            >
              Welcome back, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{user.name.split(' ')[0]}!</span> 👋
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 mt-2 flex items-center"
            >
              <Sparkles size={16} className="mr-2 text-amber-500" /> {currentQuote}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            <div className="hidden md:flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Level {user.level} Explorer</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-md">
              <Trophy size={18} className="mr-2" />
              <span className="font-medium">{user.points} points</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">{stat.label}</h3>
                <div className={`p-2 ${stat.color} text-white rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Progress & Recommendations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Quest Progress Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Quest Progress</h2>
                <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {completedTests}/{totalRequiredTests} completed
                </div>
              </div>
              
              <div className="mb-6">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-700" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Just starting</span>
                  <span>Quest Master</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate("/quest")}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                Continue Your Quest <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
            
            {/* Recommendations Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recommended For You</h2>
                <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium flex items-center">
                  View all <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {recommendedContent.map((item) => (
                  <div key={item.id} className={`bg-gradient-to-br ${item.color} p-5 rounded-xl text-white shadow-md hover:shadow-lg transition-shadow cursor-pointer`}>
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-xs opacity-80">{item.type} • {item.duration}</p>
                      </div>
                    </div>
                    <p className="text-sm opacity-90 mb-4">{item.description}</p>
                    <button className="text-white text-sm font-medium flex items-center opacity-90 hover:opacity-100">
                      Explore <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Upcoming Events Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <motion.div 
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className={`p-2 rounded mr-3 ${event.type === "workshop" ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300" : event.type === "event" ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300" : "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"}`}>
                      <Calendar size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 dark:text-white">{event.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{event.date} • {event.time}</p>
                    </div>
                    <button className="text-indigo-600 dark:text-indigo-400 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md">RSVP</button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Activity & Achievements */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Career Matches Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Career Matches</h2>
                <div className="text-sm font-medium text-green-600 dark:text-green-400">
                  <TrendingUp size={16} className="inline mr-1" /> +3 new
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/30">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
                    <Target size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-white">UX Designer</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-full bg-green-100 dark:bg-green-800 rounded-full h-1.5 mr-2">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">92%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
                    <MessageSquare size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-white">Content Creator</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-full bg-blue-100 dark:bg-blue-800 rounded-full h-1.5 mr-2">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">88%</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white mr-3">
                    <Users size={18} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 dark:text-white">Career Counselor</h3>
                    <div className="flex items-center mt-1">
                      <div className="w-full bg-purple-100 dark:bg-purple-800 rounded-full h-1.5 mr-2">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">85%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate("/discover")}
                className="w-full mt-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2.5 px-4 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
              >
                Explore More Careers <ChevronRight size={16} className="ml-2" />
              </button>
            </div>
            
            {/* Achievements Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Recent Achievements</h2>
              
              <div className="space-y-4">
                {recentAchievements.map(achievement => (
                  <motion.div 
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl cursor-pointer"
                  >
                    <div className={`w-10 h-10 ${achievement.color} rounded-full flex items-center justify-center text-white mr-3`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 dark:text-white">{achievement.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</p>
                    </div>
                    <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs px-2 py-1 rounded-full">
                      +{achievement.points}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Wellness Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-md">
              <h2 className="text-xl font-semibold mb-3">Mindful Moment</h2>
              <p className="text-indigo-100 mb-4">Take a break and focus on your wellbeing</p>
              
              <div className="space-y-2 mb-4">
                {wellnessActivities.map(activity => (
                  <div key={activity.id} className="flex items-center bg-white/10 p-2 rounded-lg">
                    {activity.icon}
                    <span className="ml-2 text-sm flex-1">{activity.title}</span>
                    <span className="text-xs opacity-80">{activity.duration}</span>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => navigate("/wellness")}
                className="w-full bg-white text-indigo-600 hover:bg-indigo-50 py-2.5 px-5 rounded-xl font-medium transition-colors"
              >
                Start Wellness Activity
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
