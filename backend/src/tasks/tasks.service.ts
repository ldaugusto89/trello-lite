import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) {}
     async create(title: string, description: string | null, columnId: string, userId: string) {
    const column = await this.prisma.column.findUnique({ where: { id: columnId } });
    if (!column) throw new NotFoundException('Coluna não encontrada');

    const board = await this.prisma.board.findUnique({ where: { id: column.boardId } });
    if (!board || board.ownerId !== userId) {
      throw new NotFoundException('Sem permissão');
    }

    return this.prisma.task.create({
      data: { title, description, columnId },
    });
  }

  async findByColumn(columnId: string, userId: string) {
    const column = await this.prisma.column.findUnique({ where: { id: columnId } });
    if (!column) throw new NotFoundException('Coluna não encontrada');

    const board = await this.prisma.board.findUnique({ where: { id: column.boardId } });
    if (!board || board.ownerId !== userId) {
      throw new NotFoundException('Sem permissão');
    }

    return this.prisma.task.findMany({
      where: { columnId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async update(id: string, data: { title?: string; description?: string }, userId: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Tarefa não encontrada');

    const column = await this.prisma.column.findUnique({ where: { id: task.columnId } });
    if (!column) throw new NotFoundException('Coluna não encontrada');
    const board = await this.prisma.board.findUnique({ where: { id: column.boardId } });

    if (!board || board.ownerId !== userId) {
      throw new NotFoundException('Sem permissão');
    }

    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Tarefa não encontrada');

    const column = await this.prisma.column.findUnique({ where: { id: task.columnId } });
    if (!column) throw new NotFoundException('Coluna não encontrada');
    const board = await this.prisma.board.findUnique({ where: { id: column.boardId } });

    if (!board || board.ownerId !== userId) {
      throw new NotFoundException('Sem permissão');
    }

    return this.prisma.task.delete({ where: { id } });
  }

  async move(id: string, newColumnId: string, userId: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException('Tarefa não encontrada');

    const newColumn = await this.prisma.column.findUnique({ where: { id: newColumnId } });
    if (!newColumn) throw new NotFoundException('Nova coluna não encontrada');

    const board = await this.prisma.board.findUnique({ where: { id: newColumn.boardId } });
    if (!board || board.ownerId !== userId) {
      throw new NotFoundException('Sem permissão');
    }

    return this.prisma.task.update({
      where: { id },
      data: { columnId: newColumnId },
    });
  }
}
