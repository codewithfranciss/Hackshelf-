import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/create-user.dto';
@Controller('auth')
export class UserController {
    constructor(private userService: UserService) { }
    @Post('signup')
    async signUp(@Body() userDto: UserDto) {
        return this.userService.createUser(userDto);
        
    }
    @Post('signin')
    async signIn(@Body() userDto: UserDto) {
        return this.userService.validatePassword(userDto);
    }
}
