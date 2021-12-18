import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, ChildEntity} from 'typeorm';

export abstract class RecipeOrStep {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name : String;
}
