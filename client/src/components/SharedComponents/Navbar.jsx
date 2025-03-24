import { useAuth } from "../../context/AuthContext";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { ambulance } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold cursor-pointer" onClick={() => navigate("/")}>
                Ambulance Management
            </h1>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition-all"
                >
                    Home
                </button>
                {ambulance && (
                    <button
                        onClick={() => navigate("/ambulance/inventory")}
                        className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 transition-all"
                    >
                        Inventory
                    </button>
                )}
                {ambulance ? <LogoutButton /> : <a href="/signin" className="text-blue-300">Sign In</a>}
            </div>
        </nav>
    );
};

export default Navbar;
