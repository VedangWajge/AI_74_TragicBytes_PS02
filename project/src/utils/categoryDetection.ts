import type { Category } from '../types';

export const categories: Category[] = [
  {
    name: 'sales',
    keywords: ['sales', 'customer', 'deal', 'revenue', 'pipeline', 'lead', 'opportunity', 'commission']
  },
  {
    name: 'hr',
    keywords: ['employee', 'leave', 'salary', 'benefits', 'recruitment', 'payroll', 'attendance']
  },
  {
    name: 'finance',
    keywords: ['invoice', 'payment', 'expense', 'budget', 'tax', 'accounting', 'reimbursement']
  },
  {
    name: 'technical',
    keywords: ['error', 'bug', 'system', 'login', 'password', 'access', 'software', 'update']
  }
];

export function detectCategory(message: string): Category['name'] {
  const lowercaseMessage = message.toLowerCase();
  
  for (const category of categories) {
    if (category.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
      return category.name;
    }
  }
  
  return 'general';
}

export function shouldEscalate(message: string): boolean {
  const escalationTriggers = [
    'urgent',
    'emergency',
    'critical',
    'broken',
    'not working',
    'failed',
    'error',
    'help immediately',
    'serious issue'
  ];
  
  const lowercaseMessage = message.toLowerCase();
  return escalationTriggers.some(trigger => lowercaseMessage.includes(trigger));
}