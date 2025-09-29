
import { User } from './types';
import { supabase } from './supabase';

export async function getCurrentUser(): Promise<User | null> {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return null;
        }

        // Get user profile data from our users table
        const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            return null;
        }

        return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            role: profile.role,
            status: profile.status
        };
    } catch (error) {
        console.error("Failed to get current user", error);
        return null;
    }
}

export async function signUp(email: string, password: string, name: string, role: User['role'] = 'student'): Promise<{ user: User | null; error: string | null }> {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            return { user: null, error: error.message };
        }

        if (data.user) {
            // Create user profile
            const { error: profileError } = await supabase
                .from('users')
                .insert([
                    {
                        id: data.user.id,
                        name,
                        email,
                        role,
                        status: 'Active'
                    }
                ]);

            if (profileError) {
                return { user: null, error: profileError.message };
            }

            const user: User = {
                id: data.user.id,
                name,
                email,
                role,
                status: 'Active'
            };

            return { user, error: null };
        }

        return { user: null, error: 'Failed to create user' };
    } catch (error) {
        return { user: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: string | null }> {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return { user: null, error: error.message };
        }

        const user = await getCurrentUser();
        return { user, error: null };
    } catch (error) {
        return { user: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function logout(): Promise<void> {
    try {
        await supabase.auth.signOut();
    } catch (error) {
        console.error("Failed to logout", error);
    }
}

export async function isAuthenticated(): Promise<boolean> {
    const user = await getCurrentUser();
    return user !== null;
}

export async function requireAuth(): Promise<User> {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Authentication required');
    }
    return user;
}

export async function requireRole(requiredRole: User['role']): Promise<User> {
    const user = await requireAuth();
    if (user.role !== requiredRole && user.role !== 'admin') {
        throw new Error(`Access denied. Required role: ${requiredRole}`);
    }
    return user;
}
