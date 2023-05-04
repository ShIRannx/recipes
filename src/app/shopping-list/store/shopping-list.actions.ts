import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/models/ingredient.model';

export const addIngredient = createAction(
  'ADD_INGREDIENT',
  props<{ payload: Ingredient }>()
);
export const addIngredients = createAction(
  'ADD_INGREDIENTS',
  props<{ payload: Ingredient[] }>()
);
export const updateIngredient = createAction(
  'UPDATE_INGREDIENT',
  props<{ payload: Ingredient }>()
);
export const startEdit = createAction(
  'START_EDIT',
  props<{ payload: number }>()
);
export const stopEdit = createAction('STOP_EDIT');
export const deleteIngredient = createAction('DELETE_INGREDIENT');
export const search = createAction('SEARCH', props<{ payload: string }>());
