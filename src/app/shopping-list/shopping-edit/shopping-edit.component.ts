import { OnInit, Component, OnDestroy, inject, effect } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { ShoppingListStore } from '../store/shopping-list.state';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode: boolean;
  itemIndex: number;

  ingreForm: FormGroup<{
    name: FormControl<string>;
    amount: FormControl<number>;
  }>;

  store = inject(ShoppingListStore);

  constructor(private fb: NonNullableFormBuilder) {
    effect(() => {
      this.itemIndex = this.store.editedIngredientIndex();
      if (this.itemIndex > -1) {
        this.editMode = true;
        const name = this.store.ingredients()[this.itemIndex].name;
        const amount = this.store.ingredients()[this.itemIndex].amount;
        this.ingreForm.setValue({ name, amount });
      }
    });
  }

  ngOnInit(): void {
    this.ingreForm = this.fb.group({
      name: ['', [Validators.required]],
      amount: [NaN, [Validators.required]],
    });
  }

  onDeleteItem() {
    if (!this.editMode) return;
    this.editMode = false;
    this.ingreForm.reset();
    this.store.delIngre();
  }

  onClearItem() {
    this.editMode = false;
    this.ingreForm.reset();
    this.store.stopEdit();
  }

  onSubmit() {
    if (this.ingreForm.invalid) return;
    let { name, amount } = this.ingreForm.value;
    if (!name || !amount) return;
    name = name.replace(name[0], name[0].toUpperCase());

    if (this.editMode) this.store.updateIngre({ name, amount });
    else this.store.addIngre(name, amount);
    this.onClearItem();
  }

  ngOnDestroy(): void {
    this.store.stopEdit();
  }
}
