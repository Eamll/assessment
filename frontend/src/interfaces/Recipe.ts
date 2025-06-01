export interface Recipe {
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
  _page?: number;
  _limit?: number;
}

export interface RecipeFormData {
  title: string;
  cuisine: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cookTime: number;
  servings: number;
  image: string;
  rating: number;
  ingredients: string[];
  description: string;
}

export interface RecipeFormErrors {
  title?: string;
  cuisine?: string;
  difficulty?: string;
  cookTime?: string;
  servings?: string;
  image?: string;
  rating?: string;
  ingredients?: string;
  description?: string;
}