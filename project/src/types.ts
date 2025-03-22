export interface Message {
  role: 'user' | 'assistant';
  content: string;
  category?: 'sales' | 'hr' | 'finance' | 'technical' | 'general';
  priority?: 'low' | 'medium' | 'high';
  needsEscalation?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  context?: string;
  language: string;  // ✅ Added language property
}

export interface Category {
  name: 'sales' | 'hr' | 'finance' | 'technical' | 'general';
  keywords: string[];
}
