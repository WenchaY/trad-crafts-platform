import flask
#print(flask.__version__)

from flask import Flask, request, jsonify

app = Flask(__name__)

# 用户数据存储（这部分之后修改为连接数据库)
users = {}

# 注册用户
@app.route('/users', methods=['POST'])
def register_user():
    data = request.json
    if 'username' in data and 'password' in data:
        username = data['username']
        password = data['password']
        users[username] = password
        return jsonify({"message": "Created successfully"}), 201
    elif():
        return jsonify({"message": "400 Bad request"}), 400
    else:
        return jsonify({"message": "403 Forbidden"}), 403


if __name__ == '__main__':
    app.run(debug=True)

