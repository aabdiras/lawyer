import { Module } from "@nestjs/common";
import { OrdersModule } from "src/order/order.module";
import { CronService } from "./cron.service";


@Module({
    imports: [OrdersModule],
    providers: [CronService],
    exports: [CronService]
})
export class CronModule {}