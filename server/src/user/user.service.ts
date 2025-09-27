import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async createUser({username, password}: UserDto) {
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
        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(isPasswordValid){
                return user;
            }
            return null;
        }
        return null;
    }
}
