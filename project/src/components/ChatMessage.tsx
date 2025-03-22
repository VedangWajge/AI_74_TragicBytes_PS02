import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '../types';
import clsx from 'clsx';

interface ChatMessageProps {
  message: Message;
}

const categoryColors = {
  sales: 'bg-green-50 border-green-100',
  hr: 'bg-purple-50 border-purple-100',
  finance: 'bg-blue-50 border-blue-100',
  technical: 'bg-orange-50 border-orange-100',
  general: 'bg-gray-50 border-gray-100'
};

const categoryBadgeColors = {
  sales: 'bg-green-100 text-green-700 border-green-200',
  hr: 'bg-purple-100 text-purple-700 border-purple-200',
  finance: 'bg-blue-100 text-blue-700 border-blue-200',
  technical: 'bg-orange-100 text-orange-700 border-orange-200',
  general: 'bg-gray-100 text-gray-700 border-gray-200'
};

const categoryLabels = {
  sales: 'Sales',
  hr: 'HR',
  finance: 'Finance',
  technical: 'Technical',
  general: 'General'
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'assistant';

  return (
    <div
      className={clsx(
        'flex items-start gap-4 p-6 rounded-xl border shadow-sm transition-all duration-200',
        message.category ? categoryColors[message.category] : 'bg-gray-50 border-gray-100'
      )}
    >
      <div className={clsx(
        'w-10 h-10 rounded-xl flex items-center justify-center shadow-sm',
        isBot ? 'bg-gradient-to-br from-blue-600 to-indigo-600' : 'bg-gradient-to-br from-gray-700 to-gray-800'
      )}>
        {isBot ? (
          <Bot className="w-6 h-6 text-white" />
        ) : (
          <User className="w-6 h-6 text-white" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm font-semibold text-gray-900">
            {isBot ? 'AI Assistant' : 'You'}
          </p>
          {message.category && (
            <span className={clsx(
              'text-xs px-2.5 py-1 rounded-full border font-medium',
              categoryBadgeColors[message.category]
            )}>
              {categoryLabels[message.category]}
            </span>
          )}
        </div>
        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
          {message.content}
        </p>
      </div>
    </div>
  );
};