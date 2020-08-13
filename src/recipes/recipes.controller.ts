import { Controller, Body, Param, Get, Post, Put, Delete } from '@nestjs/common';
import { RecipeDto } from './dto/recipe.dto';
import { Recipe } from '../db/recipe.entity';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
	constructor(private recipesService: RecipesService) {}

	@Post()
	create(@Body() recipeDto: RecipeDto): Promise<Recipe> {
		return this.recipesService.create(recipeDto);
	}

	@Get()
	findAll(): Promise<Recipe[]> {
		return this.recipesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Recipe> {
		return this.recipesService.findOne(id);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() recipeDto: RecipeDto): Promise<Recipe> {
		return this.recipesService.update(id, recipeDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.recipesService.remove(id);
	}

}
