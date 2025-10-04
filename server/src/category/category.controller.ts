import { Controller } from '@nestjs/common';
import { Body, Post, Param, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    @Post()
    async createCategory(@Body() body: { name: string, description?: string }) {
        return this.categoryService.createCategory(body);
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
