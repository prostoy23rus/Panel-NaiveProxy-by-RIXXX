const TelemtProvider = require("./telemt");
const Hysteria2Provider = require("./hysteria2");

class ProvidersManager {
  constructor(config = {}) {
    this.providers = {
      telemt: new TelemtProvider(config.telemt || {}),
      hysteria2: new Hysteria2Provider(config.hysteria2 || {})
    };
  }

  async createUser(username, password, options = {}) {
    const results = {};

    if (options.telemt !== false) {
      results.telemt =
        await this.providers.telemt.createUser(
          username,
          options
        );
    }

    if (options.hysteria2 !== false) {
      results.hysteria2 =
        this.providers.hysteria2.createUser(
          username,
          password
        );
    }

    return results;
  }

  async deleteUser(username) {
    const results = {};

    results.telemt =
      await this.providers.telemt.deleteUser(username);

    results.hysteria2 =
      this.providers.hysteria2.deleteUser(username);

    return results;
  }

  async listUsers() {
    return {
      telemt:
        await this.providers.telemt.listUsers(),

      hysteria2:
        this.providers.hysteria2.listUsers()
    };
  }
}

module.exports = ProvidersManager;