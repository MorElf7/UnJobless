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
  @IsOptional()
  coverLetterUrl: string;

  @IsString()
  @IsOptional()
  coverLetterFileName: string;

  @ApiProperty({ type: [EducationDto] })
  education: EducationDto[];

  @ApiProperty({ type: [ExperienceDto] })
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

export interface UpdateUserDto {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  password?: string;
  linkedin?: string;
  website?: string;
  github?: string;
  street_address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  coverLetterUrl?: string;
  coverLetterFileName?: string;
  education?: EducationDto[];
  experience?: ExperienceDto[];
  sponsorship?: string;
  legally_authorized?: string;
  gender?: string;
  race?: string;
  veteran?: string;
  disability?: string;
}

// Define Education and Experience types similarly, ensuring all their properties are also optional.

// export class UpdateUserDto {
//   @IsString()
//   @IsOptional()
//   email: string;

//   @IsString()
//   @IsOptional()
//   password: string;

//   @IsString()
//   @IsOptional()
//   first_name: string;

//   @IsString()
//   @IsOptional()
//   last_name: string;

//   @IsString()
//   @IsOptional()
//   phone: string;

//   @IsOptional()
//   @IsString()
//   linkedin: string;

//   @IsOptional()
//   @IsString()
//   website: string;

//   @IsOptional()
//   @IsString()
//   github: string;

//   @IsOptional()
//   @IsString()
//   street_address: string;

//   @IsOptional()
//   @IsString()
//   city: string;

//   @IsOptional()
//   @IsString()
//   state: string;

//   @IsOptional()
//   @IsString()
//   zip_code: string;

//   @IsOptional()
//   @IsString()
//   resumeUrl: string;

//   @IsOptional()
//   @IsString()
//   resumeFileName: string;

//   @IsString()
//   @IsOptional()
//   coverLetterUrl: string;

//   @IsString()
//   @IsOptional()
//   coverLetterFileName: string;

//   @IsOptional()
//   @ApiProperty({ type: [EducationDto] })
//   education: EducationDto[];

//   @IsOptional()
//   @ApiProperty({ type: [ExperienceDto] })
//   experience: ExperienceDto[];

//   @IsOptional()
//   @IsString()
//   sponsorship: string;

//   @IsOptional()
//   @IsString()
//   legally_authorized: string;

//   @IsOptional()
//   @IsString()
//   gender: string;

//   @IsOptional()
//   @IsString()
//   race: string;

//   @IsOptional()
//   @IsString()
//   veteran: string;

//   @IsOptional()
//   @IsString()
//   disability: string;
// }
