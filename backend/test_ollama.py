import requests

def test_ollama():
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "llama3:latest",
        "prompt": "Hello! Are you ready to help with fitness coaching?",
        "stream": False
    }
    
    try:
        response = requests.post(url, json=payload)
        response.raise_for_status()
        print("Response from Ollama:")
        print(response.json()['response'])
    except Exception as e:
        print(f"Error connecting to Ollama: {e}")

if __name__ == "__main__":
    test_ollama()
