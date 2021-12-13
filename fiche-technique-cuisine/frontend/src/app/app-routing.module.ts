import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIngredientComponent } from './component/ingredient/create-ingredient/create-ingredient.component';
import { ListIngredientsComponent } from './component/ingredient/list-ingredients/list-ingredients.component';
import {CreateAllergenComponent} from "./component/allergen/create-allergen/create-allergen.component";
import {ListAllergensComponent} from "./component/allergen/list-allergens/list-allergens.component";
const routes: Routes = [
  { path: 'ingredients/add', component: CreateIngredientComponent },
  { path : 'ingredients', component: ListIngredientsComponent },
  { path : 'allergens/add', component: CreateAllergenComponent },
  { path : 'allergens', component: ListAllergensComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
