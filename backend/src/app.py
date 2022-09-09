from flask import Flask 
app = Flask(__name__)


@app.route("/")
def home():
    return "I fucking love flask"

@app.route("/test")
def test_directory():
    return "Hosehbo"


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
