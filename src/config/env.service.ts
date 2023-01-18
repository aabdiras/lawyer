import * as dotenv from 'dotenv'
import { resolve } from 'path'
import * as fs from 'fs'

export class EnvData {
    DB_HOST: string = undefined
    DB_NAME: string = undefined
    DB_PORT: number = undefined
    DB_USER: string = undefined
    DB_PASS: string = undefined
    PORT: number = undefined
    CRON_JOB_FREQUENCY: string = undefined
}

export class EnvService {
    private envPath: any
    private vars = new EnvData()
    private data: any
    private readonly nodeEnv: string = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : undefined


    constructor(){
        switch(this.nodeEnv){  
            case 'local':
                this.envPath = resolve(__dirname, '../../.env')
                this.data = dotenv.parse(fs.readFileSync(this.envPath))
                this.vars = this.data
                break
            case 'production':
                console.log('prod')
                Object.keys(this.vars).forEach((key) => {
                    if(process.env[key] == undefined){
                        console.log('environment variable: ' + key + 'is undefined')
                    } else {
                        this.vars[key] = process.env[key]
                    }
                })
                break
            case 'development':
                console.log('ff')
                Object.keys(this.vars).forEach((key) => {
                    if(process.env[key] == undefined){
                        console.log('environment variable:' + key + 'is undefined')
                    } else {
                        this.vars[key] = process.env[key]
                    }
                })
                break
            case 'debug': break
            default: 
                this.envPath = resolve(__dirname, '../../.env')
                this.data = dotenv.parse(fs.readFileSync(this.envPath))
                this.vars = this.data
                break
        }
    }
    get(key: string): string {
        if(this.vars){
            return this.vars[key]
        }
        return process.env[key]
    }

    read(): EnvData {
        return this.vars
    }
}