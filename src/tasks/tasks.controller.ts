import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTask } from './dto/search-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  //Get all tasks
  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  //Get one tasks
  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number): Task {
    return this.tasksService.getTaskById(id);
  }

  //Add new task
  @Post()
  // addTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  addTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Post('/search')
  searchAllTasks(@Body() s: SearchTask): Task[] {
    return this.tasksService.searchTask(s);
  }

  // Update/Replace task
  @Put()
  UpdateTask(@Body() task: Task): Task {
    return this.tasksService.replaceTask(task);
  }

  //Update task details
  @Patch()
  UpdateToTask(@Body() task: Task): Task {
    return this.tasksService.updateTask(task);
  }

  //Delete task
  @Delete('/:id')
  RemoveTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
