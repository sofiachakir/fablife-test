import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, Connection } from 'typeorm';

import { Recipe } from '../db/recipe.entity';
import { IngredientToRecipe } from '../db/ingredient-to-recipe.entity';
import { Ingredient } from '../db/ingredient.entity';

import { RecipeDto } from './dto/recipe.dto';
import { plainToClass, plainToClassFromExist } from 'class-transformer';


@Injectable()
export class RecipesService {
	constructor(
		@InjectRepository(Recipe)
		private recipesRepository: Repository<Recipe>,
		private connection: Connection,
	) {}

	async create(recipeDto: RecipeDto): Promise<Recipe> {

		const recipe = plainToClass(Recipe, recipeDto);

		let recipeIngredientsArray = plainToClass(IngredientToRecipe, recipeDto.ingredientsToRecipeDto);

  	await getManager().transaction(async transactionalEntityManager => {
	    await transactionalEntityManager.save(recipe);
	    for (const i of recipeIngredientsArray) {
	    	i.recipeId = recipe.id;
	    	await transactionalEntityManager.save(i);
	    }
	  }).catch( (err) => { console.log(err) } );
  	// Renvoyer aussi les ingrédients
		return recipe;
	}

	async findAll(): Promise<Recipe[]> {
		return this.recipesRepository.find({
			relations: ["ingredientToRecipes", "ingredientToRecipes.ingredient"]
		});
	}	

	findOne(id: string): Promise<Recipe> {
		return this.recipesRepository.findOne(
			id, 
			{relations: ["ingredientToRecipes", "ingredientToRecipes.ingredient"]}
		);
	}

	async update(id: string, recipeDto: RecipeDto): Promise<Recipe> {
		const recipe = await this.recipesRepository.findOne(
			id, 
			{relations: ["ingredientToRecipes", "ingredientToRecipes.ingredient"]}
		);

		if(recipe.name != recipeDto.name) console.log('BAZINGA');
		
		let updatedRecipe = plainToClassFromExist(recipe, recipeDto);
		let updatedIngredientToRecipe = plainToClassFromExist(recipe.ingredientToRecipes, recipeDto.ingredientsToRecipeDto);

		await getManager().transaction(async transactionalEntityManager => {
			await transactionalEntityManager.save(updatedRecipe);
			for (const i of updatedIngredientToRecipe) {
	    	await transactionalEntityManager.save(i);
	    }
	  }).catch( (err) => { console.log(err) } );
		return updatedRecipe;
	}

	async remove(id: string): Promise<void> {
	  await this.recipesRepository.delete(id);
	}
}
