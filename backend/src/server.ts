import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { AppDataSource, initializeDatabase } from "./data-source";
import { Recipe } from "./entities/Recipe";
import { Like, FindManyOptions } from "typeorm";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/recipes", async (req: Request, res: Response): Promise<void> => {
  try {
    const { cuisine, difficulty, _page, _limit } = req.query;
    const recipeRepository = AppDataSource.getRepository(Recipe);
    
    const page = parseInt(_page as string) || 1;
    const limit = parseInt(_limit as string) || 10;
    const skip = (page - 1) * limit;

    const findOptions: FindManyOptions<Recipe> = {
      skip,
      take: limit,
    };

    const where: any = {};
    
    if (cuisine) {
      where.cuisine = Like(`%${cuisine}%`);
    }
    
    if (difficulty) {
      where.difficulty = Like(`%${difficulty}%`);
    }

    if (Object.keys(where).length > 0) {
      findOptions.where = where;
    }

    const recipes = await recipeRepository.find(findOptions);
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/recipes/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const recipeRepository = AppDataSource.getRepository(Recipe);
    const recipe = await recipeRepository.findOne({ where: { id } });

    if (!recipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const startServer = async () => {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();