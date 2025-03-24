import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ambulance, setAmbulance] = useState(null);

    useEffect(() => {
        const storedAmbulance = JSON.parse(localStorage.getItem("ambulance"));
        if (storedAmbulance) {
            setAmbulance(storedAmbulance);
        }
    }, []);

    const login = (ambulanceData) => {
        setAmbulance(ambulanceData);
        localStorage.setItem("ambulance", JSON.stringify(ambulanceData));
    };

    const logout = () => {
        setAmbulance(null);
        localStorage.removeItem("ambulance");
    };

    return (
        <AuthContext.Provider value={{ ambulance, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
