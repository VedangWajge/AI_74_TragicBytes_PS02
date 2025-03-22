from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load GPT-2 model locally
generator = pipeline("text-generation", model="gpt2")

@app.route("/generate", methods=["POST"])
def generate_text():
    data = request.json
    prompt = data.get("question", "")
    if not prompt:
        return jsonify({"error": "Query cannot be empty"}), 400
    
    result = generator(prompt, max_length=50, num_return_sequences=1)
    response_text = result[0]["generated_text"]
    return jsonify({"response": response_text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8001)
