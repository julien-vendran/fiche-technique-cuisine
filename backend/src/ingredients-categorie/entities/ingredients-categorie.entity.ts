import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class IngredientsCategorie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: String;

    @OneToMany(() => Ingredient, (ingredient) => ingredient.categorie)
    ingredients: Ingredient[]
}
