import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../db/ingredient.entity';
import { IngredientDto } from './dto/ingredient.dto';
import { plainToClass, plainToClassFromExist } from 'class-transformer';

@Injectable()
export class IngredientsService {
	constructor(
		@InjectRepository(Ingredient)
		private ingredientsRepository: Repository<Ingredient>,
	) {}
	
	create(ingredientDto: IngredientDto): Promise<Ingredient> {
		const ingredient = plainToClass(Ingredient, ingredientDto);
		return this.ingredientsRepository.save(ingredient);
	}

	async findAll(): Promise<Ingredient[]> {
		return this.ingredientsRepository.find();
	}	

	findOne(id: string): Promise<Ingredient> {
		return this.ingredientsRepository.findOne(id);
	}

	async update(id: string, ingredientDto: IngredientDto): Promise<Ingredient> {
		const ingredient = await this.ingredientsRepository.findOne(id);
		let updatedIngredient = plainToClassFromExist(ingredient, ingredientDto);
		return this.ingredientsRepository.save(updatedIngredient);
	}

	async remove(id: string): Promise<void> {
		await this.ingredientsRepository.delete(id);
	}

}
