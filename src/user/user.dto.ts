// import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
// import { Type } from 'class-transformer';

export class EducationDto {
  startDate: Date;

  @IsOptional()
  endDate: Date;

  @IsString()
  school: string;

  @IsString()
  major: string;

  @IsString()
  degree: string;

  gpa: number;

  @IsString()
  logo: string;
}

export class ExperienceDto {
  startDate: Date;

  @IsOptional()
  endDate: Date;

  @IsString()
  position: string;

  @IsString()
  company: string;

  @IsString()
  location: string;

  current: boolean;

  @IsString()
  description: string;

  @IsString()
  logo: string;
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

  @ApiProperty({ type: [EducationDto] })
  education: EducationDto[];

  @ApiProperty({ type: [ExperienceDto] })
  experience: ExperienceDto[];

  // @IsArray()
  // @ValidateNested({ each: true })
  // // @Type(() => EducationDto)
  // education: EducationDto[];

  // @IsArray()
  // @ValidateNested({ each: true })
  // // @Type(() => ExperienceDto)
  // experience: ExperienceDto[];

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
