import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeChangedSubscription: Subscription;

  constructor(private recipesService: RecipesService) {
    this.recipes = this.recipesService.recipes;
  }

  ngOnInit(): void {
    this.recipeChangedSubscription =
      this.recipesService.recipesChanged.subscribe(
        recipes => (this.recipes = recipes)
      );
  }
  ngOnDestroy(): void {
    this.recipeChangedSubscription.unsubscribe();
  }
}
