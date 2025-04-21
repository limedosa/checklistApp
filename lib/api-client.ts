import { Category } from "@/components/checklist-builder";
import { fetchWithAuth } from "@/lib/auth-client";

export type ApiChecklist = {
  id: string;
  name: string;
  categories: Category[];
  isCloned?: boolean;
  clonedFrom?: string;
  created_at: string;
  updated_at: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Function to handle HTTP errors
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || `HTTP error ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json();
};

// Checklist API functions with authentication
export async function fetchChecklists() {
  try {
    const response = await fetch('/api/checklists', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Ensure credentials are included for session cookies
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching checklists:', error);
    throw error;
  }
}

export const fetchChecklist = async (id: string): Promise<ApiChecklist> => {
  const response = await fetchWithAuth(`${API_URL}/checklists/${id}`);
  return handleResponse(response);
};

export const createChecklist = async (checklist: Omit<ApiChecklist, "id" | "created_at" | "updated_at">): Promise<ApiChecklist> => {
  const response = await fetchWithAuth(`${API_URL}/checklists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checklist),
  });
  return handleResponse(response);
};

export const updateChecklist = async (id: string, checklist: Partial<ApiChecklist>): Promise<ApiChecklist> => {
  const response = await fetchWithAuth(`${API_URL}/checklists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checklist),
  });
  return handleResponse(response);
};

export const deleteChecklist = async (id: string): Promise<void> => {
  const response = await fetchWithAuth(`${API_URL}/checklists/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response);
};

export const cloneChecklist = async (id: string, newName?: string): Promise<ApiChecklist> => {
  const url = new URL(`${API_URL}/checklists/${id}/clone`);
  if (newName) {
    url.searchParams.append("new_name", newName);
  }
  
  const response = await fetchWithAuth(url.toString(), {
    method: "POST",
  });
  return handleResponse(response);
};