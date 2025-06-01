import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { RepositoryFactory } from "./repositories/RepositoryFactory";
import { getEnvironmentConfig } from "./config/environment";
import { IRecipeRepository } from "./repositories/IRecipeRepository";
import { validateRecipe, validateRecipeUpdate, handleValidationErrors } from "./middleware/validation";

dotenv.config();

const app = express();
const config = getEnvironmentConfig();

app.use(cors());
app.use(express.json());

let recipeRepository: IRecipeRepository;

app.get("/recipes", async (req: Request, res: Response): Promise<void> => {
  try {
    const { cuisine, difficulty, _page, _limit } = req.query;

    const filters = {
      ...(cuisine && { cuisine: cuisine as string }),
      ...(difficulty && { difficulty: difficulty as string }),
    };

    const pagination = {
      page: parseInt(_page as string) || 1,
      limit: parseInt(_limit as string) || 10,
    };

    const recipes = await recipeRepository.findAll(
      Object.keys(filters).length > 0 ? filters : undefined,
      pagination
    );

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/recipes/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const recipe = await recipeRepository.findById(id);

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

app.post("/recipes", validateRecipe, handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
  try {
    const recipe = await recipeRepository.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/recipes/:id", validateRecipeUpdate, handleValidationErrors, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const recipe = await recipeRepository.update(id, req.body);

    if (!recipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete(
  "/recipes/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await recipeRepository.delete(id);

      if (!deleted) {
        res.status(404).json({ error: "Recipe not found" });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting recipe:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

const startServer = async () => {
  try {
    recipeRepository = await RepositoryFactory.createRecipeRepository();

    console.log(`Using ${config.dataSource} data source`);

    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
