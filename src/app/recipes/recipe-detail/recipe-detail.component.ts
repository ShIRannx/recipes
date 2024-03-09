import { Component, Input, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeStore } from '../store/recipe.state';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnDestroy {
  recipe: Recipe;

  router = inject(Router);
  store = inject(RecipeStore);
  route = inject(ActivatedRoute);

  @Input('id') set _recipe(id: string) {
    patchState(this.store, { selectedEntityId: id });
    const recipe = this.store.selectedEntity();
    if (!recipe) return;
    this.recipe = recipe;
  }

  onAddIngresToShoppingList() {
    const ingres = this.recipe.ingredients;
    if (!ingres) return;
    this.store.addIngresToShoppingList(ingres);
  }

  onDeleteRecipe() {
    this.store.delRecipe(this.recipe.id);
    this.router.navigate(['..'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    patchState(this.store, { selectedEntityId: null });
  }
}
