import { RecipeData, RecipeFilters, PaginationOptions } from "../interfaces";

export interface IRecipeRepository {
  findAll(filters?: RecipeFilters, pagination?: PaginationOptions): Promise<RecipeData[]>;
  findById(id: number): Promise<RecipeData | null>;
  create(recipe: Omit<RecipeData, 'id'>): Promise<RecipeData>;
  update(id: number, recipe: Partial<RecipeData>): Promise<RecipeData | null>;
  delete(id: number): Promise<boolean>;
}