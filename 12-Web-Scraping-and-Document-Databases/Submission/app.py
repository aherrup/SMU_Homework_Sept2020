from flask import Flask, render_template, redirect, jsonify
import pymongo
from scrape_mars import ScrapeMars

#init app and class
app = Flask(__name__)
scarpeMars = ScrapeMars()

#mongo init
conn = 'mongodb://localhost:27017'
# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Connect to a database. Will create one if not already available.
db = client.mars_app

@app.route("/")
def home():

    # Find one record of data from the mongo database
    planet_data = db.mars_data.find_one()

    # Return template and data
    return render_template("index.html", space=planet_data)


# Route that will trigger the scrape function
@app.route("/scrape")
def scrape():
    #scrape data
    scraped_data = scarpeMars.scrape_info()
    #update database
    db.mars_data.update({}, scraped_data, upsert=True)
    return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)
