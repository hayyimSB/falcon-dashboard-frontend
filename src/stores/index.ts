import Settings from './Settings';

const stores = class Stores {
  settings: Settings;

  constructor() {
    this.settings = new Settings(this);
  }
};

export default new stores();
