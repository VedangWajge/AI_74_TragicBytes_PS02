import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, Sparkles, Globe } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import type { Message, ChatState } from './types';
import { detectCategory, shouldEscalate } from './utils/categoryDetection';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_CONTEXT = `You are an Enterprise AI Assistant for IDMS Infotech...`;

const SUPPORTED_LANGUAGES = {
  en: 'English',
  hi: 'Hindi',
  es: 'Spanish',
  fr: 'French'
};

function App() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    context: 'enterprise',
    language: 'en'
  });

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChatState(prev => ({ ...prev, language: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatState.isLoading) return;

    const category = detectCategory(input);
    const needsEscalation = shouldEscalate(input);

    const userMessage: Message = {
      role: 'user',
      content: input,
      category,
      needsEscalation
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));
    setInput('');

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: SYSTEM_CONTEXT },
          ...chatState.messages.map(msg => ({ role: msg.role, content: msg.content })),
          {
            role: 'user',
            content: `[Language: ${chatState.language}] [Category: ${category}]${needsEscalation ? ' [Needs Escalation]' : ''}\n\n${input}`
          }
        ],
      });

      if (!completion.choices[0]?.message?.content) throw new Error('No response from OpenAI');

      const assistantMessage: Message = {
        role: 'assistant',
        content: completion.choices[0].message.content,
        category,
        needsEscalation
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false
      }));
    } catch (error) {
      console.error('Error:', error);

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, {
          role: 'assistant',
          content: `I encountered an error. Please try again.`,
          category: 'technical',
          needsEscalation: true
        }],
        isLoading: false
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1557683311-eac922347aa1?q=80&w=2940')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen backdrop-blur-sm bg-gray-900/70 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-200/20">
          
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
            <div className="absolute inset-0 bg-grid-white/10 pointer-events-none" />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    AI Sentinel <Sparkles className="w-5 h-5 text-yellow-300" />
                  </h1>
                  <p className="text-blue-100 mt-2">Your enterprise support assistant</p>
                </div>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-white" />
                <select
                  value={chatState.language}
                  onChange={handleLanguageChange}
                  className="px-3 py-2 rounded-md border border-white/30 bg-white/20 text-white text-sm focus:ring-2 focus:ring-white 
                    hover:border-white/50 transition duration-200 cursor-pointer"
                >
                  {Object.entries(SUPPORTED_LANGUAGES).map(([key, name]) => (
                    <option key={key} value={key} className="text-black">{name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="h-[600px] flex flex-col bg-gradient-to-b from-gray-50 to-white">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {chatState.messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
                  <Bot className="w-16 h-16 text-gray-400" />
                  <p className="text-lg">How can I assist you today?</p>
                </div>
              )}
              {chatState.messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {chatState.isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 
                    transition duration-200"
                  disabled={chatState.isLoading}
                />
                <button 
                  type="submit" 
                  disabled={chatState.isLoading} 
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2 transition duration-200
                    hover:bg-blue-700 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
