import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientService } from "./client.service.orm";
import { Client } from "./entity/client.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Client])],
    providers: [ClientService],
    exports: [ClientService]
})
export class ClientsModule {}