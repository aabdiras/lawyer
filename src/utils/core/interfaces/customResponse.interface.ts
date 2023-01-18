import { RESPONSE_STATUS } from "../enums/responseStatus.enum";
import { CustomError } from "./customError.interface";

export interface CustomResponse{
    status: RESPONSE_STATUS;
    data: any;
    error: CustomError;
}