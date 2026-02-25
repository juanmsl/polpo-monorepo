import { QueryResponse, QueryCollection } from './cms';
import { LinkCollection } from './links';

export const GetProjectsQuery = `
query($locale: String) {
  projectCollection(locale:$locale) {
    items {
      name
      description
      links: linksCollection {
        items {
          url
          label
          icon
        }
      }
      pictures: picturesCollection {
        items {
          url
          title
        }
      }
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

export interface GetProjectsVariables {
  locale: string;
}

export interface GetProjectsBody {
  query: string;
  variables: GetProjectsVariables;
}

export interface ProjectEntity {
  name: string;
  pictures: AssetCollection;
  technologies: QueryCollection<TechnologyEntity>;
  links: LinkCollection;
  description: string;
}

export type ProjectCollection = QueryCollection<ProjectEntity>;

export type GetProjectsQueryResponse = QueryResponse<{
  projectCollection: ProjectCollection;
}>;
