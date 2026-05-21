const axios = require("axios");

class TelemtProvider {
  constructor(config) {
    this.apiUrl = config.apiUrl || "http://127.0.0.1:8081";
    this.token = config.token || "";
  }

  async createUser(username, options = {}) {
    const response = await axios.post(
      `${this.apiUrl}/v1/users`,
      {
        username,
        max_tcp_conns: options.maxTcpConns || 3,
        data_quota_bytes: options.quota || 0,
        expiration_rfc3339: options.expiration || null
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );

    return response.data;
  }

  async deleteUser(username) {
    const response = await axios.delete(
      `${this.apiUrl}/v1/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );

    return response.data;
  }

  async listUsers() {
    const response = await axios.get(
      `${this.apiUrl}/v1/users`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    );

    return response.data;
  }
}

module.exports = TelemtProvider;