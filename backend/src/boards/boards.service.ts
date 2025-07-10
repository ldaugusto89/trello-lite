import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsService {
    constructor( private readonly prisma: PrismaService ){}

    async create(title: string, userId: string) {
    return this.prisma.board.create({
      data: { title, ownerId: userId },
    });
  }

  async findAll(userId: string) {
    return this.prisma.board.findMany({
      where: { ownerId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const board = await this.prisma.board.findUnique({ where: { id } });
    if (!board || board.ownerId !== userId) {
      throw new NotFoundException('Board não encontrado');
    }
    return board;
  }

  async update(id: string, title: string, userId: string) {
    await this.findOne(id, userId); // verifica se pertence ao usuário
    return this.prisma.board.update({
      where: { id },
      data: { title },
    });
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId); // verifica se pertence ao usuário
    return this.prisma.board.delete({ where: { id } });
  }

}
