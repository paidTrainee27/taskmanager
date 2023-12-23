import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { getRandom } from 'src/utils/utils';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchTask } from './dto/search-task.dto';

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
    if (!task) {
      throw new NotFoundException(`Unable to find task with id ${taskId}`);
    }
    return task;
  }

  searchTask(s: SearchTask): Task[] {
    const { title, status } = s;

    if (title && status) {
      return this.tasks.filter((val) => {
        return val.title.toLowerCase().includes(title) && val.status == status;
      });
    }

    if (title) {
      return this.tasks.filter((val) => {
        return val.title.toLowerCase().includes(title);
      });
    }

    if (status) {
      return this.tasks.filter((val) => {
        return val.status == status;
      });
    }
    throw new BadRequestException();
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    if (!createTaskDto.isValid()) {
      throw new BadRequestException('Mandatory fields cant be empty!');
    }
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
        this.tasks[idx] = { ...val, ...task };
        return true;
      }
      return false;
    });
    return { ...oldTask, ...task };
  }

  deleteTask(taskId: number) {
    /* 
    this.tasks =  this.tasks.filter((task: Task) => return task.id != taskId)
    */
    const idx = this.tasks.findIndex((task: Task): boolean => {
      return task.id == taskId;
    });
    this.tasks.splice(idx, 1);
  }
}
