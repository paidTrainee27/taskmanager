import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { getRandom } from 'src/utils/utils';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(taskId: number): Task {
    const task = this.tasks.find((task: Task): boolean => {
      return task.id == taskId;
    });
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: getRandom(1, 100),
      status: TaskStatus.PENDING,
      title: title,
      description: description,
    };
    this.tasks.push(task);
    return task;
  }

  replaceTask(task: Task): Task {
    const { id } = task;
    const idx = this.tasks.findIndex((task: Task): boolean => {
      return task.id == id;
    });
    this.tasks[idx] = task;
    return this.tasks[idx];
  }

  updateTask(task: Task): Task {
    const { id } = task;
    const oldTask = this.tasks.find((val: Task, idx: number): boolean => {
      if (val.id == id) {
        console.log(idx);
        this.tasks[idx] = { ...val, ...task };
        return true;
      }
      return false;
    });
    return { ...oldTask, ...task };
  }

  deleteTask(taskId: number) {
    const idx = this.tasks.findIndex((task: Task): boolean => {
      return task.id == taskId;
    });
    this.tasks.splice(idx, 1);
  }
}
