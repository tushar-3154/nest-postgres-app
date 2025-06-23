import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/pagination/dto/paginations-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
// @UseGuards(AuthorizeGuard)
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  async getAllUsers(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.usersService.getAllUsers(paginationQueryDto);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.FindUserById(id);
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return await this.usersService.createUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteUser(id);
  }
}
