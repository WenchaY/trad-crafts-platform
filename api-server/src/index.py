from flask import Flask

app = Flask(__name__)


@app.route('/hello')
def hello_world():
    return 'Hello Flask'


if __name__ == '__main__':
    app.run(host="host.docker.internal", port=8080, debug=True)
