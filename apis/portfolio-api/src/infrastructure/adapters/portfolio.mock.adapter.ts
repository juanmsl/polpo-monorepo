import {
  AssetEntity,
  AssetInstance,
  CharacteristicEntity,
  CharacteristicInstance,
  ContactEntity,
  ContactInstance,
  PortfolioPort,
  JobExperienceEntity,
  JobExperienceInstance,
  NavbarOptionEntity,
  NavbarOptionInstance,
  ProfessionalSkillInstance,
  ProfessionalSkillsEntity,
  ProjectEntity,
  ProjectInstance,
  TechnologyEntity,
  TechnologyInstance,
} from '../../domain';

export class PortfolioMockAdapter implements PortfolioPort {
  static timeout = 3000;
  getAssetById() {
    return new Promise<AssetEntity>(resolve => {
      setTimeout(() => resolve(AssetInstance), PortfolioMockAdapter.timeout);
    });
  }

  getJobExperience() {
    return new Promise<Array<JobExperienceEntity>>(resolve => {
      setTimeout(() => resolve(JobExperienceInstance), PortfolioMockAdapter.timeout);
    });
  }

  getSocialContact() {
    return new Promise<Array<ContactEntity>>(resolve => {
      setTimeout(() => resolve(ContactInstance), PortfolioMockAdapter.timeout);
    });
  }

  getProfessionalSkills() {
    return new Promise<Array<ProfessionalSkillsEntity>>(resolve => {
      setTimeout(() => resolve(ProfessionalSkillInstance), PortfolioMockAdapter.timeout);
    });
  }

  getTechnologies() {
    return new Promise<Array<TechnologyEntity>>(resolve => {
      setTimeout(() => resolve(TechnologyInstance), PortfolioMockAdapter.timeout);
    });
  }

  getCharacteristics() {
    return new Promise<Array<CharacteristicEntity>>(resolve => {
      setTimeout(() => resolve(CharacteristicInstance), PortfolioMockAdapter.timeout);
    });
  }

  getNavbarOptions() {
    return new Promise<Array<NavbarOptionEntity>>(resolve => {
      setTimeout(() => resolve(NavbarOptionInstance), PortfolioMockAdapter.timeout);
    });
  }

  getProjects() {
    return new Promise<Array<ProjectEntity>>(resolve => {
      setTimeout(() => resolve(ProjectInstance), PortfolioMockAdapter.timeout);
    });
  }
}
