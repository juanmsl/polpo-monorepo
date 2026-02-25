import { QueryResponse, QueryCollection } from './cms';
import { TechnologyEntity } from './technologies';

export const GetProfessionalSkillsQuery = `
query($locale: String) {
  professionalSkillsCollection(locale:$locale, order: [name_ASC]) {
    items {
      name
      color
      technologies: technologiesCollection {
        items {
          name
        }
      }
    }
  }
}
`;

export interface GetProfessionalSkillsVariables {
  locale: string;
}

export interface GetProfessionalSkillsBody {
  query: string;
  variables: GetProfessionalSkillsVariables;
}

export interface ProfessionalSkillsEntity {
  name: string;
  color: string;
  technologies: QueryCollection<Pick<TechnologyEntity, 'name'>>;
}

export type ProfessionalSkillsCollection = QueryCollection<ProfessionalSkillsEntity>;

export type ProfessionalSkillsQueryResponse = QueryResponse<{
  professionalSkillsCollection: ProfessionalSkillsCollection;
}>;
