
import { User } from './types';

// In a real app, this would involve session management, cookies, etc.
// For this prototype, we'll check session storage.
export async function getCurrentUser(): Promise<User | null> {
    if (typeof window === 'undefined') {
        return null; // Cannot access sessionStorage on the server
    }
    
    const userJson = sessionStorage.getItem('currentUser');
    if (userJson) {
        try {
            return JSON.parse(userJson) as User;
        } catch (error) {
            console.error("Failed to parse user from sessionStorage", error);
            return null;
        }
    }
    return null;
}
