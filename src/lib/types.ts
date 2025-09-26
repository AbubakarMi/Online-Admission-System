export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'staff';
};

export type Application = {
  id:string;
  studentName: string;
  studentId: string;
  course: string;
  faculty: string;
  submissionDate: string;
  status: 'Submitted' | 'Under Review' | 'Accepted' | 'Rejected' | 'Correction Requested';
};

export type Profile = {
  personal: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  academic: {
    highSchool: string;
    graduationYear: number;
    gpa: number;
  };
  documents: {
    transcript?: File | null;
    recommendationLetter?: File | null;
  };
};

export type Reviewer = {
  id: string;
  name: string;
  email: string;
  assignedApplications: number;
  status: 'Active' | 'Inactive';
};

export type Notification = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  link: string;
};
