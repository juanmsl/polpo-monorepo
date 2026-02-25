import { HttpClient } from '@polpo/http-client';

import {
  AssetQueryResponse,
  ContactQueryResponse,
  GetAssetByIDBody,
  GetAssetByIDQuery,
  GetAssetByIDVariables,
  GetCharacteristicsBody,
  GetCharacteristicsQuery,
  GetCharacteristicsQueryResponse,
  GetCharacteristicsVariables,
  GetContactBody,
  GetContactQuery,
  GetContactVariables,
  GetJobExperienceBody,
  GetJobExperienceQuery,
  GetJobExperienceVariables,
  GetNavbarOptionsBody,
  GetNavbarOptionsQuery,
  GetNavbarOptionsQueryResponse,
  GetNavbarOptionsVariables,
  GetProfessionalSkillsBody,
  GetProfessionalSkillsQuery,
  GetProfessionalSkillsVariables,
  GetProjectsBody,
  GetProjectsQuery,
  GetProjectsQueryResponse,
  GetProjectsVariables,
  GetTechnologiesBody,
  GetTechnologiesQuery,
  GetTechnologiesVariables,
  JobExperienceQueryResponse,
  ProfessionalSkillsQueryResponse,
  TechnologiesQueryResponse,
} from './portfolio.queries';

export class PortfolioAPI extends HttpClient {
  constructor() {
    super({
      apiName: 'PortfolioAPI',
      baseURL: `${process.env.PORTFOLIO_API}`,
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${process.env.PORTFOLIO_API_ACCESS_TOKEN}`,
        accept: 'application/json',
        'content-type': 'application/json',
      },
    });
  }

  async getAssetById(variables: GetAssetByIDVariables) {
    const response = await this.call<AssetQueryResponse, GetAssetByIDBody>({
      path: '/',
      method: 'GET',
      data: {
        query: GetAssetByIDQuery,
        variables,
      },
    });

    return {
      ...response,
      data: response.error === null ? response.data.data : null,
    };
  }

  async getJobExperience(variables: GetJobExperienceVariables) {
    const response = await this.call<JobExperienceQueryResponse, GetJobExperienceBody>({
      path: '/',
      method: 'GET',
      data: {
        query: GetJobExperienceQuery,
        variables,
      },
    });

    return {
      ...response,
      data: response.error === null ? response.data.data.jobExperienceCollection.items : null,
    };
  }

  async getContact(variables: GetContactVariables) {
    const response = await this.call<ContactQueryResponse, GetContactBody>({
      path: '/',
      method: 'GET',
      data: {
        query: GetContactQuery,
        variables,
      },
    });

    return {
      ...response,
      data: response.error === null ? response.data.data.contactCollection.items : null,
    };
  }

  async getProfessionalSkills(variables: GetProfessionalSkillsVariables) {
    const response = await this.call<ProfessionalSkillsQueryResponse, GetProfessionalSkillsBody>({
      path: '/',
      method: 'GET',
      data: {
        query: GetProfessionalSkillsQuery,
        variables,
      },
    });

    return {
      ...response,
      data: response.error === null ? response.data.data.professionalSkillsCollection.items : null,
    };
  }

  async getTechnologies(variables: GetTechnologiesVariables) {
    const response = await this.call<TechnologiesQueryResponse, GetTechnologiesBody>({
      path: '/',
      method: 'GET',
      data: {
        query: GetTechnologiesQuery,
        variables,
      },
    });

    return {
      ...response,
      data: response.error === null ? response.data.data.technologyCollection.items : null,
    };
  }

  async getCharacteristics(variables: GetCharacteristicsVariables) {
    const response = await this.call<GetCharacteristicsQueryResponse, GetCharacteristicsBody>({
      path: '/',
      method: 'GET',
      data: {
        query: GetCharacteristicsQuery,
        variables,
      },
    });

    return {
      ...response,
      data: response.error === null ? response.data.data.characteristicCollection.items : null,
    };
  }

  async getNavbarOptions(variables: GetNavbarOptionsVariables) {
    const response = await this.call<GetNavbarOptionsQueryResponse, GetNavbarOptionsBody>({
      path: '/',
      method: 'GET',
      data: {
        query: GetNavbarOptionsQuery,
        variables,
      },
    });

    return {
      ...response,
      data: response.error === null ? response.data.data.navbarOptionCollection.items : null,
    };
  }

  async getProjects(variables: GetProjectsVariables) {
    const response = await this.call<GetProjectsQueryResponse, GetProjectsBody>({
      path: '/',
      method: 'GET',
      data: {
        query: GetProjectsQuery,
        variables,
      },
    });

    return {
      ...response,
      data: response.error === null ? response.data.data.projectCollection.items : null,
    };
  }
}
