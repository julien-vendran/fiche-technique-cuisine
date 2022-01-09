import { Component, Input, OnInit } from '@angular/core';
import { Cost } from '../../../model/cost';
import { Recipe } from '../../../model/recipe';
import { RecipeService } from '../../../service/recipe.service';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent implements OnInit {

  @Input() public recipe: Recipe | null = null;
  public cost: Cost | null = null;

  constructor(
    private serviceRecipe: RecipeService
  ) {}

  ngOnInit(): void {
    if (this.recipe && this.recipe.id) {
      this.serviceRecipe.getCostByRecipeId(this.recipe.id).subscribe(
        //data => console.log("Voilà ce qu'on recoit", this.jsonToCost(data))
        data => {
          this.cost = this.jsonToCost(data);
          this.cost.beneficeParPortion = (this.cost.prixDeVente - this.cost.coutDeProduction) / this.recipe?.nbOfCover!;
          this.cost.seuilDeRentabilite = 1; // TODO: A vérifier, on a pas les coûts fixes de la cuisine donc c'est con
        }
      );
    }
    console.log(this.cost);
  }

  jsonToCost(json: any): Cost {
    return new Cost (
      json.coutMatiere,
      json.coutCharges.personnel,
      json.coutCharges.fluides,
      null
    );
  }
}
