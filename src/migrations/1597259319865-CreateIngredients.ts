import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateIngredients1597259319865 implements MigrationInterface {
    name = 'CreateIngredients1597259319865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL CHECK((type = 'breakfast') OR (type = 'lunch') OR (type = 'dinner')), "instructions" text NOT NULL, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient_to_recipe" ("ingredientToRecipeId" SERIAL NOT NULL, "ingredientId" integer NOT NULL, "recipeId" integer NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_740224409f38af232532958ed80" PRIMARY KEY ("ingredientToRecipeId"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "aisle" character varying NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ingredient_to_recipe" ADD CONSTRAINT "FK_c327da7fcc69a4f352540a3cec5" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient_to_recipe" ADD CONSTRAINT "FK_058421441bb2d4bdd3e5532ecb0" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient_to_recipe" DROP CONSTRAINT "FK_058421441bb2d4bdd3e5532ecb0"`);
        await queryRunner.query(`ALTER TABLE "ingredient_to_recipe" DROP CONSTRAINT "FK_c327da7fcc69a4f352540a3cec5"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "ingredient_to_recipe"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
    }

}
