//write code
export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  contact: string;
  resume: string;
  links: string;
  Experience: [
    {
      title: string;
      description: string;
      startDate: Date;
      endDate: Date;
      location: string;
    },
  ];
  Education: [
    {
      title: string;
      description: string;
      startDate: Date;
      endDate: Date;
      location: string;
    },
  ];
  skills: string[];
  arrays_aid: string[];
  equalOpportunity: boolean;
  createdAt: Date;
  updatedAt: Date;
}
