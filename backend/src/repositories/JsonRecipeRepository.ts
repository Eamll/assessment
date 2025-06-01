import fs from 'fs/promises';
import path from 'path';
import { IRecipeRepository } from './IRecipeRepository';
import { RecipeData, RecipeFilters, PaginationOptions } from '../types/Recipe';

export class JsonRecipeRepository implements IRecipeRepository {
  private dbPath: string;

  constructor(dbPath: string = path.join(__dirname, '../../db.json')) {
    this.dbPath = dbPath;
  }

  private async readData(): Promise<{ recipes: RecipeData[] }> {
    try {
      const data = await fs.readFile(this.dbPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading JSON file:', error);
      return { recipes: [] };
    }
  }

  private async writeData(data: { recipes: RecipeData[] }): Promise<void> {
    try {
      await fs.writeFile(this.dbPath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing JSON file:', error);
      throw error;
    }
  }

  async findAll(filters?: RecipeFilters, pagination?: PaginationOptions): Promise<RecipeData[]> {
    const data = await this.readData();
    let recipes = data.recipes;

    if (filters?.cuisine) {
      recipes = recipes.filter(recipe => 
        recipe.cuisine.toLowerCase().includes(filters.cuisine!.toLowerCase())
      );
    }

    if (filters?.difficulty) {
      recipes = recipes.filter(recipe => 
        recipe.difficulty.toLowerCase().includes(filters.difficulty!.toLowerCase())
      );
    }

    if (pagination) {
      const page = pagination.page || 1;
      const limit = pagination.limit || recipes.length;
      const skip = (page - 1) * limit;
      recipes = recipes.slice(skip, skip + limit);
    }

    return recipes;
  }

  async findById(id: number): Promise<RecipeData | null> {
    const data = await this.readData();
    const recipe = data.recipes.find(r => r.id === id);
    return recipe || null;
  }

  async create(recipe: Omit<RecipeData, 'id'>): Promise<RecipeData> {
    const data = await this.readData();
    const newId = Math.max(...data.recipes.map(r => r.id), 0) + 1;
    const newRecipe: RecipeData = { ...recipe, id: newId };
    
    data.recipes.push(newRecipe);
    await this.writeData(data);
    
    return newRecipe;
  }

  async update(id: number, recipeUpdate: Partial<RecipeData>): Promise<RecipeData | null> {
    const data = await this.readData();
    const recipeIndex = data.recipes.findIndex(r => r.id === id);
    
    if (recipeIndex === -1) {
      return null;
    }

    data.recipes[recipeIndex] = { ...data.recipes[recipeIndex], ...recipeUpdate, id };
    await this.writeData(data);
    
    return data.recipes[recipeIndex];
  }

  async delete(id: number): Promise<boolean> {
    const data = await this.readData();
    const recipeIndex = data.recipes.findIndex(r => r.id === id);
    
    if (recipeIndex === -1) {
      return false;
    }

    data.recipes.splice(recipeIndex, 1);
    await this.writeData(data);
    
    return true;
  }
}