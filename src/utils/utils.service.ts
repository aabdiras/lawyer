import { Injectable, Logger } from '@nestjs/common'; 
import { CustomResponse } from './core/interfaces/customResponse.interface'; 
import { RESPONSE_STATUS } from './core/enums/responseStatus.enum'; 
 
@Injectable() 
export class UtilsService { 
  private readonly logger = new Logger(UtilsService.name); 
 
  constructor() {} 
 
  buildSuccessResponse(data: unknown): CustomResponse { 
    return { 
      status: RESPONSE_STATUS.SUCCESS, 
      data, 
      error: undefined, 
    }; 
  } 
}