import { PortfolioPort } from './domain';
import { PortfolioAdapter, PortfolioController } from './infrastructure';

class PortfolioAPI extends PortfolioController {
  constructor() {
    const config = {
      apiURL: `${process.env.API_URL}`,
      accessToken: `${process.env.ACCESS_TOKEN}`,
    };
    const adapter = new PortfolioAdapter(config);
    super(adapter);
  }

  public use(adapter: PortfolioPort) {
    return new PortfolioController(adapter);
  }
}

export default new PortfolioAPI();

export * from './domain';
export * from './infrastructure';
