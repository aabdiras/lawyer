import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthAdModule } from './auth/auth.module';
import { ClientsModule } from './client/client.module';
import { DatabaseModule } from './config/database';
import { CronModule } from './cron/cron.module';
import { OrdersModule } from './order/order.module';

@Module({
  imports: [
    DatabaseModule, ClientsModule, AuthAdModule, OrdersModule, CronModule, CronModule
  ],
  //providers: [{ provide: APP_INTERCEPTOR}]
})
export class AppModule {}
