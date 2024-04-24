// dtos/create-application.dto.ts
import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  readonly uid: string;

  @IsString()
  readonly aid: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly company: string;

  @IsDateString()
  readonly appliedDate: Date;

  @IsString()
  readonly status: string;

  @IsOptional()
  @IsString()
  readonly notes?: string;

  @IsOptional()
  @IsUrl()
  readonly image?: string;

  @IsDateString()
  readonly createdAt: Date;

  @IsDateString()
  readonly updatedAt: Date;
}

export class UpdateApplicationDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly company?: string;

  @IsOptional()
  @IsDateString()
  readonly appliedDate?: Date;

  @IsOptional()
  @IsString()
  readonly status?: string;

  @IsOptional()
  @IsString()
  readonly notes?: string;

  @IsOptional()
  @IsUrl()
  readonly image?: string;

  @IsOptional()
  @IsDateString()
  readonly updatedAt?: Date;
}
