import { Injectable, OnApplicationBootstrap } from '@nestjs/common'; 
import { OrderService } from 'src/order/order.service';
import log = require('log-to-file')
import { throwError } from 'rxjs';
 
@Injectable() 
export class CronService  implements OnApplicationBootstrap {  
    constructor( 
        private readonly orderService: OrderService,
    ) {} 

    async check2Hour(){
      const tzoffset = new Date().getTimezoneOffset() * 60000;
      const  dtNow = new Date(Date.now() - tzoffset) 
       //current date with timezone +6
      let fromDate = new Date(dtNow)
      let toDate = new Date(dtNow)
      console.log('dtNow', dtNow)
      const order = await this.orderService.getAlls({ fromDate: new Date(fromDate.setMinutes(dtNow.getMinutes() - 120)).toISOString(), toDate: new Date(toDate.setMinutes(dtNow.getMinutes() - 119)).toISOString()})
     if(order.length>0){
        for(let i =0; i< order.length; i++){
          '2hours logged'
          log(`{{ ${dtNow} }} | Привет {{ ${order[i].client.name} }}. Через 2 часа у вас консультация с юристом {{ ${order[i].lawyer.name} }}`, 'src/data/data.log')
        }
     }

    let fromDate1 = new Date(dtNow)
    let toDate1 = new Date(dtNow)
    const order1 = await this.orderService.getAlls({ fromDate: new Date(fromDate1.setMinutes(dtNow.getMinutes() - 120)).toISOString(), toDate: new Date(toDate1.setMinutes(dtNow.getMinutes() - 119)).toISOString()})
    if(order1.length>0){
      for(let i = 0; i <  order1.length; i++){
        '1 Day logged'
        log(`{{ ${dtNow} }} | Привет {{ ${order1[i].client.name} }}. Напоминаем о консультации с юристом {{ ${order1[i].lawyer.name} завтра в {{ ${order1[i].fromDate} }}`, 'src/data/data.log')
      }
   }

    }
    async logToFile( currentDate: any, clientName: string, lawyerName: string){
      log(`{{ ${currentDate} }} | Привет {{ ${clientName} }}. Через 2 часа у вас консультация с юристом {{ ${lawyerName} }}`, 'src/data/data.log')
    }
    async onApplicationBootstrap() {
        setInterval(()=>this.check2Hour(), 60000)
    }
}