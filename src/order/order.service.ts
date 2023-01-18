import { Injectable, NotAcceptableException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { AuthService } from "src/auth/auth.service";
import { ClientService } from "src/client/client.service.orm";
import { LawyerService } from "src/lawyer/lawyer.service.orm";
import { Repository } from "typeorm";
import { OrderDto } from "./dto/orderDto";
import { Order } from "./entity/order.entity";

@Injectable()
export class OrderService extends TypeOrmCrudService<Order>{
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly lawyerService: LawyerService,
        private readonly authService: AuthService,
        private readonly clientService: ClientService
    ){
        super(orderRepository)
    }

    async createOrder(order: OrderDto, jwtToken: any): Promise<Order>{
        const username = await this.authService.validateToken(jwtToken)
        const userData = await this.clientService.getAlls({ phoneNumber: username})

        const {lawyer, orderDate} = order
        const lawyerData = await this.lawyerService.getAlls({name: lawyer.name})
        const orderList = await this.getAlls(order)

        if(lawyerData.length === 0) {
            throw new NotAcceptableException('Lawyer not found')
        } else if (orderList.length > 0) {
            throw new NotAcceptableException('The date is not free, Please choose other date')
        }
        //Everything is right
        const createOrder = await this.orderRepository.save({
            lawyer: lawyerData[0], 
            client: userData[0], 
            fromDate: orderDate, 
            endDate: new Date(new Date(orderDate).getTime() + 40 * 60 * 1000)
        })
        return createOrder
    }
    
    async getAlls(entity): Promise<Order[]>{
        const filter = []
        console.log('entity getalls', entity)
        let { lawyer, orderDate,fromDate, toDate} = entity
        if(lawyer && lawyer.name){
            filter.push({ 
                query: 'LOWER(lawyer.name) like LOWER(:lawyer)', 
                args: { lawyer: `%${lawyer.name.toLowerCase()}%`} 
            })
        }
        if(fromDate && toDate){
            filter.push({
                query: `order.fromDate >= :fromDate`,
                args: { fromDate: `%${fromDate}%`}
            })
            filter.push({
                query: `order.fromDate < :toDate`,
                args: { toDate: `%${toDate}%`}
            })
        }
        if(orderDate) {
            filter.push({
                query: `order.fromDate <= :orderDate`,
                args: { orderDate: `%${orderDate}%`}
            })
            filter.push({
                query: `order.endDate >= :orderDate`,
                args: { orderDate: `%${orderDate}%`}
            })
        }
        const query = this.orderRepository.createQueryBuilder("order")
            .leftJoinAndSelect('order.lawyer', 'lawyer')
            .leftJoinAndSelect('order.client', 'client')

        if(Object.keys(filter).length >=1){
            const firstFilter = filter[Object.keys(filter)[0]]
            query.where(firstFilter.query, firstFilter.args)

            for(let i = 1; i< Object.keys(filter).length; i++){
                const curretFilter = filter[Object.keys(filter)[i]]
                query.andWhere(curretFilter.query, curretFilter.args)
            }
        }
        return <Promise<any[]>>
        query
        .getMany()
        
    }
}