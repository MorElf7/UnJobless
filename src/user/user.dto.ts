// import { Type } from '@nestjs/common';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsDate,
  IsNumber,
} from 'class-validator';
// import { Type } from 'class-transformer';

class AchievementDto {
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}

class EducationDto extends AchievementDto {
  @IsString()
  school: string;

  @IsString()
  major: string;

  @IsString()
  degree: string;

  @IsNumber()
  gpa: number;
}

class ExperienceDto extends AchievementDto {
  @IsString()
  position: string;

  @IsString()
  company: string;

  @IsString()
  location: string;

  @IsBoolean()
  current: boolean;

  @IsString()
  description: string;
}

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  linkedin: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsOptional()
  @IsString()
  github: string;

  @IsString()
  street_address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zip_code: string;

  @IsString()
  resumeUrl: string;

  @IsString()
  resumeFileName: string;

  @IsString()
  coverLetterUrl: string;

  @IsString()
  coverLetterFileName: string;

  @IsArray()
  @ValidateNested({ each: true })
  // @Type(() => EducationDto)
  education: EducationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  // @Type(() => ExperienceDto)
  experience: ExperienceDto[];

  @IsString()
  sponsorship: string;

  @IsString()
  legally_authorized: string;

  @IsString()
  gender: string;

  @IsString()
  race: string;

  @IsString()
  veteran: string;

  @IsString()
  disability: string;
}
