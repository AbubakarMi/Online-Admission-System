import type { Application, User, Profile } from './types';

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@campus.connect', role: 'admin' },
  { id: '2', name: 'Jane Doe', email: 'jane.doe@campus.connect', role: 'student' },
];

export const mockApplications: Application[] = [
  { id: 'APP001', studentName: 'John Smith', studentId: '3', course: 'Computer Science', faculty: 'Science & Technology', submissionDate: '2024-05-10', status: 'Accepted' },
  { id: 'APP002', studentName: 'Emily Jones', studentId: '4', course: 'Business Administration', faculty: 'Business School', submissionDate: '2024-05-12', status: 'Under Review' },
  { id: 'APP003', studentName: 'Michael Brown', studentId: '5', course: 'Mechanical Engineering', faculty: 'Engineering', submissionDate: '2024-05-15', status: 'Submitted' },
  { id: 'APP004', studentName: 'Sarah Davis', studentId: '6', course: 'Fine Arts', faculty: 'Arts & Humanities', submissionDate: '2024-05-18', status: 'Rejected' },
  { id: 'APP005', studentName: 'David Wilson', studentId: '7', course: 'Psychology', faculty: 'Social Sciences', submissionDate: '2024-05-20', status: 'Under Review' },
  { id: 'APP006', studentName: 'Laura Taylor', studentId: '8', course: 'Biology', faculty: 'Science & Technology', submissionDate: '2024-05-21', status: 'Accepted' },
];

// Add Jane Doe's application for the logged-in student view
const janeDoeApplication: Application = {
  id: 'APP000', studentName: 'Jane Doe', studentId: '2', course: 'Data Science', faculty: 'Science & Technology', submissionDate: '2024-05-01', status: 'Under Review'
};
mockApplications.unshift(janeDoeApplication);

export const mockStudentProfile: Profile = {
    personal: {
      fullName: 'Jane Doe',
      dateOfBirth: '2003-04-12',
      gender: 'Female',
      nationality: 'American',
    },
    contact: {
      email: 'jane.doe@campus.connect',
      phone: '123-456-7890',
      address: '123 University Ave, College Town, USA',
    },
    academic: {
      highSchool: 'Central High School',
      graduationYear: 2021,
      gpa: 3.8,
    },
    documents: {
      transcript: null,
      recommendationLetter: null,
    },
  };

  export const mockDocuments = [
    { id: 'DOC001', applicantName: 'John Smith', documentType: 'Academic Transcript', submittedDate: '2024-05-10', status: 'Pending' },
    { id: 'DOC002', applicantName: 'John Smith', documentType: 'Recommendation Letter', submittedDate: '2024-05-10', status: 'Verified' },
    { id: 'DOC003', applicantName: 'Emily Jones', documentType: 'Academic Transcript', submittedDate: '2024-05-12', status: 'Pending' },
    { id: 'DOC004', applicantName: 'Michael Brown', documentType: 'Academic Transcript', submittedDate: '2024-05-15', status: 'Pending' },
    { id: 'DOC005', applicantName: 'Sarah Davis', documentType: 'Academic Transcript', submittedDate: '2024-05-18', status: 'Rejected' },
  ];
  
