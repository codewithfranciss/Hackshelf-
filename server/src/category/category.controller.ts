import { Controller } from '@nestjs/common';
import { Body, Post, Param, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { BadRequestException } from '@nestjs/common/exceptions';
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Post()
    async createCategory(@Body() body: { name: string, description?: string }) {
          try {
    const category = await this.categoryService.createCategory(body);
    return category; 
  } catch (error) {
    throw new BadRequestException(error.message || "Failed to create category");
  }
    }

    @Get()
    async getCategories() {
        return this.categoryService.getCategories();
    }

    @Get(':id')
    async getCategoryById(@Param('id') id: string) {
        return this.categoryService.getCategoryById(Number(id));
    }
}
