import os
import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Read the API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

def ask_gpt(prompt, model="gpt-4", temperature=0.7, max_tokens=1000):
    """
    Send a prompt to the OpenAI GPT API and return the response.
    """
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a symbolic AI assistant."},
                {"role": "user", "content": prompt}
            ],
            temperature=temperature,
            max_tokens=max_tokens
        )
        return response.choices[0].message["content"].strip()
    except Exception as e:
        return f"[Error] {str(e)}"
