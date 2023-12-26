import {
  DataSource,
  DeleteResult,
  InsertResult,
  Repository,
  UpdateResult,
} from 'typeorm';
import { TaskEntity } from './tasks.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async getAll(): Promise<TaskEntity[]> {
    //TODO: Add pagination
    const tasks: TaskEntity[] = await this.find();
    //To stuff..
    return tasks;
  }

  async getOneById(taskId: string): Promise<TaskEntity> {
    const task = await this.findOne({
      where: {
        id: taskId,
      },
    });
    return task;
  }

  async search(s: object): Promise<TaskEntity[]> {
    const tasks: TaskEntity[] = await this.find({
      where: s,
    });
    return tasks;
  }

  async createOne(task: TaskEntity): Promise<InsertResult> {
    const result = await this.insert(task);
    return result;
  }

  async updateOne(task: TaskEntity): Promise<UpdateResult> {
    const result = await this.update(task.id, task);
    return result;
  }

  async updatePartialOne(task: TaskEntity): Promise<UpdateResult> {
    const result = await this.update(task.id, task);
    return result;
  }

  async deleteTask(taskId: string): Promise<DeleteResult> {
    const result = await this.delete(taskId);
    return result;
  }
}
