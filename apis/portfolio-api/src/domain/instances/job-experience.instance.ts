import { JobExperienceEntity } from '../entities';

import { LinkInstance } from './link.instance';
import { TechnologyInstance } from './technology.instance';

export const JobExperienceInstance: Array<JobExperienceEntity> = [
  {
    name: 'My Company',
    dateStart: '1018/01/01',
    dateEnd: '',
    position: 'Developer',
    content: 'Hello world',
    links: { items: LinkInstance },
    icon: 'https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png',
    order: 0,
    technologies: {
      items: TechnologyInstance,
    },
  },
];
