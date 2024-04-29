import { IsDateString, IsOptional, IsString, IsMongoId } from 'class-validator';

export class CreateApplicationDto {
  @IsMongoId()
  readonly uid: string;

  @IsMongoId()
  readonly jid: string;

  @IsDateString()
  readonly appliedDate: Date;

  @IsString()
  readonly status: string;

  @IsOptional()
  @IsString()
  readonly notes?: string;

  @IsString()
  readonly resume: string;
}

export class UpdateApplicationDto {
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
  @IsString()
  readonly resume?: string;

  @IsOptional()
  @IsDateString()
  readonly updatedAt?: Date;
}
