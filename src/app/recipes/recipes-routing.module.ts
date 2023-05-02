import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { RecipesResolver } from './recipes.resolver';
import { RecipesComponent } from './recipes.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        // resolve: { recipe: RecipeDetailResolver },
        resolve: [RecipesResolver],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: [RecipesResolver],
      },
    ],
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class RecipesRoutingModule {}
