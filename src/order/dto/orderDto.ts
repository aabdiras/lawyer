import { IsDate, IsDateString, isDateString, IsNotEmpty, IsObject, IsOptional, IsString} from "class-validator";
import { Type } from "class-transformer";


export class OrderDto{
    @IsDateString()
    //@Type(() => Date)
    readonly orderDate: Date

    @IsObject()
    readonly lawyer: any

    @IsDate()
    @IsOptional()
    readonly fromDate: any

    @IsDate()
    @IsOptional()
    readonly toDate: any
}