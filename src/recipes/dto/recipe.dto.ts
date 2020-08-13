import { IngredientToRecipeDto } from './ingredient-to-recipe.dto'

export class RecipeDto {
	name: string;
	type: string;
	instructions: string;
	ingredientsToRecipeDto: IngredientToRecipeDto[];
}