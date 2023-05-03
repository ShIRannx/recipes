import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/models/ingredient.model';
import { Store } from '@ngrx/store';

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
  fuzzySearchKeyWords = '';
  fuzzySearchSubscription: Subscription;
  ingredients: Observable<{ ingredients: Ingredient[] }>;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) { }

  onStartEdit(index: number) {
    this.shoppingListService.startEdit.next(index);
  }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    this.fuzzySearchSubscription =
      this.shoppingListService.fuzzySearch.subscribe(
        words => (this.fuzzySearchKeyWords = words)
      );
  }

  ngOnDestroy(): void {
    this.fuzzySearchSubscription.unsubscribe();
  }
}
