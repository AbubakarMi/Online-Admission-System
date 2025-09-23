// This is a server-side file!
'use server';

/**
 * @fileOverview Summarizes key information from all student applications for admin review.
 *
 * - summarizeApplications - A function that triggers the summarization process.
 * - SummarizeApplicationsInput - The input type for the summarizeApplications function (currently empty).
 * - SummarizeApplicationsOutput - The return type for the summarizeApplications function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema - currently empty, but can be extended in the future.
const SummarizeApplicationsInputSchema = z.object({});
export type SummarizeApplicationsInput = z.infer<typeof SummarizeApplicationsInputSchema>;

// Output schema for the summary.
const SummarizeApplicationsOutputSchema = z.object({
  summary: z.string().describe('A summary of the key information from all student applications.'),
});
export type SummarizeApplicationsOutput = z.infer<typeof SummarizeApplicationsOutputSchema>;

// Wrapper function to call the flow
export async function summarizeApplications(input: SummarizeApplicationsInput): Promise<SummarizeApplicationsOutput> {
  return summarizeApplicationsFlow(input);
}

const summarizeApplicationsPrompt = ai.definePrompt({
  name: 'summarizeApplicationsPrompt',
  input: {schema: SummarizeApplicationsInputSchema},
  output: {schema: SummarizeApplicationsOutputSchema},
  prompt: `You are an administrative assistant whose role is to summarize student applications to a university.

  Please provide a concise summary of the key information from all student applications.
  Focus on academic achievements, relevant experiences, and any notable qualities of the applicants.
  The summary should provide an overview of the applicant pool and help identify top candidates.
  `, // The actual data will come from a tool in a future step
});

const summarizeApplicationsFlow = ai.defineFlow(
  {
    name: 'summarizeApplicationsFlow',
    inputSchema: SummarizeApplicationsInputSchema,
    outputSchema: SummarizeApplicationsOutputSchema,
  },
  async input => {
    // In the future, a tool would be called here to retrieve
    // the actual application data. For now, the prompt is static.
    const {output} = await summarizeApplicationsPrompt(input);
    return output!;
  }
);
