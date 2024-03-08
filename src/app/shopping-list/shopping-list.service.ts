import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/models/ingredient.model';

@Injectable()
export class ShoppingListService {
  private _ingredients: Ingredient[] = [
    new Ingredient('Apples', 6),
    new Ingredient('Tomatoes', 5),
  ];
  startEdit = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor() {}

  get ingredients() {
    return this._ingredients.slice();
  }

  getIngreByIndex(index: number) {
    return this._ingredients[index];
  }

  addIngre(ingre: Ingredient) {
    this._ingredients.push(ingre);
    this.ingreChanged();
  }

  addIngres(ingres: Ingredient[]) {
    this._ingredients.push(...ingres);
    this.ingreChanged();
  }

  deleteIngre(index: number) {
    this._ingredients.splice(index, 1);
    this.ingreChanged();
  }

  updateIngre(index: number, amount: number) {
    this._ingredients[index].amount = amount;
    this.ingreChanged();
  }

  findIndexByName(name: string) {
    return this._ingredients.findIndex(i => i.name === name);
  }

  private ingreChanged() {
    this.ingredientsChanged.next(this.ingredients);
  }
}
