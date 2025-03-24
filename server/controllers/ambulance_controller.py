from flask import request, jsonify
from models.ambulance_model import Ambulance

def register_ambulance():
    """Registers an ambulance."""
    data = request.json
    result = Ambulance.register_ambulance(data)
    return jsonify(result), (200 if "ambulance_id" in result else 400)

def login_ambulance():
    """Authenticates an ambulance login."""
    data = request.json
    result = Ambulance.authenticate_ambulance(data.get("email"), data.get("password"))
    return jsonify(result), (200 if "ambulance_id" in result else 401)

def logout_ambulance():
    """Logs out an ambulance (for frontend session handling)."""
    return jsonify({"success": True, "message": "Logged out successfully!"})
