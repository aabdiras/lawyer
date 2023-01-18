import { Global, Module } from "@nestjs/common";
import { ClientsModule } from "src/client/client.module";
import { ClientService } from "src/client/client.service.orm";
import { EnvModule } from "src/config/env.module";
import { CronModule } from "src/cron/cron.module";
import { OrdersModule } from "src/order/order.module";
import { OrderService } from "src/order/order.service";
import { UtilsService } from "src/utils/utils.service";
import { AuthAdController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Global()
@Module({
    controllers: [AuthAdController],
    imports: [EnvModule, ClientsModule],
    providers: [AuthService, UtilsService],
    exports: [AuthService], 
})
export class AuthAdModule{}