// import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  // @IsNotEmpty()
  title: string;

  // @IsNotEmpty()
  description: string;

  isValid(): boolean {
    return this.title.trim() != '' && this.description.trim() != '';
  }
}
