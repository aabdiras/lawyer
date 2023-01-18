import { Injectable, UnauthorizedException, OnApplicationBootstrap } from '@nestjs/common'; 
import { ClientService } from 'src/client/client.service.orm';
import * as jwt from 'jsonwebtoken' 
import { CronService } from 'src/cron/cron.service';
import { Interval } from '@nestjs/schedule';
import { OrderService } from 'src/order/order.service';

@Injectable() 
export class AuthService /* implements OnApplicationBootstrap*/ {  
  constructor(private readonly clientService: ClientService,
     ) {} 

  /*async check(){
    const oneDay = this.orderService.getAlls({ searchDate: new Date()})
    console.log('check', new Date())
  }
  async onApplicationBootstrap() {
    setInterval(()=>this.check(), 60000)
  }*/
  async authenticate(login: string, password: string): Promise<any>{
    const accountList = await this.clientService.getAlls({})
    for(let item of accountList){
      if(login === item.phoneNumber && password === item.password){
        const jwtToken = await this.generateJWT(login)
        return{
          success: true,
          jwtToken: jwtToken
        }
      }
    }
    throw new UnauthorizedException({
      statusCode: 401,
      error: 'Unauthorized'
    })
  }
  async generateJWT(user: any): Promise<string> { 
    const jwtToken = jwt.sign(user, 'secret') 
    return jwtToken
  } 
  decodeJWT(token: string): any { 
    return jwt.verify(token, 'secret') 
  }
 validateToken(token: string): any{
  if(!token){
    return undefined
  }
  try{
    const decodedJWT = this.decodeJWT(token.replace('Bearer ', ''))
    if(decodedJWT){
      return decodedJWT
    }
  } catch {
    throw new UnauthorizedException()
  }
 } 
}