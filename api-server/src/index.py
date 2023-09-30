import os
from flask import Flask


# .envファイルを読込み
from dotenv import load_dotenv
load_dotenv()

# Flask APP作成
app = Flask(__name__)


# Server Test
@app.route('/', methods=["GET"])
def hello():
    return "Hello Flask"


if __name__ == '__main__':
    # 環境変数を導入
    APP_HOST = os.getenv("APP_HOST", "localhost")
    APP_PORT = os.getenv("APP_PORT", "3000")

    # Flask APP 起動
    app.run(host=APP_HOST, port=APP_PORT, debug=True)
