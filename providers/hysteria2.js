const fs = require("fs");
const { execSync } = require("child_process");
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
  fs.writeFileSync(
    this.configPath,
    yaml.dump(config)
  );

  try {
    execSync(
      "systemctl restart hysteria-server || systemctl restart hysteria",
      { stdio: "ignore" }
    );
  } catch (err) {
    console.error(
      "Failed to restart hysteria-server:",
      err.message
    );
  }
}

createUser(username, password) {
  const config = this.loadConfig();

  if (!config.userpass) {
    config.userpass = {};
  }

  if (!config.userpass.users) {
    config.userpass.users = {};
  }

  config.userpass.users[username] = password;

  this.saveConfig(config);

  return {
    success: true,
    username
  };
}

deleteUser(username) {
  const config = this.loadConfig();

  if (
    config.userpass &&
    config.userpass.users &&
    config.userpass.users[username]
  ) {
    delete config.userpass.users[username];
  }

  this.saveConfig(config);

  return {
    success: true
  };
}

listUsers() {
  const config = this.loadConfig();

  if (
    !config.userpass ||
    !config.userpass.users
  ) {
    return [];
  }

  return Object.keys(config.userpass.users).map(
    username => ({
      username,
      password: config.userpass.users[username]
    })
  );
}

generateLink(username, password, domain) {
  return `hysteria2://${password}@${domain}:443/?insecure=1&sni=bing.com#${username}`;
}

}

module.exports = Hysteria2Provider;