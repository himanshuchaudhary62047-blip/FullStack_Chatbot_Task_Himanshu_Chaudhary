import type { CreateEnquiryInput, Enquiry, EnquiryStatus } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/enquiries';

export async function fetchEnquiries(params?: {
  search?: string;
  user_type?: string;
  status?: string;
}): Promise<Enquiry[]> {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append('search', params.search);
  if (params?.user_type && params.user_type !== 'All') queryParams.append('user_type', params.user_type);
  if (params?.status && params.status !== 'All') queryParams.append('status', params.status);

  const url = `${API_BASE_URL}?${queryParams.toString()}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to fetch enquiries.');
  }

  return data.data;
}

export async function fetchEnquiryById(id: string | number): Promise<Enquiry> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || `Failed to fetch enquiry #${id}.`);
  }

  return data.data;
}

export async function submitEnquiry(input: CreateEnquiryInput): Promise<Enquiry> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to submit enquiry.');
  }

  return data.data;
}

export async function updateEnquiryStatus(id: string | number, status: EnquiryStatus): Promise<Enquiry> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to update enquiry status.');
  }

  return data.data;
}

export async function deleteEnquiryApi(id: string | number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to delete enquiry.');
  }
}
