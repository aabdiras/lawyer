import * as moment from "moment";
import { Client } from "src/client/entity/client.entity";
import { Lawyer } from "src/lawyer/entity/lawyer.entity";
import { Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'order'})
export class Order{
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  public uid: string

  @ManyToOne((type) => Lawyer, (lawyer) => lawyer.uid, {
    eager: true,
  })
  @JoinColumn({ name: 'lawyerId'})
  readonly lawyer: Lawyer

  @ManyToOne((type) => Client, (client) => client.uid, {
    eager: true,
  })
  @JoinColumn({ name: 'clientId'})
  readonly client: Client

  @Column({ 
      type: 'timestamp with time zone', 
      transformer: { 
        to: (d) => d, 
        from: (d) => { 
          if (!d) return d 
          return moment(d).utcOffset('+06:00').format('DD.MM.YY HH:mm:ss') 
        }, 
      }, 
      nullable: true, 
      default: () => 'CURRENT_TIMESTAMP', 
  }) 
  readonly fromDate: Date

  @Column({ 
      type: 'timestamp with time zone', 
      transformer: { 
        to: (d) => d, 
        from: (d) => { 
          if (!d) return d 
          return moment(d).utcOffset('+06:00').format('DD.MM.YY HH:mm:ss') 
        }, 
      }, 
      nullable: true, 
      default: () => 'CURRENT_TIMESTAMP', 
  }) 
  readonly endDate: Date
} 