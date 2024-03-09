import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  addEntities,
  addEntity,
  removeEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { inject } from '@angular/core';
import { ShoppingListStore } from 'src/app/shopping-list/store/shopping-list.state';
import { withSelectedEntity } from './selected-entitiy.feature';

export interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
}

export const initialState: RecipeState = {
  recipes: [],
  loading: false,
};

export const RecipeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities<Recipe>(),
  withSelectedEntity(),
  withMethods((store, slStore = inject(ShoppingListStore)) => ({
    addRecipe(recipe: Recipe) {
      patchState(store, addEntity(recipe));
    },
    addRecipes(recipes: Recipe[]) {
      patchState(store, addEntities(recipes));
    },
    delRecipe(index: string) {
      patchState(store, removeEntity(index));
    },
    updateRecipe(recipe: Recipe) {
      patchState(store, updateEntity({ id: recipe.id, changes: recipe }));
    },
    addIngresToShoppingList(ingres: Ingredient[]) {
      slStore.addIngres(ingres);
    },
  })),
);
