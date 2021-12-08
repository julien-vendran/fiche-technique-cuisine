import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIngredientComponent } from './component/ingredient/create-ingredient/create-ingredient.component';

const routes: Routes = [
  { path: 'ingredients/add', component: CreateIngredientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
