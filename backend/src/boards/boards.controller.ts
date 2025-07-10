import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, Req, } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/common/types/request-with-user';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
    constructor( private readonly boardsService: BoardsService ) {}

    @Post()
    create(@Req() req: AuthenticatedRequest, @Body() body: { title: string }) {
        return this.boardsService.create(body.title, req.user.userId);
    }

    @Get()
    findAll(@Req() req: AuthenticatedRequest) {
        return this.boardsService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
        return this.boardsService.findOne(id, req.user.userId);
    }

    @Patch(':id')
    update(@Req() req: AuthenticatedRequest, @Param('id') id: string, @Body() body: { title: string }) {
        return this.boardsService.update(id, body.title, req.user.userId);
    }

    @Delete(':id')
    remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
        return this.boardsService.delete(id, req.user.userId);
    }
}
