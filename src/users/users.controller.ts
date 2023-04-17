import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  
    @Get()
    async findAll(@Query('page') page = 1, @Query('limit') limit = 10, @Query() searchQuery): Promise<any> {
      return this.usersService.findAll(page, limit, searchQuery);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
      return this.usersService.findOne(id);
    }
  
    @Get('cities')
    async findAllCities(): Promise<any> {
      return this.usersService.findAllCities();
    }
  
    @Post()
    async create(@Body() customer: CreateUserDto): Promise<User> {
      return this.usersService.create(customer);
    }
  }
