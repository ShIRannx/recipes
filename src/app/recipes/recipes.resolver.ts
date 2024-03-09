import { Injectable, inject } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { RecipeStore } from './store/recipe.state';

@Injectable({
  providedIn: 'any',
})
export class RecipesResolver {
  store = inject(RecipeStore);
  dataStorageSvc = inject(DataStorageService);

  resolve() {
    const recipes = this.store.entities();
    return recipes.length ? recipes : this.dataStorageSvc.fetchRecipe();
  }
}
