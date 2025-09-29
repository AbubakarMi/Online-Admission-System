import { supabase } from './supabase';
import { Application, User } from './types';

export async function getApplications(): Promise<Application[]> {
    try {
        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching applications:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching applications:', error);
        return [];
    }
}

export async function getApplicationsByUser(userId: string): Promise<Application[]> {
    try {
        const { data, error } = await supabase
            .from('applications')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching user applications:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching user applications:', error);
        return [];
    }
}

export async function createApplication(application: Omit<Application, 'id'>): Promise<{ application: Application | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('applications')
            .insert([application])
            .select()
            .single();

        if (error) {
            return { application: null, error: error.message };
        }

        return { application: data, error: null };
    } catch (error) {
        return { application: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function updateApplication(id: string, updates: Partial<Application>): Promise<{ application: Application | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('applications')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return { application: null, error: error.message };
        }

        return { application: data, error: null };
    } catch (error) {
        return { application: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function deleteApplication(id: string): Promise<{ error: string | null }> {
    try {
        const { error } = await supabase
            .from('applications')
            .delete()
            .eq('id', id);

        if (error) {
            return { error: error.message };
        }

        return { error: null };
    } catch (error) {
        return { error: error instanceof Error ? error.message : 'Unknown error' };
    }
}

export async function getUsers(): Promise<User[]> {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching users:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export async function updateUser(id: string, updates: Partial<User>): Promise<{ user: User | null; error: string | null }> {
    try {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return { user: null, error: error.message };
        }

        return { user: data, error: null };
    } catch (error) {
        return { user: null, error: error instanceof Error ? error.message : 'Unknown error' };
    }
}