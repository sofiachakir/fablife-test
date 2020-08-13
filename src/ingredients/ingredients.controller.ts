import { Controller, Body, Param, Get, Post, Put, Delete, HttpException } from '@nestjs/common';
import { IngredientDto } from './dto/ingredient.dto';
import { Ingredient } from '../db/ingredient.entity';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
	constructor(private ingredientsService: IngredientsService) {}

	@Post()
	create(@Body() ingredientDto: IngredientDto): Promise<Ingredient> {
		return this.ingredientsService.create(ingredientDto);
	}

	@Get()
	findAll(): Promise<Ingredient[]> {
		return this.ingredientsService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Ingredient> {
		return this.ingredientsService.findOne(id);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() ingredientDto: IngredientDto): Promise<Ingredient> {
		return this.ingredientsService.update(id, ingredientDto);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		try {
			await this.ingredientsService.remove(id)
		} catch {
			console.log('error');
			throw new HttpException('Ingredient still in use', 409);
		}
	}
}
