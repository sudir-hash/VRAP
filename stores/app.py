
from flask import Flask,render_template
import random
import json

app  = Flask(__name__)
PORT = 4000

    
@app.route("/", methods=["GET","POST"])
def startpy():

    result = {
        "Greetings" : "Earthlings",
    }

    return result

#     # return render_template("index.html", result = result)
@app.route("/bookshop",methods=["GET"])
def bookstore():

    return render_template("bookStore.html")
@app.route("/coffeeshop",methods=["GET"])
def coffeestore():
    return render_template("coffeeStore.html")
@app.route("/pizzashop",methods=["GET"])
def pizzastore():
    return render_template("pizzaStore.html")
@app.route("/bakery",methods=["GET"])
def bakery():
    return render_template("bakery.html")


if __name__ == "__main__":
    app.run( debug = True,host="0.0.0.0",port = PORT)
    