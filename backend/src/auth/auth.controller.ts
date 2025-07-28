import { BadRequestException, Body, Controller, Post, Get, Query, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthenticatedRequest } from 'src/common/types/request-with-user';



@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
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

    @Get('authToken')
    async getAuthToken(@Body() body:{ id:string, email: string}){
        
        if(!body.id || !body.email){
            throw new BadRequestException('Dados inválidos');
        }

        return {
            access_token: this.jwtService.sign({sub: body.id, email: body.email})
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Req() req: AuthenticatedRequest) {
        return req.user;
    }
}
