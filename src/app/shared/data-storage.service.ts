import { map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  recipesTable = 'recipes.json';
  ingredientsTable = 'ingredients.json';
  firebaseApi =
    'https://shirann-angular-storage-default-rtdb.asia-southeast1.firebasedatabase.app';

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}

  fetchRecipe() {
    return this.http
      .get<Recipe[]>(`${this.firebaseApi}/${this.recipesTable}`)
      .pipe(
        map(recipes =>
          recipes.map(recipe =>
            Object.assign(recipe, { ingredients: recipe?.ingredients ?? [] })
          )
        ),
        tap(recipes => (this.recipesService.recipes = recipes))
      );
  }
  // return this.authService.user.pipe(
  //   // take a single emitted value from user(BehaviorSubject) then unsubscribe it immediately
  //   take(1),
  //   // return a fully new observable instead of using before one
  //   exhaustMap(user =>
  //     this.http.get<Recipe[]>(`${this.firebaseApi}/${this.recipesTable}`, {
  //       params: { ...(user?.token && { auth: user.token }) },
  //     })
  //   ),
  //   map(recipes =>
  //     recipes.map(recipe =>
  //       Object.assign(recipe, {
  //         ingredients: recipe?.ingredients ?? [],
  //       })
  //     )
  //   ),
  // );
  // return {
  //   ...recipe,
  //   ...(recipe.ingredients && { ingredients: recipe.ingredients }),
  // };
  // recipes.map(r => Object.assign(r, r?.ingredients ?? []))
  //     tap(recipes => (this.recipesService.recipes = recipes))
  //   );

  saveRecipe() {
    return this.http.put(
      `${this.firebaseApi}/${this.recipesTable}`,
      this.recipesService.recipes
    );
  }
}
