import { PortfolioPort } from '../../domain';

export class PortfolioController implements PortfolioPort {
  private adapter: PortfolioPort;

  constructor(adapter: PortfolioPort) {
    this.adapter = adapter;
  }

  getAssetById(assetId: string) {
    return this.adapter.getAssetById(assetId);
  }

  getJobExperience(locale: string) {
    return this.adapter.getJobExperience(locale);
  }

  getSocialContact(locale: string) {
    return this.adapter.getSocialContact(locale);
  }

  getProfessionalSkills(locale: string) {
    return this.adapter.getProfessionalSkills(locale);
  }

  getTechnologies(locale: string) {
    return this.adapter.getTechnologies(locale);
  }

  getCharacteristics(locale: string) {
    return this.adapter.getCharacteristics(locale);
  }

  getNavbarOptions(locale: string) {
    return this.adapter.getNavbarOptions(locale);
  }

  getProjects(locale: string) {
    return this.adapter.getProjects(locale);
  }
}
