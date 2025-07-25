import { MoviesPort } from './domain';
import { MoviesAdapter, MoviesController } from './infrastructure';

class MoviesAPI extends MoviesController {
  constructor() {
    const config = {
      apiURL: `${process.env.API_URL}`,
      accessToken: `${process.env.ACCESS_TOKEN}`,
    };
    const adapter = new MoviesAdapter(config);
    super(adapter);
  }

  public use(adapter: MoviesPort) {
    return new MoviesController(adapter);
  }
}

export default new MoviesAPI();

export * from './domain';
export * from './infrastructure';
