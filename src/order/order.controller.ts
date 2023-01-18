import { Body, Controller, Get, Headers, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guard/jwtAuthGuard';
import { OrderDto } from './dto/orderDto';
import { OrderService } from './order.service';

@Controller('order')
@UseGuards(JWTAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true, errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY}))
  async order(@Body() orderDto: OrderDto, @Headers() headers: any){
    return await this.orderService.createOrder(orderDto, headers.authorization)
  }
}
