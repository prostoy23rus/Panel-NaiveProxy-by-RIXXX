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

    if (options.domain) {
      results.links = {
        hysteria2:
          this.providers.hysteria2.generateLink(
            username,
            password,
            options.domain
          )
      };
    }

    return results;
  }

  async deleteUser(
  username,
  enabledProviders = {}
) {
    const results = {};

    if (enabledProviders.telemt) {
  results.telemt =
    await this.providers.telemt.deleteUser(
      username
    );
}

if (enabledProviders.hysteria2) {
  results.hysteria2 =
    this.providers.hysteria2.deleteUser(
      username
    );
}

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