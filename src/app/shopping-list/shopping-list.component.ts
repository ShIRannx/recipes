import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject } from '@angular/core';

import { ShoppingListStore } from './store/shopping-list.state';

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
export class ShoppingListComponent {
  store = inject(ShoppingListStore);

  onStartEdit(index: number) {
    this.store.startEdit(index);
  }
}
