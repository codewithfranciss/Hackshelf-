import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }
    async createCategory({name, description}: CreateCategoryDto) {
        return this.prisma.category.create({
            data:{
                name,
               description
            }
        })
    }
    async getCategories() {
        return this.prisma.category.findMany();
    }    
  async getCategoryById(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { books: true },
    });
  }

  async deleteCategory(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }


}
