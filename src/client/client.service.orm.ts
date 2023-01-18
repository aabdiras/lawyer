import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { Client } from "./entity/client.entity";

@Injectable()
export class ClientService extends TypeOrmCrudService <Client>{
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository <Client>
    ){
        super(clientRepository);
    }
    
    getAlls(entity): Promise<Client[]>{
        const filter = []
        if (entity.name) filter.push({ query: 'LOWER(client.name) like LOWER(:name)', args: {name: `%${entity.name.toLowerCase()}%`} })
        if (entity.phoneNumber) filter.push({ query: 'LOWER(client.phoneNumber) like LOWER(:phoneNumber)', args: {phoneNumber: `%${entity.phoneNumber.toLowerCase()}%`} })
        const query = this.clientRepository.createQueryBuilder("client")
        
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