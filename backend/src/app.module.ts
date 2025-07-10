import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { PrismaModule } from './prisma/prisma.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [AuthModule, UsersModule, EmailModule, PrismaModule, BoardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
