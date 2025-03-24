import { useAuth } from "../../context/AuthContext";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
    const { ambulance } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <h1 className="text-lg font-bold">Ambulance Management</h1>
            {ambulance ? <LogoutButton /> : <a href="/signin" className="text-blue-300">Sign In</a>}
        </nav>
    );
};

export default Navbar;
