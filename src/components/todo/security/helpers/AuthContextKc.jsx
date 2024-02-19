import { createContext, useContext, useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { apiClient } from "../../api/Apiclient";


export const AuthContextKc = createContext();

export const useAuthKc = () => useContext(AuthContextKc);


function AuthProviderKc({ children }) {

    const { initialized, keycloak } = useKeycloak();

    const [isInitialized, setInitialized] = useState(initialized);

    const [isAuthenticated, setAuthenticated] = useState(localStorage.getItem("user") ? true : false);

    const [username, setUsername] = useState(localStorage.getItem("user"));



    useEffect(() => { if (initialized) { setInitialized(initialized) } }, [initialized])



    function login() {
        keycloak.login();
    }

    function logout() {
        localStorage.removeItem("user")
        keycloak.logout();
    }



    // useEffect(() => refreshUser(), [initialized === true ])

    useEffect(() => refreshAuthenticated(), [initialized])



    useEffect(() => refreshToken(), [initialized])


    function refreshToken(){
        if (initialized && keycloak.authenticated) {
            apiClient.interceptors.request.use(function (config) {
                config.headers["Authorization"] = `Bearer ${keycloak.token}`;
                return config;
            })
        }
    }

    function refreshAuthenticated() {
        if (initialized) {
            const auth = keycloak.authenticated;
            const user = auth ? keycloak.tokenParsed.preferred_username : null;
            if (isAuthenticated !== auth) {
                localStorage.setItem("user", user);
                setAuthenticated(auth);
                setUsername(user);
            }
        }

    }


    return (

        <AuthContextKc.Provider value={{ isAuthenticated, isInitialized, login, logout, username }}>
            {children}
        </AuthContextKc.Provider>
    )
};

export default AuthProviderKc;