import { Repository, Like, FindManyOptions } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Recipe } from '../entities/Recipe';
import { IRecipeRepository } from './IRecipeRepository';
import { RecipeData, RecipeFilters, PaginationOptions } from '../types/Recipe';

export class TypeOrmRecipeRepository implements IRecipeRepository {
  private repository: Repository<Recipe>;

  constructor() {
    this.repository = AppDataSource.getRepository(Recipe);
  }

  async findAll(filters?: RecipeFilters, pagination?: PaginationOptions): Promise<RecipeData[]> {
    const findOptions: FindManyOptions<Recipe> = {};

    if (pagination) {
      const page = pagination.page || 1;
      const limit = pagination.limit || 10;
      findOptions.skip = (page - 1) * limit;
      findOptions.take = limit;
    }

    const where: any = {};
    
    if (filters?.cuisine) {
      where.cuisine = Like(`%${filters.cuisine}%`);
    }
    
    if (filters?.difficulty) {
      where.difficulty = Like(`%${filters.difficulty}%`);
    }

    if (Object.keys(where).length > 0) {
      findOptions.where = where;
    }

    const recipes = await this.repository.find(findOptions);
    return recipes.map(this.entityToData);
  }

  async findById(id: number): Promise<RecipeData | null> {
    const recipe = await this.repository.findOne({ where: { id } });
    return recipe ? this.entityToData(recipe) : null;
  }

  async create(recipeData: Omit<RecipeData, 'id'>): Promise<RecipeData> {
    const recipe = this.repository.create(recipeData);
    const savedRecipe = await this.repository.save(recipe);
    return this.entityToData(savedRecipe);
  }

  async update(id: number, recipeUpdate: Partial<RecipeData>): Promise<RecipeData | null> {
    const result = await this.repository.update(id, recipeUpdate);
    
    if (result.affected === 0) {
      return null;
    }

    const updatedRecipe = await this.repository.findOne({ where: { id } });
    return updatedRecipe ? this.entityToData(updatedRecipe) : null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  private entityToData(entity: Recipe): RecipeData {
    return {
      id: entity.id,
      title: entity.title,
      cuisine: entity.cuisine,
      difficulty: entity.difficulty,
      cookTime: entity.cookTime,
      servings: entity.servings,
      image: entity.image,
      rating: entity.rating,
      ingredients: entity.ingredients,
      description: entity.description,
    };
  }
}