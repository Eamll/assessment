import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRecipe = [
  body('title')
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be a non-empty string with max 100 characters'),
  
  body('cuisine')
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Cuisine must be a non-empty string with max 50 characters'),
  
  body('difficulty')
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Difficulty must be one of: Easy, Medium, Hard'),
  
  body('cookTime')
    .isInt({ min: 1, max: 1440 })
    .withMessage('Cook time must be a positive integer (max 1440 minutes)'),
  
  body('servings')
    .isInt({ min: 1, max: 50 })
    .withMessage('Servings must be a positive integer (max 50)'),
  
  body('image')
    .isString()
    .trim()
    .isURL()
    .withMessage('Image must be a valid URL'),
  
  body('rating')
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be a number between 0 and 5'),
  
  body('ingredients')
    .isArray({ min: 1 })
    .withMessage('Ingredients must be a non-empty array')
    .custom((ingredients) => {
      if (!ingredients.every((ingredient: any) => typeof ingredient === 'string' && ingredient.trim().length > 0)) {
        throw new Error('All ingredients must be non-empty strings');
      }
      return true;
    }),
  
  body('description')
    .isString()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be a non-empty string with max 1000 characters'),
];

export const validateRecipeUpdate = [
  body('title')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be a non-empty string with max 100 characters'),
  
  body('cuisine')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Cuisine must be a non-empty string with max 50 characters'),
  
  body('difficulty')
    .optional()
    .isIn(['Easy', 'Medium', 'Hard'])
    .withMessage('Difficulty must be one of: Easy, Medium, Hard'),
  
  body('cookTime')
    .optional()
    .isInt({ min: 1, max: 1440 })
    .withMessage('Cook time must be a positive integer (max 1440 minutes)'),
  
  body('servings')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Servings must be a positive integer (max 50)'),
  
  body('image')
    .optional()
    .isString()
    .trim()
    .isURL()
    .withMessage('Image must be a valid URL'),
  
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be a number between 0 and 5'),
  
  body('ingredients')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Ingredients must be a non-empty array')
    .custom((ingredients) => {
      if (ingredients && !ingredients.every((ingredient: any) => typeof ingredient === 'string' && ingredient.trim().length > 0)) {
        throw new Error('All ingredients must be non-empty strings');
      }
      return true;
    }),
  
  body('description')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be a non-empty string with max 1000 characters'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
    return;
  }
  next();
};