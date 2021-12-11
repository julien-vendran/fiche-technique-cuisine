import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIngredientComponent } from './component/ingredient/create-ingredient/create-ingredient.component';
import { ListIngredientsComponent } from './component/ingredient/list-ingredients/list-ingredients.component';
const routes: Routes = [
  { path: 'ingredients/add', component: CreateIngredientComponent },
  { path : 'ingredients', component: ListIngredientsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
