import { Step } from "src/step/entities/step.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Ingredient} from "../../ingredients/entities/ingredient.entity";

@Entity()
export class Denree {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    quantity:number;

    @ManyToOne(() => Ingredient, ig => ig.denreeUsed)
    ingredient:Ingredient;

    @ManyToOne(() => Step, s => s.denreeUsed)
    step: Step;
}
