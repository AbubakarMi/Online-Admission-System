"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { getApplicationSummary } from '@/lib/actions';
import { Bot, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState: { message: string | null; error: string | null } = {
  message: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
         <Bot className="mr-2 h-4 w-4" />
          Generate Summary
        </>
      )}
    </Button>
  );
}

export function ApplicationSummary() {
  const [state, formAction] = useFormState(getApplicationSummary, initialState);

  return (
    <div className="space-y-4">
      <form action={formAction}>
        <SubmitButton />
      </form>
      
      {state.error && (
         <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {state.message && (
        <Alert>
            <Bot className="h-4 w-4" />
            <AlertTitle>AI Summary</AlertTitle>
            <AlertDescription>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                    {state.message.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                    ))}
                </div>
            </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
