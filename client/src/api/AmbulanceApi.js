const API_BASE_URL = "http://127.0.0.1:5000/ambulance";

export const registerAmbulance = async (ambulanceData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ambulanceData),
        });
        return await response.json();
    } catch (error) {
        return { error: "Network error. Please try again." };
    }
};

export const loginAmbulance = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        return await response.json();
    } catch (error) {
        return { error: "Network error. Please try again." };
    }
};

export const logoutAmbulance = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
        });
        return await response.json();
    } catch (error) {
        return { error: "Logout failed. Try again." };
    }
};
