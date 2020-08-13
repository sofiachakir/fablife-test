import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ingredient } from "./ingredient.entity";
import { Recipe } from "./recipe.entity";

@Entity()
export class IngredientToRecipe {
	@PrimaryGeneratedColumn()
	public ingredientToRecipeId!: number;

	@Column()
	public ingredientId!: number;

	@Column()
	public recipeId!: number;

	@Column()
	public quantity!: number;

	@ManyToOne(type => Ingredient, ingredient => ingredient.ingredientToRecipes)
	public ingredient!: Ingredient;

	@ManyToOne(type => Recipe, recipe => recipe.ingredientToRecipes, { onDelete:'CASCADE' })
	public recipe!: Recipe;

}