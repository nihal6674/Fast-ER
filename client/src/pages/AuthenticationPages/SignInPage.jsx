import { useState } from "react";
import { loginAmbulance } from "../../api/AmbulanceApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignInPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await loginAmbulance(formData);
        if (response.ambulance_id) {
            login(response);
            setMessage("✅ Login successful!");
            setTimeout(() => navigate("/"), 1500);
        } else {
            setMessage(response.error || "Invalid credentials.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">🚑 Ambulance Sign In</h2>

                {message && (
                    <p className={`text-center mb-4 text-sm font-medium p-2 rounded-lg 
    ${message.includes("✅") ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition-transform transform hover:scale-105"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-600 font-medium hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;
