import { Denree } from 'src/denree/entities/denree.entity';
import { Column, ChildEntity, OneToMany } from 'typeorm';
import { RecipeOrStep } from "../../recipe-or-step/entities/recipe-or-step.entity";

@ChildEntity()
export class Step extends RecipeOrStep {

    @Column()
    description: String;

    @Column()
    duration: number;

    @OneToMany(() => Denree, d => d.step, { onDelete: "CASCADE" })
    denreeUsed: Denree[];
}