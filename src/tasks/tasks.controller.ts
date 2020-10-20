import { Body, Controller, Delete, Get, Param, Query, Patch, Post, Req, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

function classDecorator(target: any) {
  console.log(target);
}

function methodDecorator(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Method decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function propertyDecorator(target: any, propertyName: string) {
  console.log('property decorator');
  console.log(target);
  console.log(propertyName);
}

@classDecorator
class Blog {

  @propertyDecorator
  author: string;
  blogs: any[] = [];
  constructor(author: string) {
    this.author = author;
    this.blogs = ['blog1', 'blog2', 'blog3'];
  }

  @methodDecorator
  getBlogNum() {
    return this.blogs.length;
  }
}

const testBlog = new Blog('nick');
console.log(testBlog.getBlogNum());

@Controller('tasks') // bound routed
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }



  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTasksStatus(id, status);
  }
}