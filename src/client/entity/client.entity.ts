import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'client'})
export class Client{
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    public uid: string

    @Column({length: 50, nullable: false})
    readonly name: string

    @Column({length: 50, nullable: false})
    readonly phoneNumber: string

    @Column({length: 50, nullable: false})
    readonly password: string
} 