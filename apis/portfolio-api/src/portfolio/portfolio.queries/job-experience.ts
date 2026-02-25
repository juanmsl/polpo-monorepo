import { QueryResponse, QueryCollection } from './cms';
import { LinkCollection } from './links';
import { TechnologyEntity } from './technologies';

export const GetJobExperienceQuery = `
query($locale: String) {
  jobExperienceCollection(locale: $locale, order: [order_DESC]) {
    items {
      name
      dateStart
      dateEnd
      position
      content
      links: linksCollection {
        items {
          url
          label
          icon
        }
      }
      icon
      technologies: technologiesCollection {
        items {
          name
          icon
        }
      }
    }
  }
}
`;

export interface GetJobExperienceVariables {
  locale: string;
}

export interface GetJobExperienceBody {
  query: string;
  variables: GetJobExperienceVariables;
}

export interface JobExperienceEntity {
  name: string;
  dateStart: string;
  dateEnd: string | undefined | null;
  technologies: QueryCollection<TechnologyEntity>;
  content: string;
  position: string;
  icon: string;
  links: LinkCollection;
  order: number;
}

export type JobExperienceCollection = QueryCollection<JobExperienceEntity>;

export type JobExperienceQueryResponse = QueryResponse<{
  jobExperienceCollection: JobExperienceCollection;
}>;
