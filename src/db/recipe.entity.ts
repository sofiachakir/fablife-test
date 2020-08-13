import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {IngredientToRecipe} from "./ingredient-to-recipe.entity";
import { Matches } from "class-validator";
import { Expose } from 'class-transformer';

@Entity()
export class Recipe {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	@Matches(/^(breakfast|lunch|dinner)$/)
	type: string;

	@OneToMany(type => IngredientToRecipe, ingredientToRecipe => ingredientToRecipe.recipe)
	public ingredientToRecipes!: IngredientToRecipe[];

	@Column('text')
	instructions: string;
}