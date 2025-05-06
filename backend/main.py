from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
import base64


# Set your OpenAI key here or via environment
openai.api_key = os.getenv("OPENAI_API_KEY") or "sk-..."  # replace with your real key

app = FastAPI()

# CORS (optional, for frontend testing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/test-image")
async def test_image_upload(file: UploadFile = File(...)):
    contents = await file.read()

    encoded = base64.b64encode(contents).decode("utf-8")
    data_url = f"data:{file.content_type};base64,{encoded}"

    # Send image as base64-encoded input to GPT-4o
    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": [
                {
                    "type": "text",
                    "text": "What can you tell me about this image?"
                },
                {"type": "image_url", "image_url": {"url": data_url}},

            ]}
        ],
        max_tokens=500
    )

    return {"result": response.choices[0].message["content"]}
