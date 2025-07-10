import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard} from '../auth/jwt-auth.guard'
import { RequestWithUser } from 'src/common/types/request-with-user';
import { UserProfileDto } from './dto/user-profile.dto';


@Controller('users')
export class UsersController {
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Req() req: RequestWithUser): UserProfileDto {
        return req.user
    }
}
