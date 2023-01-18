import { Generated, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    public uid: string
}