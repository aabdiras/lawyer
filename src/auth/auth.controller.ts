import { Body, Controller, Get, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthAdController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/login')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true, errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY}))
  async loginAd(@Body() authDto: AuthDto){
    return await this.authService.authenticate(authDto.username, authDto.password)
  }
}
