import { Subscription } from 'rxjs';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Ingredient } from '../../shared/models/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode: boolean;
  itemIndex: number;
  startEditingSubscription: Subscription;

  ingreForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    amount: [NaN, [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<fromShoppingList.AppState>
  ) {}

  ngOnInit(): void {
    this.startEditingSubscription = this.store
      .select('shoppingList')
      .subscribe(state => {
        if (state.editedIngredientIndex > -1) {
          this.editMode = true;
          this.ingreForm.reset();
          this.ingreForm.setValue({
            name: state.editedIngredient?.name ?? '',
            amount: state.editedIngredient?.amount ?? NaN,
          });
        } else this.editMode = false;
      });
    this.ingreForm.controls['name'].valueChanges.subscribe(name => {
      if (this.ingreForm.pristine) return;
      this.store.dispatch(ShoppingListActions.search({ payload: name ?? '' }));
    });
  }

  onDeleteItem() {
    if (!this.editMode) return;
    this.editMode = false;
    this.ingreForm.reset();
    this.store.dispatch(ShoppingListActions.deleteIngredient());
  }

  onClearItem() {
    this.editMode = false;
    this.ingreForm.reset();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  onSubmit() {
    if (this.ingreForm.invalid) return;
    let { name, amount } = this.ingreForm.value;
    if (!name || !amount) return;
    name = name.replace(name[0], name[0].toUpperCase());
    const newIngre = new Ingredient(name, amount);
    if (this.editMode) {
      this.store.dispatch(
        ShoppingListActions.updateIngredient({
          payload: newIngre,
        })
      );
    } else
      this.store.dispatch(
        ShoppingListActions.addIngredient({ payload: newIngre })
      );
    this.onClearItem();
  }

  ngOnDestroy(): void {
    this.startEditingSubscription.unsubscribe();
    this.store.dispatch(ShoppingListActions.stopEdit());
  }
}
