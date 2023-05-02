import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from '../../shared/models/ingredient.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(ingredients: Ingredient[], words: string): Ingredient[] {
    return ingredients.length || words
      ? ingredients.filter(r =>
          r.name.toLowerCase().includes(words.toLowerCase())
        )
      : ingredients;
  }
}
