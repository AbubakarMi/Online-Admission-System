
'use server';

import { summarizeApplications } from '@/ai/flows/admin-summarize-applications';
import { z } from 'zod';

const summarySchema = z.object({});

export async function getApplicationSummary(prevState: any, formData: FormData) {
  try {
    const validatedFields = summarySchema.safeParse({});
    if (!validatedFields.success) {
      return { message: null, error: 'Invalid input.' };
    }
    // In a real app, you might pass application data here.
    const result = await summarizeApplications({});
    return { message: result.summary, error: null };
  } catch (error) {
    console.error(error);
    return { message: null, error: 'Failed to generate summary. Please try again.' };
  }
}
