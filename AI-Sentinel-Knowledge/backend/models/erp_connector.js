const axios = require("axios");

class ERPConnector {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async fetchData(endpoint, params = {}) {
    const url = `${this.baseUrl}/${endpoint}`;
    try {
      const response = await axios.get(url, { params });
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Unable to fetch data from ERP:", error.message);
    }
    return { error: "Unable to fetch data from ERP." };
  }
}

module.exports = { ERPConnector };
