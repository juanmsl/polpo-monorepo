import {
  AssetEntity,
  ProjectCollection,
  ProfessionalSkillsCollection,
  ContactsCollection,
  JobExperienceCollection,
  TechnologiesCollection,
  CharacteristicCollection,
  NavbarOptionCollection,
} from '../entities';

export interface PortfolioPort {
  getJobExperience(locale: string): Promise<JobExperienceCollection['items']>;
  getSocialContact(locale: string): Promise<ContactsCollection['items']>;
  getProfessionalSkills(locale: string): Promise<ProfessionalSkillsCollection['items']>;
  getProjects(locale: string): Promise<ProjectCollection['items']>;
  getAssetById(assetId: string): Promise<AssetEntity>;
  getTechnologies(locale: string): Promise<TechnologiesCollection['items']>;
  getCharacteristics(locale: string): Promise<CharacteristicCollection['items']>;
  getNavbarOptions(locale: string): Promise<NavbarOptionCollection['items']>;
}
