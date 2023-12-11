"""Flask app for Cupcakes"""

import os

from flask import Flask, redirect, render_template, flash, jsonify, request
# from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///cupcakes')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

app.config['SECRET_KEY'] = "I'LL NEVER TELL!!"

# Having the Debug Toolbar show redirects explicitly is often useful;
# however, if you want to turn it off, you can uncomment this line:
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# debug = DebugToolbarExtension(app)


@app.get('/api/cupcakes')
def show_all_cupcakes():
    """Return JSON {'cupcakes': [{id, flavor, size, rating, image_url}, ...]}
    """

    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]

    return jsonify(cupcakes=serialized)

@app.get('/api/cupcakes/<int:cupcake_id>')
def show_cupcake(cupcake_id):
    """Return JSON {'cupcakes': [{id, flavor, size, rating, image_url}, ...]}
    """

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)

@app.post('/api/cupcakes')
def create_cupcake():
    """Create a single cupcake instance; responds with JSON:
        Returns JSON {cupcake: {id, flavor, size, rating, image_url}}
    """

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image_url = request.json["image_url"]
    # TODO: ^ consider doing a get request here if empty string, return None
    # handling for when image_url is optional and there's a default in Model

    print('This is flavor', flavor)

    new_cupcake = Cupcake(
        flavor=flavor,
        size=size,
        rating=rating,
        image_url=image_url,
    )

    db.session.add(new_cupcake)
    db.session.commit()

    # data = request.json

    # new_cupcake = Cupcake(
    #     flavor=data["flavor"],
    #     size=data["size"],
    #     rating=data["rating"],
    #     image_url=data["image_url"],
    # )

    # db.session.add(new_cupcake)
    # db.session.commit()

    serialized = new_cupcake.serialize()

    # Return w/status code 201 --- return tuple (json, status)
    return (jsonify(cupcake=serialized), 201)