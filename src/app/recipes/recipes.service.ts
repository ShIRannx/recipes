import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipesService {
  private _recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();
  // new Recipe(
  //   '22a6a1d94783468e87139d5054642fb3',
  //   'Pizza',
  //   'Test Desc',
  //   'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  //   [new Ingredient('meat', 1), new Ingredient('chips', 10)]
  // ),
  // new Recipe(
  //   'd4992ba08b094bcea1c9e35e9195fe29',
  //   'Pizza2',
  //   'Test Desc',
  //   'https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60',
  //   [new Ingredient('meat', 2), new Ingredient('chips', 5)]
  // ),

  constructor(private shoppingListService: ShoppingListService) {}

  get recipes() {
    return this._recipes.slice();
  }

  reload() {
    this.recipesChanged.next(this.recipes.slice());
  }

  set recipes(recipes: Recipe[]) {
    this._recipes = recipes?.slice() ?? [];
    this.reload();
  }

  add(recipe: Recipe) {
    this._recipes.push(recipe);
    this.reload();
  }

  update(recipe: Recipe) {
    const itemIndex = this._recipes.findIndex(r => recipe.id === r.id);
    this._recipes[itemIndex] = recipe;
    this.reload();
  }

  delete(itemId: string) {
    const itemIndex = this._recipes.findIndex(r => itemId === r.id);
    this._recipes.splice(itemIndex, 1);
    this.reload();
  }

  addIngresToShoppingList(ingres: Ingredient[]) {
    this.shoppingListService.addIngres(ingres);
  }

  getRecipeById(id: string) {
    const index = this._recipes.findIndex(r => r.id === id);
    return this._recipes[index];
  }
}
