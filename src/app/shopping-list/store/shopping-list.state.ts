import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export interface ShoppingListState {
  search: string;
  ingredients: Ingredient[];
  editedIngredientIndex: number;
  editedIngredient: Ingredient;
}

export const initialState: ShoppingListState = {
  search: '',
  editedIngredient: new Ingredient('', NaN),
  ingredients: [new Ingredient('Apples', 6), new Ingredient('Tomatoes', 5)],
  editedIngredientIndex: -1,
};

export const ShoppingListStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(store => ({
    addIngre(name: string, amount: number) {
      const newIngre = new Ingredient(name, amount);
      patchState(store, state => ({
        ingredients: [...state.ingredients, newIngre],
      }));
    },
    delIngre() {
      patchState(store, state => ({
        editedIngredientIndex: -1,
        editedIngredient: new Ingredient('', NaN),
        ingredients: [
          ...state.ingredients.filter(
            (_, i) => i !== state.editedIngredientIndex,
          ),
        ],
      }));
    },
    addIngres(ingres: Ingredient[]) {
      patchState(store, state => ({
        ingredients: [...state.ingredients, ...ingres],
      }));
    },
    updateIngre(ingre: Partial<Ingredient>) {
      patchState(store, state => {
        const currentIngre = state.ingredients[state.editedIngredientIndex];

        const updatedIngre = { ...currentIngre, ...ingre };
        const updatedIngres = [...state.ingredients];
        updatedIngres[state.editedIngredientIndex] = updatedIngre;

        return { ingredients: updatedIngres };
      });
    },
    startEdit(index: number) {
      patchState(store, state => ({
        editedIngredientIndex: index,
        editedIngredient: { ...state.ingredients[index] },
      }));
    },
    stopEdit() {
      patchState(store, {
        editedIngredientIndex: -1,
        editedIngredient: undefined,
      });
    },
  })),
);
