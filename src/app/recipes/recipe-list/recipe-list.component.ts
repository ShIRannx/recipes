import { Component, effect, inject } from '@angular/core';

import { RecipeStore } from '../store/recipe.state';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  recipes: Recipe[];

  store = inject(RecipeStore);

  constructor() {
    effect(() => {
      this.recipes = this.store.entities();
    });
  }
}
