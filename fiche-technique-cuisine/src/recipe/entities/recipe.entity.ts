import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    ChildEntity,
    Tree,
    TreeChildren
} from 'typeorm';
import {RecipeOrStep} from "../../recipe-or-step/entities/recipe-or-step.entity";

@Entity()
@Tree("closure-table")
export class Recipe extends RecipeOrStep{

    @Column()
    responsable:String;

    @Column("int")
    nbOfCover: number;

    @Column()
    category: String;

    @TreeChildren()
    listOfSteps: RecipeOrStep[];
}
