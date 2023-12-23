import { IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class SearchTask {
  @IsOptional()
  title: string;
  @IsOptional()
  status: TaskStatus;
}
