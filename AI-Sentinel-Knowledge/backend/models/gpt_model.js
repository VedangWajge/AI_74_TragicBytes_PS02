const axios = require("axios");

class GPTModel {
  constructor() {
    // Base URL for Hugging Face GPT-2 API
    this.baseUrl = "https://api-inference.huggingface.co/models/gpt2-large";

    // Add your Hugging Face API key here
    this.apiKey = " "; // Replace this with your token
  }

  async generateResponse(prompt) {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          inputs: prompt,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`, // Pass the API token
            "Content-Type": "application/json",
          },
        }
      );

      // Check if the response is valid
      if (response.data && response.data.length > 0) {
        return response.data[0].generated_text || "No response generated.";
      } else {
        return "Error: No response generated from GPT-2.";
      }
    } catch (error) {
      console.error("Error generating GPT-2 response:", error.message);
      return "An error occurred while generating the response.";
    }
  }
}

module.exports = { GPTModel };
