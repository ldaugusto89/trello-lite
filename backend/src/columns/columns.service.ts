import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ColumnsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(title: string, boardId: string, userId: string) {
        const board = await this.prisma.board.findUnique({ where: { id: boardId } });
        if (!board || board.ownerId !== userId) {
            throw new NotFoundException('Board não encontrado ou sem acesso');
        }

        return this.prisma.column.create({
            data: {
                title,
                boardId,
            },
        });
    }

    async findByBoard(boardId: string, userId: string) {
        const board = await this.prisma.board.findUnique({ where: { id: boardId } });
        if (!board || board.ownerId !== userId) {
            throw new NotFoundException('Board não encontrado ou sem acesso');
        }

        return this.prisma.column.findMany({
            where: { boardId },
            orderBy: { createdAt: 'asc' },
        });
    }

    async update(id: string, title: string, userId: string) {
        const column = await this.prisma.column.findUnique({ where: { id } });
        if (!column) throw new NotFoundException('Coluna não encontrada');

        const board = await this.prisma.board.findUnique({ where: { id: column.boardId } });
        if (!board || board.ownerId !== userId) {
            throw new NotFoundException('Acesso negado');
        }

        return this.prisma.column.update({
        where: { id },
        data: { title },
        });
    }

  async delete(id: string, userId: string) {
    const column = await this.prisma.column.findUnique({ where: { id } });
    if (!column) throw new NotFoundException('Coluna não encontrada');

    const board = await this.prisma.board.findUnique({ where: { id: column.boardId } });
    if (!board || board.ownerId !== userId) {
      throw new NotFoundException('Acesso negado');
    }

    return this.prisma.column.delete({ where: { id } });
  }
}
