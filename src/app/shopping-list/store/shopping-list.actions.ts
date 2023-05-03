import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

export const AddIngredient = createAction(
  'ADD_INGREDIENT',
  props<{ payload: Ingredient }>()
);

export const AddIngredients = createAction(
  'ADD_INGREDIENTS',
  props<{ payload: Ingredient[] }>()
);
export const UpdateIngredient = createAction(
  'UPDATE_INGREDIENT',
  props<{ payload: { index: number; ingredient: Ingredient } }>()
);
export const DeleteIngredient = createAction(
  'DELETE_INGREDIENT',
  props<{ payload: number }>()
);
