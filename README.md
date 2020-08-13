# Fablife Technical Test

This is a NestJS API to manage simple cooking recipes.

## Test requirements 
Tech :

    NestJS for the software
    PostgreSQL for the storage

User Stories :

    As a user, I want to manage (create, read, update, delete) ingredients
    As a user, I want to manage (create, read, update, delete) recipes

Models  :

    Ingredient
        id
        name
        aisle
    Recipe
        id
        name
        type : ‘breakfast’ | ‘lunch’ | ‘dinner'
        ingredients
        instructions

Constraints :

    By convention, ingredients quantities are stored in grams
    The API must send back a HTTP 409 status when receiving a request to remove an ingredient which is referenced in at least 1 recipe
    For recipes, before every database write, there must be a comparison between the current name and the new name. If these 2 names are different, log in the console the word : “BAZINGA"


Expected result :

    A git repository with the source code and a README.md file describing how to install the software and how to use it

## Installation

To use this app locally, download the repo or clone it.

```bash
$ npm install
```

## Running the app

This API requires a local PostgreSQL installation. See ormconfig.json for credentials, and make sure there are matching credentials in your local database and the source code.

Then, run Nest as usual:

```bash
$ npm run start
```

## Using the app

When the server is running, open another terminal and run the following commands :

### CRUD Ingredients

- Create ingredients
```bash
$ curl -d "name=chocolate&aisle=grocery" -X POST "http://localhost:3000/ingredients"
$ curl -d "name=eggs&aisle=eggs" -X POST "http://localhost:3000/ingredients"
```
- Read an ingredient
```bash
$ curl "http://localhost:3000/ingredients/1"
```
- Read all ingredients
```bash
$ curl "http://localhost:3000/ingredients"
```
- Update an ingredient
```bash
$ curl -d "name=hazelnut" -X PUT "http://localhost:3000/ingredients/1" 
```
- Delete an ingredient
```bash
$ curl -X DELETE "http://localhost:3000/ingredients/1" 
```

### CRUD Recipes

- Create a recipe
```bash
$ curl -d '{"name":"chocolate cake", "type":"breakfast", "instructions":"1. Pour the flour, baking powder and cocoa through a sifter. 2. ...", "ingredientsToRecipeDto" : [{"ingredientId":"1", "quantity":"200"}, {"ingredientId":"2", "quantity":"100"} ] }' -H "Content-Type: application/json" -X POST http://localhost:3000/recipes
```
- Read a recipe
```bash
$ curl "http://localhost:3000/recipes/1" 
```
- Read all recipes
```bash
$ curl "http://localhost:3000/recipes"
```
- Update a recipe
```bash
$ curl -d '{"name":"the best chocolate cake", "ingredientsToRecipeDto" : [{"ingredientId":"1", "quantity":"400"}, {"ingredientId":"2", "quantity":"150"} ] }' -H "Content-Type: application/json" -X PUT "http://localhost:3000/recipes/1"
```
- Delete a recipe
```bash
$ curl -X DELETE "http://localhost:3000/recipes/1" 
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
