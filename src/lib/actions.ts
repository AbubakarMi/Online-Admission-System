
'use server';

import { summarizeApplications } from '@/ai/flows/admin-summarize-applications';
import { z } from 'zod';
import { getApplications, createApplication, updateApplication, deleteApplication } from './database';
import { Application, User } from './types';
import { signIn, signUp } from './auth';

const summarySchema = z.object({});

export async function getApplicationSummary(
  prevState: { message: string | null; error: string | null },
  formData: FormData
): Promise<{ message: string | null; error: string | null }> {
  try {
    const validatedFields = summarySchema.safeParse({});
    if (!validatedFields.success) {
      return { message: null, error: 'Invalid input.' };
    }

    const applications = await getApplications();
    const result = await summarizeApplications({ applications });
    return { message: result.summary, error: null };
  } catch (error) {
    console.error(error);
    return { message: null, error: 'Failed to generate summary. Please try again.' };
  }
}

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function loginAction(
  prevState: { message: string | null; error: string | null },
  formData: FormData
): Promise<{ message: string | null; error: string | null }> {
  try {
    const validatedFields = loginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return { message: null, error: 'Invalid email or password format.' };
    }

    const { email, password } = validatedFields.data;
    const { user, error } = await signIn(email, password);

    if (error) {
      return { message: null, error };
    }

    return { message: 'Login successful!', error: null };
  } catch (error) {
    console.error(error);
    return { message: null, error: 'Login failed. Please try again.' };
  }
}

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['student', 'admin', 'staff']).optional().default('student'),
});

export async function signupAction(
  prevState: { message: string | null; error: string | null },
  formData: FormData
): Promise<{ message: string | null; error: string | null }> {
  try {
    const validatedFields = signupSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role') || 'student',
    });

    if (!validatedFields.success) {
      return { message: null, error: 'Invalid form data.' };
    }

    const { name, email, password, role } = validatedFields.data;
    const { user, error } = await signUp(email, password, name, role);

    if (error) {
      return { message: null, error };
    }

    return { message: 'Account created successfully! Please check your email to verify your account.', error: null };
  } catch (error) {
    console.error(error);
    return { message: null, error: 'Signup failed. Please try again.' };
  }
}

const applicationSchema = z.object({
  studentName: z.string().min(2, 'Student name is required'),
  studentId: z.string().min(1, 'Student ID is required'),
  course: z.string().min(1, 'Course is required'),
  faculty: z.string().min(1, 'Faculty is required'),
});

export async function createApplicationAction(
  prevState: { message: string | null; error: string | null },
  formData: FormData
): Promise<{ message: string | null; error: string | null }> {
  try {
    const validatedFields = applicationSchema.safeParse({
      studentName: formData.get('studentName'),
      studentId: formData.get('studentId'),
      course: formData.get('course'),
      faculty: formData.get('faculty'),
    });

    if (!validatedFields.success) {
      return { message: null, error: 'Invalid application data.' };
    }

    const applicationData = {
      ...validatedFields.data,
      submissionDate: new Date().toISOString(),
      status: 'Submitted' as const,
    };

    const { application, error } = await createApplication(applicationData);

    if (error) {
      return { message: null, error };
    }

    return { message: 'Application submitted successfully!', error: null };
  } catch (error) {
    console.error(error);
    return { message: null, error: 'Failed to submit application. Please try again.' };
  }
}
