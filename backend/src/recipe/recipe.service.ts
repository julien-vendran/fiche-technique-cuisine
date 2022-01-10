import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Recipe } from "./entities/recipe.entity";
import { Step } from 'src/step/entities/step.entity';
import { Repository } from "typeorm";
import { StepService } from 'src/step/step.service';



@Injectable()
export class RecipeService {

  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepo: Repository<Recipe>,
    private readonly stepService: StepService
  ) { }

  create(createRecipeDto: CreateRecipeDto) {

    console.log("Log : recipeDTO ", createRecipeDto);
    let temp = this.recipeRepo.create(createRecipeDto);
    return this.recipeRepo.manager.save(temp);
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeRepo.find({ relations: ["parents", "listOfSteps"] });
  }

  findOne(id: number): Promise<Recipe> {
    return this.recipeRepo.findOne(id, { relations: ["parents", "listOfSteps", "listOfSteps.denreeUsed", "listOfSteps.denreeUsed.ingredient"] });
  }

  finOneWithOutDenree(id: number): Promise<Recipe> {
    return this.recipeRepo.findOne(id, { relations: ["parents", "listOfSteps"] });
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return this.recipeRepo.update(id, updateRecipeDto);
  }

  remove(id: number) {
    this.recipeRepo.delete(id).then(res => console.log("donnée supprimer : ", res));

    return;
  }

  async getCostForRecipeById(id: number) {
    let r: Recipe = await this.findOne(id);
    let coutMP: any = await this.getCoutRecipe(r);
    return coutMP;
  }

  combineCout(receive: any, other: any): any {
    return {
      coutMatiere: receive.coutMatiere + other.coutMatiere,
      coutCharges: {
        personnel: receive.coutCharges.personnel + other.coutCharges.personnel,
        fluides: receive.coutCharges.fluides + other.coutCharges.fluides
      }
    }
  }

  private async getCoutRecipe(recipeToTest: Recipe): Promise<any> {
    let jsonToReturn: any = {
      coutMatiere: 0,
      coutCharges: {
        personnel: 0,
        fluides: 0
      }
    }
    if (!recipeToTest) return jsonToReturn; //On vérifie que notre Recette n'est pas null ou undefined 
    if (!recipeToTest.listOfSteps) return jsonToReturn; //Notre recette n'a pas d'étape et donc pas de coût

    for (let index = 0; index < recipeToTest.listOfSteps.length; index++) {

      if (recipeToTest.listOfSteps[index] instanceof Recipe) { //Si c'est une recette, on va chercher son prix 
        jsonToReturn = this.combineCout(jsonToReturn, await this.getCoutRecipe(await this.findOne(recipeToTest.listOfSteps[index].id) as Recipe));
      } else {
        jsonToReturn = this.combineCout(jsonToReturn, this.getCoutStep(recipeToTest.listOfSteps[index] as Step));
      }
    }
    return jsonToReturn;
  }

  private getCoutStep(stepToTest: Step): number {
    let jsonToReturn: any = {
      coutMatiere: 0,
      coutCharges: {
        personnel: 0,
        fluides: 0
      }
    }

    if (!stepToTest.denreeUsed) return jsonToReturn; //Cette étape n'utilise pas d'ingrédient
    let res: number = 0;
    for (let index = 0; index < stepToTest.denreeUsed.length; index++) { //Ajout des prix des ingrédients utilisés
      const element = stepToTest.denreeUsed[index];
      res += element.quantity * element.ingredient.unitPrice;
    }

    jsonToReturn.coutMatiere = res;
    jsonToReturn.coutCharges.personnel = (stepToTest.duration / 60) * 10.75;
    jsonToReturn.coutCharges.fluides = (stepToTest.duration / 60) * 2;
    return jsonToReturn;
  }

  async consumeRecipe(id: number) {
    const recipe: Recipe = await this.findOne(id);
    recipe.listOfSteps.map(
      data => {
        if (data instanceof Recipe) this.consumeRecipe(data.id);
        else this.stepService.consumeStep(data.id); //Si c'est pas une recette, c'est une Step
      }
    );
  }
}
