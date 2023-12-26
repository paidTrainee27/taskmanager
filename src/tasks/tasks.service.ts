import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTask } from './dto/search-task.dto';
import { TasksRepository } from './repository/tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './repository/tasks.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository,
  ) {}
  private tasks: Task[] = [];

  //Get all tasks
  getAllTasks(): Promise<TaskEntity[]> {
    return this.tasksRepository.getAll();
  }

  //Get a tasks by unique identity
  getTaskById(taskId: string): Promise<TaskEntity> {
    const task = this.tasksRepository.getOneById(taskId);

    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  searchTask(s: SearchTask): Promise<TaskEntity[]> {
    const { title, status } = s;

    if (title && status) {
      return this.tasksRepository.search({
        title: title,
        status: status,
      });
    }

    if (title) {
      return this.tasksRepository.search({
        title: title,
      });
    }

    if (status) {
      return this.tasksRepository.search({
        status: status,
      });
    }
    throw new BadRequestException();
  }

  createTask(createTaskDto: CreateTaskDto): Promise<InsertResult> {
    if (!createTaskDto.isValid()) {
      throw new BadRequestException('Mandatory fields cant be empty!');
    }

    const task: TaskEntity = this.tasksRepository.create({
      status: TaskStatus.PENDING,
      title: createTaskDto.title,
      description: createTaskDto.description,
    });

    return this.tasksRepository.createOne(task);
  }

  //PUT
  replaceTask(task: TaskEntity): Promise<UpdateResult> {
    return this.tasksRepository.updateOne(task);
  }

  //PATCH
  updateTask(task: TaskEntity): Promise<UpdateResult> {
    const t = this.tasksRepository.create({ ...task });
    return this.tasksRepository.update(task.id, t);
  }

  deleteTask(taskId: string): Promise<DeleteResult> {
    return this.tasksRepository.delete(taskId);
  }
}
