import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email or username is required'),
  password: z.string().min(1, 'Password is required'),
})

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Please enter a valid email address'),
})

export const academicHistorySchema = z.object({
  school: z.string().min(1, 'School name is required').max(100, 'School name is too long'),
  gpa: z.number()
    .min(0, 'GPA cannot be negative')
    .max(4.0, 'GPA cannot exceed 4.0')
    .refine((val) => Number(val.toFixed(2)) === val, 'GPA can have at most 2 decimal places'),
  graduationYear: z.number()
    .min(1950, 'Graduation year seems too old')
    .max(new Date().getFullYear() + 1, 'Graduation year cannot be in the future'),
})

export const programSelectionSchema = z.object({
  faculty: z.string().min(1, 'Please select a faculty'),
  course: z.string().min(1, 'Please select a course'),
  essay: z.string()
    .min(50, 'Personal essay must be at least 50 characters')
    .max(2000, 'Personal essay cannot exceed 2000 characters'),
})

export const documentUploadSchema = z.object({
  transcript: z.instanceof(File).optional(),
  recommendationLetter: z.instanceof(File).optional(),
})

export const fullApplicationSchema = personalInfoSchema
  .merge(academicHistorySchema)
  .merge(programSelectionSchema)
  .merge(documentUploadSchema)

export type LoginFormData = z.infer<typeof loginSchema>
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>
export type AcademicHistoryFormData = z.infer<typeof academicHistorySchema>
export type ProgramSelectionFormData = z.infer<typeof programSelectionSchema>
export type DocumentUploadFormData = z.infer<typeof documentUploadSchema>
export type FullApplicationFormData = z.infer<typeof fullApplicationSchema>

export function validateFileUpload(file: File | null, maxSizeInMB: number = 5): string | null {
  if (!file) return null

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024

  if (file.size > maxSizeInBytes) {
    return `File size must be less than ${maxSizeInMB}MB`
  }

  if (!file.type.includes('pdf')) {
    return 'Only PDF files are allowed'
  }

  return null
}