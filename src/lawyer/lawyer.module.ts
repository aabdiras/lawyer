import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LawBranches } from "./entity/lawBranches.entity";
import { Lawyer } from "./entity/lawyer.entity";
import { listLawBranches } from "./entity/listLawBranches.entity";
import { LawyerService } from "./lawyer.service.orm";

@Module({
    imports: [TypeOrmModule.forFeature([Lawyer]), TypeOrmModule.forFeature([LawBranches]), TypeOrmModule.forFeature([listLawBranches])],
    providers: [LawyerService],
    exports: [LawyerService]
})
export class LawyersModule {}