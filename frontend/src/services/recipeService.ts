import { apiEndpoints } from "../config/api";
import { Recipe, RecipeFilters } from "../interfaces";

export class RecipeService {
  static async getRecipes(filters?: RecipeFilters): Promise<Recipe[]> {
    const url = new URL(apiEndpoints.recipes);

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }

    return response.json();
  }

  static async getRecipe(id: number): Promise<Recipe> {
    const response = await fetch(apiEndpoints.recipe(id));
    if (!response.ok) {
      throw new Error(`Failed to fetch recipe: ${response.statusText}`);
    }

    return response.json();
  }

  static async createRecipe(recipe: Omit<Recipe, "id">): Promise<Recipe> {
    const response = await fetch(apiEndpoints.recipes, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error(`Failed to create recipe: ${response.statusText}`);
    }

    return response.json();
  }

  static async updateRecipe(
    id: number,
    recipe: Partial<Recipe>
  ): Promise<Recipe> {
    const response = await fetch(apiEndpoints.recipe(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error(`Failed to update recipe: ${response.statusText}`);
    }

    return response.json();
  }

  static async deleteRecipe(id: number): Promise<void> {
    const response = await fetch(apiEndpoints.recipe(id), {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete recipe: ${response.statusText}`);
    }
  }
}
