const fs = require("fs");
const path = require("path");

const PROVIDERS_CONFIG =
  path.join(
    __dirname,
    "../../../configs/providers.json"
  );

function loadProviders() {
  try {
    if (!fs.existsSync(PROVIDERS_CONFIG)) {
      return {
        naive: false,
        hysteria2: false,
        telemt: false
      };
    }

    return JSON.parse(
      fs.readFileSync(PROVIDERS_CONFIG, "utf8")
    );
  } catch (err) {
    console.error(
      "Failed to load providers config:",
      err.message
    );

    return {
      naive: false,
      hysteria2: false,
      telemt: false
    };
  }
}

function saveProviders(config) {
  fs.writeFileSync(
    PROVIDERS_CONFIG,
    JSON.stringify(config, null, 2)
  );
}

module.exports = {
  loadProviders,
  saveProviders
};