import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTask } from './dto/search-task.dto';
import { TaskEntity } from './repository/tasks.entity';
import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  //Get all tasks
  @Get()
  getAllTasks(): Promise<TaskEntity[]> {
    return this.tasksService.getAllTasks();
  }

  //Get one tasks
  @Get('/:id')
  getTask(@Param('id') id: string): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id);
  }

  //Add new task
  @Post()
  // addTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  addTask(@Body() createTaskDto: CreateTaskDto): Promise<InsertResult> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Post('/search')
  searchAllTasks(@Body() s: SearchTask): Promise<TaskEntity[]> {
    return this.tasksService.searchTask(s);
  }

  // Update/Replace task
  @Put()
  UpdateTask(@Body() task: TaskEntity): Promise<UpdateResult> {
    return this.tasksService.replaceTask(task);
  }

  //Update task details
  @Patch()
  UpdateToTask(@Body() task: TaskEntity): Promise<UpdateResult> {
    return this.tasksService.updateTask(task);
  }

  //Delete task
  @Delete('/:id')
  RemoveTask(@Param('id') id: string): Promise<DeleteResult> {
    return this.tasksService.deleteTask(id);
  }
}
