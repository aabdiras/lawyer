import { AuthService } from "../auth.service";
import { ExecutionContext, CanActivate, Injectable,  UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class JWTAuthGuard implements CanActivate{
  constructor(
    private readonly authService: AuthService
  ){}
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const reflector = new Reflector()
    try{
      const request = context.switchToHttp().getRequest()
      const user = await this.authService.validateToken(request.headers.authorization)
      if(user){
        return true
      }
      throw new UnauthorizedException()
    } catch(error) {
      throw new UnauthorizedException()
    }
  }

}