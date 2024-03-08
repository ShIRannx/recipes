import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { inject } from '@angular/core';
import { ShoppingListStore } from 'src/app/shopping-list/store/shopping-list.state';

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
  withMethods((store, slStore = inject(ShoppingListStore)) => ({
    addRecipe(recipe: Recipe) {
      patchState(store, state => ({ recipes: [...state.recipes, recipe] }));
    },
    delRecipe(index: number) {
      patchState(store, state => ({
        recipes: [...state.recipes.filter((_, i) => i !== index)],
      }));
    },
    updateRecipe(recipe: Recipe) {
      patchState(store, state => {
        const index = state.recipes.findIndex(r => r.id === recipe.id);

        const currentRecipe = state.recipes[index];
        const updatedRecipe = { ...currentRecipe, ...recipe };
        const updatedRecipes = [...state.recipes];
        updatedRecipes[index] = updatedRecipe;

        return { recipes: updatedRecipes };
      });
    },
    addIngresToShoppingList(ingres: Ingredient[]) {
      slStore.addIngres(ingres);
    },
  })),
);
