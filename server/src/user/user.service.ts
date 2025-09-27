import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }
    async createUser(password: string) {
        const hashpassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data:{
               password: hashpassword
            }
        })
    }
    async validatePassword(password: UserDto ){
        const user = await this.prisma.user.findFirst({where:{id: password.id}});
    }
}
