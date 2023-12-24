import { IsOptional } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class SearchTask {
  @IsOptional()
  title: string;
  @IsOptional()
  status: TaskStatus;
}
