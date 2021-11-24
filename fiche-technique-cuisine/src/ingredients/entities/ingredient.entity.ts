import { IngredientsCategorie } from 'src/ingredients-categorie/entities/ingredients-categorie.entity';
import { getEnabledCategories } from 'trace_events';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number; 
    
    @Column()
    name: String;

    //A voir si on fait pas une table qui sert d'enum ici
    @Column()
    unit: String; 

    @Column()
    availableQuantity: number; 

    @Column()
    unitPrice: number; 

    //A changer et ajouter une table
    @Column({default : false})
    isAllergenic: boolean; 

    @ManyToOne( () => IngredientsCategorie, ig => ig.ingredients)
    categorie: IngredientsCategorie; 
}
