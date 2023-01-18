import { Column, Entity, Generated, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { listLawBranches } from "./listLawBranches.entity";

@Entity({ name: 'lawBranches'})
export class LawBranches{
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    public uid: string

    @Column({length: 50, nullable: false})
    readonly name: string
}