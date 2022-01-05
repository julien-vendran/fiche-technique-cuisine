import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIngredientComponent } from './component/ingredient/create-ingredient/create-ingredient.component';
import { ListIngredientsComponent } from './component/ingredient/list-ingredients/list-ingredients.component';
import { CreateAllergenComponent } from "./component/allergen/create-allergen/create-allergen.component";
import { ListAllergensComponent } from "./component/allergen/list-allergens/list-allergens.component";

import { RecipeListComponent } from './component/recipe/recipe-list/recipe-list.component';
import { CreateRecipeComponent } from './component/recipe/create-recipe/create-recipe.component';
import { CreateStepComponent } from "./component/step/create-step/create-step.component";
import { RecipeInfoComponent } from "./component/recipe/recipe-info/recipe-info.component";
import { HomeComponent } from './component/utile/home/home.component';
import {CreateDenreeComponent} from "./component/denree/create-denree/create-denree.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'ingredients/add', component: CreateIngredientComponent },
  { path: 'ingredients/update/:id', component: CreateIngredientComponent },
  { path: 'ingredients', component: ListIngredientsComponent },
  { path: 'allergens/add', component: CreateAllergenComponent },
  { path: 'allergens', component: ListAllergensComponent },
  { path: 'recipe', component: RecipeListComponent },
  { path: 'recipe/add', component: CreateRecipeComponent },
  { path: 'recipe/info/:id', component: RecipeInfoComponent },
  { path: 'step/add', component: CreateStepComponent },
  {path: 'denree/add',component:CreateDenreeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
