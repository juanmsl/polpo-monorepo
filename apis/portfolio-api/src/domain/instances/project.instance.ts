import { ProjectEntity } from '../entities';

import { LinkInstance } from './link.instance';
import { TechnologyInstance } from './technology.instance';

export const ProjectInstance: Array<ProjectEntity> = [
  {
    name: 'Project 1',
    pictures: {
      items: [
        { url: 'https://picsum.photos/id/100/200/300', title: 'Picture 1' },
        { url: 'https://picsum.photos/id/101/200/300', title: 'Picture 2' },
        { url: 'https://picsum.photos/id/102/200/300', title: 'Picture 3' },
      ],
    },
    technologies: {
      items: TechnologyInstance,
    },
    links: {
      items: LinkInstance,
    },
    description: 'This is a description of the project 1',
  },
];
