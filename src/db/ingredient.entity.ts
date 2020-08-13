import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {IngredientToRecipe} from "./ingredient-to-recipe.entity";

@Entity()
export class Ingredient {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	aisle: string;

	@OneToMany(type => IngredientToRecipe, ingredientToRecipe => ingredientToRecipe.ingredient)
	public ingredientToRecipes!: IngredientToRecipe[];
}