from flask import Blueprint, request
from controllers.ambulance_controller import register_ambulance, get_all_ambulances

ambulance_bp = Blueprint("ambulance", __name__)

@ambulance_bp.route("/register", methods=["POST"])
def register():
    return register_ambulance(request.json)

@ambulance_bp.route("/all", methods=["GET"])
def get_ambulances():
    return get_all_ambulances()
