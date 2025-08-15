import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# Initialize extensions
db = SQLAlchemy()
bcrypt = Bcrypt()

# Create the Flask application
app = Flask(__name__)

# --- Configuration ---
# Load the database URL from an environment variable provided by Railway
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# --- Initialize Extensions with App ---
db.init_app(app)
bcrypt.init_app(app)
CORS(app) # This allows your Netlify frontend to communicate with your Railway backend

# --- Import and Register Blueprints (Routes) ---
# We do this here to avoid circular imports
from routes import api_blueprint
app.register_blueprint(api_blueprint, url_prefix='/api')

# --- Create Database Tables ---
# This block ensures that the tables are created based on your models
# the first time the application starts.
with app.app_context():
    db.create_all()

# --- Main Run Block ---
# This part is mostly for local testing. Railway uses the Dockerfile CMD.
if __name__ == '__main__':
    app.run(debug=True)

