import { Module, Global, DynamicModule } from '@nestjs/common' 
import { EnvModule } from './env.module' 
import { EnvService } from './env.service' 
import { TypeOrmModule } from '@nestjs/typeorm' 
 
function DatabaseOrmModule(): DynamicModule { 
  const config = new EnvService().read() 
  return TypeOrmModule.forRoot({ 
    type: 'postgres', 
    host: config.DB_HOST, 
    port: config.DB_PORT, 
    username: config.DB_USER, 
    password: config.DB_PASS, 
    database: config.DB_NAME, 
    autoLoadEntities: true, 
    synchronize: false, 
    logging: true, 
    migrationsTableName: 'migrations', 
    migrations: [__dirname + 'db/migration/*.js'], 
  }) 
} 
 
@Global() 
@Module({ 
  imports: [EnvModule, DatabaseOrmModule()], 
}) 
export class DatabaseModule { }