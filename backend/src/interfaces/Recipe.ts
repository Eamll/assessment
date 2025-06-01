export interface RecipeData {
  id: number;
  title: string;
  cuisine: string;
  difficulty: string;
  cookTime: number;
  servings: number;
  image: string;
  rating: number;
  ingredients: string[];
  description: string;
}

export interface RecipeFilters {
  cuisine?: string;
  difficulty?: string;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
}