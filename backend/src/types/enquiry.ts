export type UserType = 'Student' | 'Customer' | 'Other';
export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  user_type: UserType;
  service_or_course: string;
  message: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateEnquiryDTO {
  name: string;
  email: string;
  phone: string;
  user_type: UserType;
  service_or_course: string;
  message: string;
}

export interface UpdateEnquiryDTO {
  status?: EnquiryStatus;
  name?: string;
  email?: string;
  phone?: string;
  user_type?: UserType;
  service_or_course?: string;
  message?: string;
}
