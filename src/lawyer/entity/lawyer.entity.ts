import { Order } from "src/order/entity/order.entity";
import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'lawyer'})
export class Lawyer{
    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    public uid: string

    @Column({length: 50, nullable: false})
    readonly name: string

    @OneToMany((type) => Order, (order) => order.lawyer, {
    })
    readonly order: Order
} 