import { Component, OnInit } from '@angular/core';
import { Recipe } from "../../../model/recipe";
import { RecipeService } from "../../../service/recipe.service";
import { Observable } from "rxjs";
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import * as M from 'materialize-css';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  public recipes: Recipe[] = [];
  public recipes_filtered: Recipe[] = []; 
  public search_control : FormGroup | null = null; 
  public categorie_list: Set<String> = new Set<String>();
  public categorie: String | null = null;   

  constructor(
    private recipeService: RecipeService, 
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.majRecipe();

    this.search_control = this.fb.group({
      recipe_control: [''], 
      categorie_recipe_control: [''], 
      ingredient_control: [''], 
    });

    this.initMaterialize();
  }

  majRecipe(): void {
    this.getRecipes().subscribe(
      data => { 
        this.recipes = data
        this.recipes_filtered = data
        this.recipes.map(
          el => this.categorie_list.add(el.category)
        );
      } 
    );
  }

  getRecipes(): Observable<Recipe[]> {
    return this.recipeService.getAllRecipes();
  }


  deleteRecipe(recipe: Recipe): void {
    if (!recipe.id) {
      console.log("La recette demandé n'existe pas");
      return;
    }
    console.log("Mon identifiant : " + recipe.id);
    M.toast({ html: recipe.name + ' vient d\'être supprimée !' })
    this.recipeService.deleteRecipe(recipe.id).subscribe(
      () => this.majRecipe()
    );
  }

  sellRecipe(recipe: Recipe) {
    this.recipeService.sellRecipe(recipe.id!).subscribe();
    console.log("Mise à jour des ingrédients fait ");
    M.toast({ html: recipe.name + ' vient d\'être vendu !' })
  }

  initMaterialize() {
    let options: any = {};
    M.FormSelect.init(document.querySelectorAll('select'), options);
  }

  searchRecipe (recipeName: string) {
    console.log(recipeName);
    this.recipes_filtered = []; 
    this.recipes.map(
      el => {
        if (el.name.includes(recipeName))
          this.recipes_filtered.push(el);
      }
    );
  }

  acceptRecipeCategorie(cat: String): boolean {
    //On retourne vrai si on ne trie pas (this.categorie est null) ou si c'est le bon truc
    return (this.categorie == null || cat == this.categorie)
  }

  selectNewCategorie(value: any): void {
    console.log("Valeur de la catégorie : ", value);    
    this.categorie = (value == "") ? null : value; 
  }
}
