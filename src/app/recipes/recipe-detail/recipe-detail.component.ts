import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      params => (this.recipe = this.recipesService.getRecipeById(params['id']))
    );
    // this.route.data.subscribe(data => (this.recipe = data['recipe']));
  }

  onAddIngresToShoppingList() {
    if (!this.recipe.ingredients) return;
    this.recipesService.addIngresToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipesService.delete(this.recipe.id);
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
