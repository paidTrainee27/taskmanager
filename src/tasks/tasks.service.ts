import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { getRandom } from 'src/utils/utils';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: getRandom(1, 100),
      status: TaskStatus.PENDING,
      title: title,
      description: description,
    };
    this.tasks.push(task);
    return task;
  }
}
