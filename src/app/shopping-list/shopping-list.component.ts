import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Ingredient } from '../shared/models/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('listItems', [
      state('in', style({ opacity: 1 })),
      transition('* => void', animate(500, style({ opacity: 0 }))),
      transition('void => *', [style({ opacity: 0 }), animate(500)]),
    ]),
  ],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  search: Observable<{ search: string }>;
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromShoppingList.AppState>) {}

  onStartEdit(index: number) {
    this.store.dispatch(ShoppingListActions.startEdit({ payload: index }));
  }

  ngOnInit(): void {
    this.search = this.store.select('shoppingList');
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {}
}
