import { createReducer, on } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

interface State {
  search: string;
  ingredients: Ingredient[];
  editedIngredientIndex: number;
  editedIngredient: Ingredient | null;
}

export interface AppState {
  shoppingList: State;
}

const initState: State = {
  search: '',
  editedIngredient: null,
  editedIngredientIndex: -1,
  ingredients: [new Ingredient('Apples', 6), new Ingredient('Tomatoes', 5)],
};

export const ShoppingListReducer = createReducer(
  initState,
  on(ShoppingListActions.addIngredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.payload],
  })),
  on(ShoppingListActions.addIngredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.payload],
  })),
  on(ShoppingListActions.updateIngredient, (state, action) => {
    const ingre = state.ingredients[state.editedIngredientIndex];
    const updatedIngre = { ...ingre, ...action.payload };
    const updatedIngres = [...state.ingredients];
    updatedIngres[state.editedIngredientIndex] = updatedIngre;
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1,
      ingredients: updatedIngres,
    };
  }),
  on(ShoppingListActions.deleteIngredient, state => ({
    ...state,
    ingredients: state.ingredients.filter(
      (_, i) => i !== state.editedIngredientIndex
    ),
    editedIngredient: null,
    editedIngredientIndex: -1,
  })),
  on(ShoppingListActions.startEdit, (state, action) => ({
    ...state,
    editedIngredientIndex: action.payload,
    editedIngredient: { ...state.ingredients[action.payload] },
  })),
  on(ShoppingListActions.stopEdit, state => ({
    ...state,
    editedIngredient: null,
    editedIngredientIndex: -1,
  })),
  on(ShoppingListActions.search, (state, action) => ({
    ...state,
    search: action.payload,
  }))
);
