import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthAdModule } from "src/auth/auth.module";
import { ClientsModule } from "src/client/client.module";
import { LawyersModule } from "src/lawyer/lawyer.module";
import { Order } from "./entity/order.entity";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
    imports: [TypeOrmModule.forFeature([Order]), AuthAdModule, LawyersModule, ClientsModule],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService]
})
export class OrdersModule {}