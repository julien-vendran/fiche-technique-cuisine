import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateIngredientComponent } from './component/ingredient/create-ingredient/create-ingredient.component';

import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './component/utile/nav-bar/nav-bar.component';
import { FooterComponent } from './component/utile/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateIngredientComponent,
    NavBarComponent,
    FooterComponent,
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
