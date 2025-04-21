// Add or modify your Checklist type

export type Checklist = {
  id: string;
  name: string;
  categories: Category[];
  userId: string; // Add this field
  isCloned?: boolean;
  clonedFrom?: string;
  created_at: string;
  updated_at: string;
};