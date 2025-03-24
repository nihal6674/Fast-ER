from flask import Flask
from config import db
from routes.ambulance_routes import ambulance_bp
from routes.inventory_routes import inventory_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enables CORS for all routes

# Register Blueprints
app.register_blueprint(ambulance_bp, url_prefix="/ambulance")
app.register_blueprint(inventory_bp, url_prefix="/inventory")

# Check MongoDB Connection
try:
    db.list_collection_names()  # Attempt to fetch collection names
    print("✅ MongoDB Connected Successfully!")
except Exception as e:
    print(f"❌ MongoDB Connection Failed: {e}")

@app.route('/')
def home():
    return "🚑 FastER Ambulance Management System is Running!"

if __name__ == "__main__":
    app.run(debug=True)
