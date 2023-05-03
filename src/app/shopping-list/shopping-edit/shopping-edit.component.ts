import { Subscription } from 'rxjs';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/models/ingredient.model';
import { Store } from '@ngrx/store';
import {
  AddIngredient,
  DeleteIngredient,
  UpdateIngredient,
} from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode: boolean;
  itemIndex: number;
  ingreForm: FormGroup;
  startEditingSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.startEditingSubscription =
      this.shoppingListService.startEdit.subscribe(itemIndex => {
        this.editMode = true;
        this.itemIndex = itemIndex;
        this.ingreForm.reset();
        this.ingreForm.setValue(
          this.shoppingListService.getIngreByIndex(itemIndex)
        );
      });
  }

  formInit() {
    this.ingreForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
    this.ingreForm.controls['name'].valueChanges.subscribe(name => {
      if (this.ingreForm.pristine) return;
      this.editMode = false;
      this.shoppingListService.fuzzySearch.next(name ?? '');
    });
  }

  onDeleteItem() {
    if (this.editMode) {
      this.store.dispatch(DeleteIngredient({ payload: this.itemIndex }));
      // this.onClearItem();
    }
  }

  onClearItem() {
    this.editMode = false;
    this.ingreForm.reset();
  }

  onSubmit() {
    if (this.ingreForm.invalid) return;
    let { name, amount } = this.ingreForm.value;
    name = name.replace(name[0], name[0].toUpperCase());

    // const index = this.shoppingListService.findIndexByName(name);
    // // index === -1 stands for whether ingre exists
    // index !== -1
    const newIngre = new Ingredient(name, amount);

    this.editMode
      ? this.store.dispatch(
        UpdateIngredient({
          payload: { index: this.itemIndex, ingredient: newIngre },
        })
      )
      : this.store.dispatch(AddIngredient({ payload: newIngre }));
    // ? this.shoppingListService.updateIngre(this.itemIndex, amount)
    // : this.shoppingListService.addIngre(new Ingredient(name, amount));
    this.onClearItem();
  }

  ngOnDestroy(): void {
    this.startEditingSubscription.unsubscribe();
  }
}
