import { Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards, } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/common/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@Req() req: AuthenticatedRequest, @Body() body: { title: string; description?: string; columnId: string }) {
        return this.tasksService.create(
        body.title,
        body.description ?? null,
        body.columnId,
        req.user.userId,
        );
    }

    @Get('column/:columnId')
    findByColumn(@Req() req: AuthenticatedRequest, @Param('columnId') columnId: string) {
        return this.tasksService.findByColumn(columnId, req.user.userId);
    }

    @Patch(':id')
    update(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: { title?: string; description?: string }) {
        return this.tasksService.update(id, body, req.user.userId);
    }

    @Patch(':id/move')
    move(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: { columnId: string }) {
        return this.tasksService.move(id, body.columnId, req.user.userId);
    }

    @Delete(':id')
    delete(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
        return this.tasksService.delete(id, req.user.userId);
    }
}
