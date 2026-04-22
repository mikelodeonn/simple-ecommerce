import React, {createContext, useState, useContext, useEffect} from "react";
import { storageService } from "../shared/services/storageService";


const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
        const loadStorageData = async () => {
            try {
                const savedUser = await storageService.get('user_session');
                if (savedUser) {
                    setUser(savedUser);
                }
            } catch (e) {
                console.error("Error cargando sesión", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadStorageData();
    }, []);

   
    
    const login = async (userData) => {
        setUser(userData);
        await storageService.save('user_session', userData);
    };

    
    const logout = async () => {
        setUser(null);
        await storageService.remove('user_session');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);