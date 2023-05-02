import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RecipesService } from '../recipes.service';
import { GenerateUUID } from '../../shared/helpers';
import { CanComponentDeactivate } from '../guards/can-deactivate.guard';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, CanComponentDeactivate {
  itemId: string;
  editMode = false;
  imageLoaded = false;
  changesSaved = false;
  recipeForm: FormGroup;

  get ingresFormArray() {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.itemId = params['id'];
      this.editMode = !!this.itemId;
    });
    this.formInit();
  }

  onAddIngre() {
    this.ingresFormArray.push(
      this.formBuilder.group({
        name: [null, Validators.required],
        amount: [null, [Validators.required, Validators.min(1)]],
      })
    );
  }

  onRemoveIngre(index: number) {
    this.ingresFormArray.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.invalid || this.recipeForm.pristine) return;
    const recipe = this.recipeForm.value;

    Object.assign(recipe, {
      id: this.editMode ? this.itemId : GenerateUUID(32),
    });

    this.editMode
      ? this.recipesService.update(recipe)
      : this.recipesService.add(recipe);

    this.changesSaved = true;
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  formInit() {
    const { name, imageUrl, desc, ingredients } = this.editMode
      ? this.recipesService.getRecipeById(this.itemId)
      : { name: null, imageUrl: null, desc: null, ingredients: [] };

    this.recipeForm = this.formBuilder.group({
      name: [name, Validators.required],
      desc: [desc, Validators.required],
      imageUrl: [imageUrl, [Validators.required]],
      ingredients: this.formBuilder.array(
        ingredients?.map(i =>
          this.formBuilder.group({
            name: [i.name, Validators.required],
            amount: [i.amount, [Validators.required, Validators.min(1)]],
          })
        ) ?? []
      ),
    });
  }

  canDecativate(): boolean | Promise<boolean> | Observable<boolean> {
    return this.recipeForm.pristine || this.changesSaved
      ? true
      : confirm('Do you wanna discard the change?');
  }

  // @AutoBind()
  // isUrlAvailable(control: FormControl) {
  //   return this.http
  //     .get(control.value, { observe: 'body' })
  //     .subscribe(res => console.log(res));
  // }
}
