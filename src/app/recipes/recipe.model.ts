import { Ingredient } from '../shared/models/ingredient.model';

export class Recipe {
  constructor(
    public id: string,
    public name: string,
    public desc: string,
    public imageUrl: string,
    public ingredients?: Ingredient[]
  ) {}
}
