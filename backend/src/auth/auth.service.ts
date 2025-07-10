import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(email:string, password:string){
        return await this.usersService.validateUser(email, password)
    }

    async login(email: string, password: string){
        const user = await this.validateUser(email, password)
        if(!user){
            throw new UnauthorizedException()
        }
        
        return {
            access_token: this.jwtService.sign({sub: user.id, email: user.email})
        }
    }
    async register(name: string, email: string, password: string){
        const user = await this.usersService.createUser(name, email, password)
        
        return {
            access_token: this.jwtService.sign({sub: user.id, email: user.email})
        }
    }
}
