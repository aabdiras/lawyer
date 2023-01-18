import { Entity, Generated, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LawBranches } from "./lawBranches.entity";
import { Lawyer } from "./lawyer.entity";

@Entity({ name: 'listLawBranches'})
export class listLawBranches{
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    public uid: string

    @ManyToMany((type) => Lawyer, (lawyer) => lawyer.uid, {
        eager: true,
    })
    @JoinColumn({ name: 'lawyerId'})
    readonly lawyer: Lawyer

    @ManyToMany((type) => LawBranches, (lawbranches) => lawbranches.uid, {
        eager: true,
    })
    @JoinColumn({ name: 'lawBranchesId'})
    readonly lawbranche: LawBranches
} 

