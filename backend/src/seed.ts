import "reflect-metadata";
import { AppDataSource, initializeDatabase } from "./data-source";
import { Recipe } from "./entities/Recipe";
import recipesData from "../db.json";

const seedDatabase = async () => {
  try {
    await initializeDatabase();
    const recipeRepository = AppDataSource.getRepository(Recipe);
    
    const existingRecipes = await recipeRepository.count();
    if (existingRecipes > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    console.log("Seeding database with recipe data...");
    
    for (const recipeData of recipesData.recipes) {
      const recipe = new Recipe();
      recipe.id = recipeData.id;
      recipe.title = recipeData.title;
      recipe.cuisine = recipeData.cuisine;
      recipe.difficulty = recipeData.difficulty;
      recipe.cookTime = recipeData.cookTime;
      recipe.servings = recipeData.servings;
      recipe.image = recipeData.image;
      recipe.rating = recipeData.rating;
      recipe.ingredients = recipeData.ingredients;
      recipe.description = recipeData.description;
      
      await recipeRepository.save(recipe);
    }
    
    console.log(`Successfully seeded ${recipesData.recipes.length} recipes`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();