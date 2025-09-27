import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common/exceptions';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async createUser({username, password}: UserDto) {
            const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) throw new BadRequestException('Username already registered');

        const hashpassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data:{
                username,
               password: hashpassword
            }
        })
    }
    async validatePassword({username, password}: UserDto ){
        const user = await this.prisma.user.findUnique({
            where: {username}
        });
         if (!user) throw new UnauthorizedException('Invalid credentials');
        
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
            return{message: 'Login successful', userId: user.id};
    }
}
