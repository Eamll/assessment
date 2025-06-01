import { IRecipeRepository } from './IRecipeRepository';
import { JsonRecipeRepository } from './JsonRecipeRepository';
import { TypeOrmRecipeRepository } from './TypeOrmRecipeRepository';
import { getEnvironmentConfig } from '../config/environment';
import { initializeDatabase } from '../data-source';

export class RepositoryFactory {
  private static recipeRepository: IRecipeRepository | null = null;

  static async createRecipeRepository(): Promise<IRecipeRepository> {
    if (this.recipeRepository) {
      return this.recipeRepository;
    }

    const config = getEnvironmentConfig();

    switch (config.dataSource) {
      case 'typeorm':
        await initializeDatabase();
        this.recipeRepository = new TypeOrmRecipeRepository();
        break;
      case 'json':
      default:
        this.recipeRepository = new JsonRecipeRepository(config.jsonDbPath);
        break;
    }

    return this.recipeRepository;
  }

  static reset(): void {
    this.recipeRepository = null;
  }
}