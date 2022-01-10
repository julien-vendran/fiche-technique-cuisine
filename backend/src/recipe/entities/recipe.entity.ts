import { Column, ChildEntity } from 'typeorm';
import { RecipeOrStep } from "../../recipe-or-step/entities/recipe-or-step.entity";

@ChildEntity()
export class Recipe extends RecipeOrStep {

    @Column()
    responsable: String;

    @Column("int")
    nbOfCover: number;

    @Column()
    category: String;


}
