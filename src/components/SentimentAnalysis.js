import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, Lightbulb, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function SentimentAnalysis({ user, theme, setTheme, onLogout }) {
    const navigate = useNavigate();
    
    // Sample sentiment data based on journal entries
    const sentimentData = {
        overall: 72, // Positive score out of 100
        trends: [
            { day: 'Mon', sentiment: 65 },
            { day: 'Tue', sentiment: 70 },
            { day: 'Wed', sentiment: 80 },
            { day: 'Thu', sentiment: 75 },
            { day: 'Fri', sentiment: 85 },
            { day: 'Sat', sentiment: 60 },
            { day: 'Sun', sentiment: 68 },
        ],
        emotions: [
            { name: 'Joy', value: 35 },
            { name: 'Anticipation', value: 25 },
            { name: 'Trust', value: 20 },
            { name: 'Fear', value: 10 },
            { name: 'Surprise', value: 5 },
            { name: 'Sadness', value: 3 },
            { name: 'Disgust', value: 1 },
            { name: 'Anger', value: 1 },
        ],
        insights: [
            "You tend to feel more positive when writing about creative activities",
            "Your mood dips on weekends - consider planning enjoyable activities",
            "Career exploration topics generate excitement and anticipation",
            "You express trust when discussing mentorship and guidance"
        ]
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
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8"
                    >
                        <div className="flex items-center mb-6">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-2xl mr-4">
                                <Brain size={24} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sentiment Analysis</h1>
                                <p className="text-gray-600 dark:text-gray-300">Understanding your emotional patterns through journal entries</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl text-center">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-300 mb-1">{sentimentData.overall}%</div>
                                <div className="text-sm text-blue-800 dark:text-blue-200">Overall Positive Sentiment</div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl text-center">
                                <div className="text-3xl font-bold text-green-600 dark:text-green-300 mb-1">12</div>
                                <div className="text-sm text-green-800 dark:text-green-200">Entries Analyzed</div>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl text-center">
                                <div className="text-3xl font-bold text-purple-600 dark:text-purple-300 mb-1">3.2</div>
                                <div className="text-sm text-purple-800 dark:text-purple-200">Avg. Entries/Week</div>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Weekly Sentiment Trend</h3>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                <div className="flex items-end justify-between h-32">
                                    {sentimentData.trends.map((day, index) => (
                                        <div key={index} className="flex flex-col items-center">
                                            <div 
                                                className="bg-indigo-500 dark:bg-indigo-400 rounded-t w-8 transition-all hover:bg-indigo-600 dark:hover:bg-indigo-500" 
                                                style={{ height: `${day.sentiment}%` }}
                                                title={`${day.sentiment}% positive`}
                                            ></div>
                                            <span className="text-xs text-gray-600 dark:text-gray-300 mt-2">{day.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Emotional Breakdown</h3>
                                <div className="space-y-2">
                                    {sentimentData.emotions.map((emotion, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{emotion.name}</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">{emotion.value}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div 
                                                    className="bg-indigo-600 h-2 rounded-full" 
                                                    style={{ width: `${emotion.value}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Key Insights</h3>
                                <div className="space-y-3">
                                    {sentimentData.insights.map((insight, index) => (
                                        <div key={index} className="flex items-start p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                                            <Lightbulb size={16} className="text-yellow-600 dark:text-yellow-300 mr-2 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-yellow-800 dark:text-yellow-200">{insight}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Tips for Emotional Well-being</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                <li>Practice gratitude journaling to boost positive emotions</li>
                                <li>Engage in regular physical activity to reduce stress</li>
                                <li>Maintain social connections for emotional support</li>
                                <li>Set aside time for hobbies and activities you enjoy</li>
                                <li>Consider speaking with a counselor if negative patterns persist</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

export default SentimentAnalysis;
