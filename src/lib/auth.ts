import { User } from './types';
import { mockUsers } from './data';

// In a real app, this would involve session management, cookies, etc.
// For this prototype, we'll just return a hardcoded user.
// You can change 'admin' to 'student' to test different roles.
export async function getCurrentUser(): Promise<User | null> {
  const role: 'admin' | 'student' = 'admin'; // CHANGE THIS TO 'admin' TO SEE ADMIN VIEW
  
  if (role === 'admin') {
    return mockUsers.find(u => u.role === 'admin') || null;
  }
  return mockUsers.find(u => u.role === 'student') || null;
}
