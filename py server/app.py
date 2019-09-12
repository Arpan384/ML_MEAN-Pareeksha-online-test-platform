import sys

from flask import Flask, render_template, request, redirect, Response
from flask_cors import CORS, cross_origin
import random, json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

from sentimentAnalysis import test as sa
print("loaded Review Analysis")

@app.route('/review', methods = ['POST'])
@cross_origin
def getRev():
  data = request.get_json()
  sentiment = sa(data["review"])
  return json.dumps({"result":sentiment})


if __name__ == '__main__':
	app.run(debug=False)
