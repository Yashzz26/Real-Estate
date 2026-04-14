import { motion } from "motion/react";
import { Search, Send } from "lucide-react";
import { useState } from "react";

const conversations = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "Is the property still available?",
    time: "2h ago",
    unread: 2,
    property: "Modern Luxury Villa",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    lastMessage: "I'd like to schedule a viewing",
    time: "5h ago",
    unread: 0,
    property: "Oceanfront Villa",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    lastMessage: "Thank you for the information!",
    time: "1d ago",
    unread: 0,
    property: "Urban Penthouse",
  },
];

const messages = [
  { id: "1", sender: "other", text: "Hi! Is the Modern Luxury Villa still available?", time: "2:30 PM" },
  { id: "2", sender: "me", text: "Yes, it's still available! Would you like to schedule a viewing?", time: "2:32 PM" },
  { id: "3", sender: "other", text: "That would be great! What times work for you?", time: "2:35 PM" },
];

export function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Record<string, typeof messages>>({
    "1": messages,
    "2": [
      { id: "1", sender: "other", text: "I'd like to schedule a viewing for the Oceanfront Villa.", time: "10:00 AM" },
      { id: "2", sender: "me", text: "Sure! Does tomorrow at 2 PM work for you?", time: "10:05 AM" }
    ],
    "3": [
      { id: "1", sender: "other", text: "Thank you for the information on the Urban Penthouse!", time: "Yesterday" }
    ]
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now().toString(),
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] || []), msg]
    }));
    setNewMessage("");
  };

  const currentMessages = chatHistory[selectedConversation.id] || [];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl mb-2 dark:text-white">Messages</h1>
        <p className="text-gray-600 dark:text-gray-400">Connect with buyers and sellers</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-y-auto h-[calc(600px-76px)]">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 ${
                  selectedConversation.id === conversation.id ? "bg-amber-50 dark:bg-amber-900/20" : ""
                }`}
              >
                <img src={conversation.avatar} alt={conversation.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="dark:text-white">{conversation.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{conversation.lastMessage}</p>
                  <p className="text-xs text-amber-600 mt-1">{conversation.property}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-amber-600 text-white text-xs rounded-full flex items-center justify-center">
                    {conversation.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="dark:text-white">{selectedConversation.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{selectedConversation.property}</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2.5 rounded-2xl ${
                    message.sender === "me"
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "me" ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-white"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
