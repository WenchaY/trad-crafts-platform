from flask import Flask, jsonify

app = Flask(__name__)

servers = [
    {"url": "http://localhost:3000", "description": "ローカル環境"},
    {"url": "http://sample.com", "description": "本番環境"}
]

@app.route('/servers', methods=['GET'])
def get_servers():
    return jsonify({"servers": servers})

if __name__ == '__main__':
    app.run(debug=True)

#测试终端运行   
# python API_server.py
#http://localhost:5000/servers