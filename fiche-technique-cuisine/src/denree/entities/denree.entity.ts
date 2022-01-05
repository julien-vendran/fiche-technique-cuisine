import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Ingredient} from "../../ingredients/entities/ingredient.entity";

@Entity()
export class Denree {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    quantity:number;

    @ManyToOne(() =>Ingredient)
    ingredient:Ingredient;

}
