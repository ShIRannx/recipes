import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(
    private recipesService: RecipesService,
    private dataStorageService: DataStorageService
  ) {}
  resolve() {
    const { recipes } = this.recipesService;
    return recipes.length ? recipes : this.dataStorageService.fetchRecipe();
  }
}
