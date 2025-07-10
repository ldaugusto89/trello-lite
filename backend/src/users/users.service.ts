import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { UnauthorizedException } from '@nestjs/common';

const token = randomUUID();

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword,
        emailVerifyToken: token, 
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      if(!user.isEmailVerified){
        throw new UnauthorizedException('Email não verificado');
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}