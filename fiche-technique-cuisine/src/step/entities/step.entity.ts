import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, ChildEntity} from 'typeorm';
import {Ingredient} from "../../ingredients/entities/ingredient.entity";
import {RecipeOrStep} from "../../recipe-or-step/entities/recipe-or-step.entity";

@Entity()
export class Step extends RecipeOrStep{

    @ManyToMany(()=>Ingredient)
    @JoinTable()
    listIngredient: Ingredient[];

    @Column()
    description: String;

    @Column()
    duration: String; //TODO trouver un type mieux

}