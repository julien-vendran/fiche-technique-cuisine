/**
 * Liste des allergènes
 */
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Ingredient } from 'src/ingredients/entities/ingredient.entity';

@Entity()
export class Allergen {
    @PrimaryGeneratedColumn()
    id_Allergen: number;

    @Column({})
    allergen_name: string;

    @ManyToMany(() => Ingredient, ing => ing.associatedAllergen)
    ingredients: Ingredient[];
}
