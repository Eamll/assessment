export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiEndpoints = {
  recipes: `${API_BASE_URL}/recipes`,
  recipe: (id: number) => `${API_BASE_URL}/recipes/${id}`,
} as const;