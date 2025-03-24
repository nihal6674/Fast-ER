import { useAuth } from "../../context/AuthContext";
import { logoutAmbulance } from "../../api/AmbulanceApi";

const LogoutButton = () => {
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logoutAmbulance();
        logout();
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
        </button>
    );
};

export default LogoutButton;
