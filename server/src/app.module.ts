import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
   UserModule,
   PrismaModule],
  controllers: [AppController, CategoryController],
  providers: [AppService, CategoryService],
})
export class AppModule {}
