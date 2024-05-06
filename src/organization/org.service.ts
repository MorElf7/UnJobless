import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OrganizationService {
  constructor(private httpService: HttpService) {}

  async getSchools(name: string): Promise<any> {
    try {
      const unis = await axios.get(
        `http://universities.hipolabs.com/search?name=${name}`,
      );
      const response = unis.data.map((uni) => ({
        name: uni.name,
        logo: `https://logo.clearbit.com/${uni.domains[0]}`,
      }));
      return response;
    } catch (error) {
      console.log(error);
      return { message: 'Failed to fetch schools' };
    }
  }

  async getCompanies(name: string): Promise<any> {
    try {
      console.log(name);
      const response = await axios.get(
        `https://autocomplete.clearbit.com/v1/companies/suggest?query=:${name}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return { message: 'Failed to fetch companies' };
    }
  }
}
