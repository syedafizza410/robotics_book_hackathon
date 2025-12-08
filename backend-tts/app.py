from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from google.cloud import texttospeech
from dotenv import load_dotenv
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os, tempfile
from pathlib import Path

load_dotenv()
GOOGLE_CREDS = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

if not GOOGLE_CREDS:
    raise RuntimeError("GOOGLE_APPLICATION_CREDENTIALS not set in .env")

GOOGLE_CREDS_PATH = Path(GOOGLE_CREDS).resolve()

if not GOOGLE_CREDS_PATH.exists():
    raise RuntimeError(f"Google TTS credentials not found! Check path: {GOOGLE_CREDS_PATH}")

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(GOOGLE_CREDS_PATH)
print("Using Google TTS credentials:", GOOGLE_CREDS_PATH)

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
        try:
            client = texttospeech.TextToSpeechClient()
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to initialize Google TTS client: {e}")

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

        tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
        tmp_file.write(response.audio_content)
        tmp_file.close()

        return FileResponse(
            tmp_file.name,
            media_type="audio/mpeg",
            filename="chapter.mp3"
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TTS generation error: {str(e)}")
