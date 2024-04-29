// dtos/create-job.dto.ts
import { IsDateString, IsString, IsUrl } from 'class-validator';

export class CreateJobDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly company: string;

  @IsDateString()
  readonly datePosted: Date;

  @IsUrl()
  readonly link: string;

  @IsUrl()
  readonly image: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly salary: string;
}
