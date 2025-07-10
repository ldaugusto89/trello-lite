import { BadRequestException, Body, Controller, Post, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';



@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly prisma: PrismaService
    ){}

    @Post('register')
    async register(@Body() body: {name: string, email: string, password: string}){
        return this.authService.register(body.name, body.email, body.password)
    }

    @Post('login')
    async login(@Body() body: {email: string, password: string}){
        return this.authService.login(body.email, body.password)
    }

    @Get('verify-email')
    async verifyEmail(@Query('token') token: string) {
        const user = await this.prisma.user.findFirst({
            where: { emailVerifyToken: token }
        })

        if(!user){
            throw new BadRequestException('Token inválido ou expirado');
        }

        await this.prisma.user.update({
            where: { id: user.id },
            data: { 
                isEmailVerified: true,
                emailVerifyToken: null,
            }
        })

        return {message: 'Email verficado com sucesso'}
    }
}
