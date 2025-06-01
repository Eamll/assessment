import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipesData from "../db.json";
import { Request, Response } from "express";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

interface Recipe {
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

const recipes: Recipe[] = recipesData.recipes;

app.get("/recipes", (req: Request, res: Response): void => {
  const { cuisine, difficulty, _page, _limit } = req.query;

  let filteredRecipes = [...recipes];

  if (cuisine) {
    filteredRecipes = filteredRecipes.filter(
      (recipe) =>
        recipe.cuisine.toLowerCase() === (cuisine as string).toLowerCase()
    );
  }

  if (difficulty) {
    filteredRecipes = filteredRecipes.filter(
      (recipe) =>
        recipe.difficulty.toLowerCase() === (difficulty as string).toLowerCase()
    );
  }

  const page = parseInt(_page as string) || 1;
  const limit = parseInt(_limit as string) || filteredRecipes.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

  res.json(paginatedRecipes);
});

app.get("/recipes/:id", (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    res.status(404).json({ error: "Recipe not found" });
    return;
  }

  res.json(recipe);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
