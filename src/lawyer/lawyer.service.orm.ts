import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { LawyerDto } from "./dto/lawyerDto";
import { Lawyer } from "./entity/lawyer.entity";

@Injectable()
export class LawyerService extends TypeOrmCrudService <Lawyer>{
    constructor(
        @InjectRepository(Lawyer)
        private readonly layerRepository: Repository <Lawyer>
    ){
        super(layerRepository);
    }
    
    getAlls(entity: LawyerDto): Promise<Lawyer[]>{
        const filter = []
        const {name} = entity
        if(name) filter.push({ query: 'LOWER(lawyer.name) like LOWER(:name)', args: {name: `%${name.toLowerCase()}%`} })
        const query = this.layerRepository.createQueryBuilder("lawyer")
        
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