from models.ambulance_model import ambulance_collection
from flask import jsonify

def register_ambulance(data):
    required_fields = ["ambulance_id", "driver_name", "number_plate", "type"]
    
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400
    
    if "code" not in data:
        data["code"] = "non-critical"  # Default value

    existing = ambulance_collection.find_one({"ambulance_id": data["ambulance_id"]})
    if existing:
        return jsonify({"error": "Ambulance ID already exists"}), 400

    ambulance_collection.insert_one(data)
    return jsonify({"message": "Ambulance registered successfully"}), 201

def get_all_ambulances():
    ambulances = list(ambulance_collection.find({}, {"_id": 0}))
    return jsonify(ambulances), 200
