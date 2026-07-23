from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import urllib.parse
import urllib.request
import json

app = FastAPI()

# Chrome拡張機能（別ドメイン）からの通信を許可する設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestData(BaseModel):
    text: str

@app.post("/convert")
def convert_text(data: RequestData):
    input_text = data.text
    if not input_text:
        return {"convertedText": ""}

    # APIを使ってひらがなを漢字に変換する
    encoded_text = urllib.parse.quote(input_text)
    url = f"https://www.google.com/transliterate?langpair=ja-Hira|ja&text={encoded_text}"
    
    try:
        with urllib.request.urlopen(url) as response:
            result_data = json.loads(response.read().decode('utf-8'))
            converted_text = "".join([entry[1][0] for entry in result_data if entry[1]])
            return {"convertedText": converted_text}
    except Exception as e:
        print("変換エラー:", e)
        return { "convertedText": input_text }