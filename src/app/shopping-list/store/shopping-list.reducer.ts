import { createReducer, on } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';
import {
  AddIngredient,
  AddIngredients,
  DeleteIngredient,
  UpdateIngredient,
} from './shopping-list.actions';

const initState = {
  ingredients: [new Ingredient('Apples', 6), new Ingredient('Tomatoes', 5)],
};

export const ShoppingListReducer = createReducer(
  initState,
  on(AddIngredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.payload],
  })),
  on(AddIngredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.payload],
  })),
  on(UpdateIngredient, (state, action) => {
    const ingre = state.ingredients[action.payload.index];
    const updatedIngre = { ...action.payload.ingredient, ...ingre };
    const updatedIngres = [...state.ingredients];
    updatedIngres[action.payload.index] = updatedIngre;
    return { ...state, ingredients: updatedIngres };
  }),
  on(DeleteIngredient, (state, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter((_, i) => i !== action.payload),
    };
  })
);
