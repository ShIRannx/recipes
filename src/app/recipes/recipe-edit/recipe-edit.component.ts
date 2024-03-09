import { Observable } from 'rxjs';
import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { RecipesService } from '../recipes.service';
import { GenerateUUID } from '../../shared/helpers';
import { CanComponentDeactivate } from '../guards/can-deactivate.guard';
import { RecipeStore } from '../store/recipe.state';
import { patchState } from '@ngrx/signals';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements CanComponentDeactivate, OnDestroy {
  editMode: boolean;
  imageLoaded = false;
  changesSaved = false;
  editingRecipe: Recipe;
  recipeForm: FormGroup;

  store = inject(RecipeStore);

  get ingresFormArray() {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  @Input('id') set _recipe(id: string) {
    patchState(this.store, { selectedEntityId: id });
    const recipe = this.store.selectedEntity();
    if (!recipe) return;

    this.editMode = true;
    this.editingRecipe = recipe;
    this.formInit();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: NonNullableFormBuilder,
  ) {
    this.formInit();
  }

  onAddIngre() {
    this.ingresFormArray.push(
      this.fb.group({
        name: [null, Validators.required],
        amount: [null, [Validators.required, Validators.min(1)]],
      }),
    );
  }

  onRemoveIngre(index: number) {
    this.ingresFormArray.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.invalid || this.recipeForm.pristine) return;
    const recipe = this.recipeForm.value;

    Object.assign(recipe, { id: this.editingRecipe.id ?? GenerateUUID(32) });

    this.editMode
      ? this.store.updateRecipe(recipe)
      : this.store.addRecipe(recipe);

    this.changesSaved = true;
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  formInit() {
    const { name, imageUrl, desc, ingredients = [] } = this.editingRecipe ?? {};

    this.recipeForm = this.fb.group({
      name: [name, Validators.required],
      desc: [desc, Validators.required],
      imageUrl: [imageUrl, [Validators.required]],
      ingredients: this.fb.array(
        ingredients?.map(i =>
          this.fb.group({
            name: [i.name, Validators.required],
            amount: [i.amount, [Validators.required, Validators.min(1)]],
          }),
        ),
      ),
    });
  }

  canDecativate(): boolean | Promise<boolean> | Observable<boolean> {
    return this.recipeForm.pristine || this.changesSaved
      ? true
      : confirm('Do you wanna discard the change?');
  }
  ngOnDestroy(): void {
    patchState(this.store, { selectedEntityId: null });
  }
}
