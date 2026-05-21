const fs = require("fs");
const yaml = require("js-yaml");

class Hysteria2Provider {
  constructor(config = {}) {
    this.configPath = config.configPath || "/etc/hysteria/config.yaml";
  }

  loadConfig() {
    const raw = fs.readFileSync(this.configPath, "utf8");
    return yaml.load(raw);
  }

  saveConfig(config) {
    fs.writeFileSync(this.configPath, yaml.dump(config));
  }

  createUser(username, password) {
    const config = this.loadConfig();

    if (!config.users) {
      config.users = [];
    }

    config.users.push({
      name: username,
      password: password
    });

    this.saveConfig(config);

    return {
      success: true,
      username
    };
  }

  deleteUser(username) {
    const config = this.loadConfig();

    config.users = (config.users || []).filter(
      user => user.name !== username
    );

    this.saveConfig(config);

    return {
      success: true
    };
  }

  listUsers() {
    const config = this.loadConfig();

    return config.users || [];
  }
}

module.exports = Hysteria2Provider;