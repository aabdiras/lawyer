import { IsNotEmpty, IsString } from "class-validator";


export class LawyerDto{
    @IsString()
    @IsNotEmpty()
    readonly name: string
}