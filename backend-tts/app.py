from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from google.cloud import texttospeech
from google.oauth2 import service_account
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os, tempfile, json

load_dotenv()

GOOGLE_JSON = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

if not GOOGLE_JSON:
    raise RuntimeError("GOOGLE_KEY_JSON not set in Vercel environment")

try:
    google_creds = service_account.Credentials.from_service_account_info(
        json.loads(GOOGLE_JSON)
    )
except Exception as e:
    raise RuntimeError(f"Failed to parse Google credentials: {e}")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TTSRequest(BaseModel):
    text: str

@app.post("/tts")
async def tts_post_endpoint(request: TTSRequest):
    text = request.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    try:
        client = texttospeech.TextToSpeechClient(credentials=google_creds)

        synthesis_input = texttospeech.SynthesisInput(text=text)
        voice = texttospeech.VoiceSelectionParams(
            language_code="en-US",
            ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
        )
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3
        )

        response = client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config
        )

        if not response.audio_content:
            raise HTTPException(status_code=500, detail="No audio content returned from TTS")

        # Save MP3 temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
            tmp.write(response.audio_content)
            temp_path = tmp.name

        return FileResponse(
            temp_path,
            media_type="audio/mpeg",
            filename="chapter.mp3"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS generation error: {str(e)}")
