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
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

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
  getTask(@Param('id') id: string): Task {
    const taskId = +id;
    return this.tasksService.getTaskById(taskId);
  }

  //Add new task
  @Post()
  // addTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  addTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
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
  RemoveTask(@Param('id') id: string) {
    const taskId = +id;
    return this.tasksService.deleteTask(taskId);
  }
}
