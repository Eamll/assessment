"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Recipe } from "../interfaces";
import { RecipeService } from "../services/recipeService";
import AddRecipeForm from "../components/AddRecipeForm";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const recipesPerPage = 6;

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const data = await RecipeService.getRecipes({ _limit: 100 }); // Get all recipes
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecipeSuccess = () => {
    setShowAddForm(false);
    fetchRecipes(); // Refresh the recipe list
  };

  const handleAddRecipeCancel = () => {
    setShowAddForm(false);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCuisine =
      !selectedCuisine || recipe.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const startIndex = (currentPage - 1) * recipesPerPage;
  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + recipesPerPage
  );

  const cuisines = [...new Set(recipes.map((recipe) => recipe.cuisine))];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Recipe Collection
              </h1>
              <p className="text-gray-600 mt-2">
                Discover and share amazing recipes from around the world
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Add Recipe
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search recipes or ingredients..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
            />
          </div>
          <select
            value={selectedCuisine}
            onChange={(e) => {
              setSelectedCuisine(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
          >
            <option value="">All Cuisines</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:border-2 hover:border-orange-500 transition-all duration-300 border-2 border-transparent"
            >
              <div className="relative h-48">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      recipe.difficulty
                    )}`}
                  >
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {recipe.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <span className="mr-1">🍽️</span>
                    {recipe.cuisine}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">⏱️</span>
                    {recipe.cookTime} min
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">👥</span>
                    {recipe.servings}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span className="text-sm text-gray-600">
                      {recipe.rating}
                    </span>
                  </div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition-colors duration-200 font-medium">
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-black"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === page
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-gray-300 hover:bg-gray-50 text-black"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-black"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Add Recipe Form Modal */}
      {showAddForm && (
        <AddRecipeForm
          onSuccess={handleAddRecipeSuccess}
          onCancel={handleAddRecipeCancel}
        />
      )}
    </div>
  );
}
