import os
from flask import Flask, request, jsonify, wrappers

from models.http_codes import Response
from api_methods.user_register import register_user
from api_methods.user_changepwd import changepwd_user
from api_methods.user_get_by_account import get_user_by_account
from api_methods.user_get_by_uid import get_user_by_uid
from api_methods.user_login import login_user
from api_methods.craft_register import register_craft
from api_methods.craft_get_by_cid import get_craft_by_cid
# .envファイルを読込み
from dotenv import load_dotenv
load_dotenv()

# Flask APP作成
app = Flask(__name__)


# [Users-001] ユーザー登録
@app.route('/api/users', methods=["POST"])
def route_users_post():
    body: dict = request.get_json(force=True)
    res: Response = register_user(body)
    return jsonify(res.body), res.code

# [Users-002] ユーザーパスワード変更
@app.route('/api/users', methods=["PUT"])
def route_users_put():
    body: dict = request.get_json(force=True)
    res: Response = changepwd_user(body)
    return jsonify(res.body), res.code

# [Users-003] ユーザーログイン
@app.route('/api/users/login', methods=["POST"])
def route_users_login_post():
    body: dict = request.get_json(force=True)
    res = login_user(body)
    if isinstance(res, wrappers.Response):
        return res
    else:
        return jsonify(res.body), res.code

# [Users-004] アカウントでユーザー情報取得
@app.route('/api/users/', methods=["GET"])
def route_users_get():
    account = request.args.get('account')
    res: Response = get_user_by_account(account)
    return jsonify(res.body), res.code

# [Users-005] UIDでユーザー情報取得
@app.route('/api/users/<int:uid>', methods=["GET"])
def route_users_uid_get(uid):
    res: Response = get_user_by_uid(uid)
    return jsonify(res.body), res.code

# [Crafts-001] 工芸品登録
@app.route('/api/crafts', methods=["POST"])
def route_crafts_post():
    body: dict = request.get_json(force=True)
    res: Response = register_craft(body)
    return jsonify(res.body), res.code

# [Crafts-002] 工芸品詳細取得
@app.route('/api/crafts/<int:cid>', methods=["GET"])
def route_crafts_cid_get(cid):
    res: Response = get_craft_by_cid(cid)
    return jsonify(res.body), res.code


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
