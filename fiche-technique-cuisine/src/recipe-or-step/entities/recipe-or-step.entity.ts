import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    ChildEntity,
    TableInheritance, OneToMany
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class RecipeOrStep {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(/*{unique:true}*/)
    name : String;

    @OneToMany(()=>RecipeOrStep,recepi=>recepi.parents)
    listOfSteps: RecipeOrStep[];

    @ManyToOne(()=>RecipeOrStep, reci=>reci.listOfSteps)
    parents: RecipeOrStep;
}
