import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/models/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private _recipes: Recipe[] = [];
  recipesChanged = new Subject<Recipe[]>();

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
