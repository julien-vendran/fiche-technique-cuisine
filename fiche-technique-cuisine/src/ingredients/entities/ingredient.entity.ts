import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number; 
    
    @Column()
    name: String;

    //A voir si on fait pas une table enum ici
    @Column()
    unit: String; 

    @Column()
    availableQuantity: number; 

    @Column()
    unitPrice: number; 

    //A changer et ajouter une table
    @Column({default : false})
    isAllergenic: boolean; 
}
