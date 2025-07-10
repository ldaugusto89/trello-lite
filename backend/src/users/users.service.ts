import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { UnauthorizedException } from '@nestjs/common';

const token = randomUUID();
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashedPassword,
        emailVerifyToken: token, 
      },
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
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