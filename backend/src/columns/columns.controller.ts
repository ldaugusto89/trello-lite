import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/common/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(@Req() req: AuthenticatedRequest, @Body() body: { title: string; boardId: string }) {
    return this.columnsService.create(body.title, body.boardId, req.user.userId);
  }

  @Get('board/:boardId')
  findByBoard(@Req() req: AuthenticatedRequest, @Param('boardId') boardId: string) {
    return this.columnsService.findByBoard(boardId, req.user.userId);
  }

  @Patch(':id')
  update(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: { title: string }) {
    return this.columnsService.update(id, body.title, req.user.userId);
  }

  @Delete(':id')
  delete(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.columnsService.delete(id, req.user.userId);
  }
}
