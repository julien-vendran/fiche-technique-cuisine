import { IngredientsCategorie } from 'src/ingredients-categorie/entities/ingredients-categorie.entity';

import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Unique} from 'typeorm';
import {Allergen} from "../../allergen/entities/allergen.entity";

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(/*{unique:true}*/)
    name: String;

    //A voir si on fait pas une table qui sert d'enum ici
    @Column()
    unit: String;

    @Column()
    availableQuantity: number;

    @Column("real")
    unitPrice: number; 

    @ManyToOne( () => IngredientsCategorie, ig => ig.ingredients)
    categorie: IngredientsCategorie;

    @ManyToMany(type => Allergen)
    @JoinTable()
    associatedAllergen: Allergen[];
}
