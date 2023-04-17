import { Injectable,Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'

@Injectable()

export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
    async findAll(page: number, limit: number, searchQuery?: any): Promise<any> {
      const skip = (page - 1) * limit;
      const take = limit;
  
      const [customers, count] = await this.userRepository.findAndCount({
        where: {
          ...searchQuery,
        },
        skip,
        take,
      });
  
      return {
        data: customers,
        totalCount: count,
        page,
        pageCount: Math.ceil(count / limit),
      };
    }
  
    async findOne(id: number): Promise<User> {
      return this.userRepository.findOneByOrFail({id:id});
    }
  
    async findAllCities(): Promise<any> {
      return this.userRepository
        .createQueryBuilder('user')
        .select('user.city')
        .addSelect('COUNT(user.id)', 'count')
        .groupBy('user.city')
        .getRawMany();
    }
  
    async create(@Body() customer: CreateUserDto): Promise<User> {
      return this.userRepository.save(customer);
    }
  }
  