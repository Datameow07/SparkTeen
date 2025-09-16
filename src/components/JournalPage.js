import React, { useState } from "react";
import { Book, Smile, Lightbulb, Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function JournalPage({ user, notifications, theme, setTheme, onLogout }) {
    const [entries, setEntries] = useState([
        { id: 1, date: "2023-10-25", content: "Today I learned about different career paths in design and technology. I'm particularly interested in UX design because it combines creativity with problem-solving.", mood: "happy" },
        { id: 2, date: "2023-10-24", content: "Had a conversation with a graphic designer today. It was inspiring to hear how she turned her passion into a career.", mood: "inspired" },
        { id: 3, date: "2023-10-22", content: "Feeling a bit uncertain about my career direction. Maybe I should explore more options before deciding.", mood: "thoughtful" }
    ]);
    
    const [newEntry, setNewEntry] = useState("");
    const [currentMood, setCurrentMood] = useState("happy");
    
    const handleAddEntry = () => {
        if (!newEntry.trim()) return;
        
        const newEntryObj = {
            id: entries.length + 1,
            date: new Date().toISOString().split('T')[0],
            content: newEntry,
            mood: currentMood
        };
        
        setEntries([newEntryObj, ...entries]);
        setNewEntry("");
    };
    
    const moodIcons = {
        happy: <Smile className="text-yellow-500" />,
        sad: <div>😢</div>,
        excited: <div>🎉</div>,
        inspired: <Lightbulb className="text-purple-500" />,
        thoughtful: <Brain className="text-blue-500" />,
        tired: <div>😴</div>
    };
    
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar currentPage="journal" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
            <main className="flex-1 p-4 md:p-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Reflection Journal</h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Document your thoughts, ideas, and career exploration journey</p>
                        </div>
                        
                        <div className="flex items-center bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-4 py-2 rounded-full">
                            <Book size={18} className="mr-2" />
                            <span className="font-medium">{entries.length} entries</span>
                        </div>
                    </div>
                </motion.div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">New Journal Entry</h3>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">How are you feeling today?</label>
                            <div className="flex space-x-2">
                                {Object.entries(moodIcons).map(([mood, icon]) => (
                                    <button
                                        key={mood}
                                        onClick={() => setCurrentMood(mood)}
                                        className={`p-2 rounded-lg ${currentMood === mood ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What's on your mind?</label>
                            <textarea
                                value={newEntry}
                                onChange={(e) => setNewEntry(e.target.value)}
                                placeholder="Reflect on your day, career thoughts, ideas, or anything else..."
                                className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        
                        <button 
                            onClick={handleAddEntry}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                        >
                            Save Entry
                        </button>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Journal Prompts</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                <p className="text-blue-800 dark:text-blue-200 text-sm">What career-related skills do I enjoy using the most?</p>
                            </div>
                            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                                <p className="text-green-800 dark:text-green-200 text-sm">What would I do for work if money wasn't a concern?</p>
                            </div>
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                                <p className="text-purple-800 dark:text-purple-200 text-sm">What problems in the world do I feel drawn to solve?</p>
                            </div>
                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                                <p className="text-yellow-800 dark:text-yellow-200 text-sm">Who do I admire professionally and why?</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
                >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Previous Entries</h3>
                    
                    {entries.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-300 text-center py-8">No journal entries yet. Start writing to reflect on your journey!</p>
                    ) : (
                        <div className="space-y-4">
                            {entries.map(entry => (
                                <div key={entry.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{entry.date}</span>
                                        <div className="flex items-center">
                                            {moodIcons[entry.mood]}
                                            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400 capitalize">{entry.mood}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">{entry.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}

export default JournalPage;
