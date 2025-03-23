from config import db

ambulance_collection = db["ambulances"]  # Collection for ambulances

# Reference Schema for Ambulance
ambulance_schema = {
    "ambulance_id": str,      # Unique Ambulance ID (A001, A002, etc.)
    "code": str,              # critical / non-critical (default: non-critical)
    "driver_name": str,       # Name of the driver
    "number_plate": str,      # Ambulance's number plate
    "type": str               # governmental / private
}
