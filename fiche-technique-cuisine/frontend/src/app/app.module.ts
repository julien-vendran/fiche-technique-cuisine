import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateIngredientComponent } from './component/ingredient/create-ingredient/create-ingredient.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './component/utile/nav-bar/nav-bar.component';
import { FooterComponent } from './component/utile/footer/footer.component';
import { ListIngredientsComponent } from './component/ingredient/list-ingredients/list-ingredients.component';
import { CreateAllergenComponent } from './component/allergen/create-allergen/create-allergen.component';
import { ListAllergensComponent } from './component/allergen/list-allergens/list-allergens.component';
import { CreateRecipeComponent } from './component/recipe/create-recipe/create-recipe.component';
import { RecipeListComponent } from './component/recipe/recipe-list/recipe-list.component';
import { CreateStepComponent } from './component/step/create-step/create-step.component';
import { RecipeInfoComponent } from './component/recipe/recipe-info/recipe-info.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateIngredientComponent,
    NavBarComponent,
    FooterComponent,
    ListIngredientsComponent,
    CreateAllergenComponent,
    ListAllergensComponent,
    CreateRecipeComponent,
    RecipeListComponent,
    CreateStepComponent,
    RecipeInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
