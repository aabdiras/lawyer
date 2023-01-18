import { ERROR_CODES } from "../enums/errorCodes.enum";

export interface CustomError {
    code: ERROR_CODES;
    msg: string | string[];
    namespace: string;
}