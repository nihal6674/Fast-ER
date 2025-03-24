import { useState } from "react";
import { registerAmbulance } from "../../api/AmbulanceApi";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        driver_name: "",
        number_plate: "",
        type: "governmental",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await registerAmbulance(formData);
        if (response.ambulance_id) {
            setMessage("🚑 Registered successfully!");
            setTimeout(() => navigate("/SignIn"), 1500);
        } else {
            setMessage(response.error || "Registration failed.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Ambulance Sign Up</h2>

                {message && (
                    <p className={`text-center mb-4 text-sm font-medium p-2 rounded-lg 
                    ${message.includes("🚑") ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="driver_name"
                        placeholder="Driver Name"
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="number_plate"
                        placeholder="Number Plate"
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                    />
                    <select
                        name="type"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={handleChange}
                    >
                        <option value="governmental">Governmental</option>
                        <option value="private">Private</option>
                    </select>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-200">
                        Sign Up
                    </button>
                </form>

                <p className="text-center mt-2">
                    Already have an account? <a href="/SignIn" className="text-blue-500 hover:underline">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
