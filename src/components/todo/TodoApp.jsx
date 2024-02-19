import './Todoapp.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LogoutComponent from './LogoutComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodosComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcameComponent';
import LoginComponent from './LoginComponent';
import TodoComponent from './TodoComponent';

// import AuthProvider, { useAuth } from './security/AuthContext';

// import { ReactKeycloakProvider } from "@react-keycloak/web";


// import _kc from './security/keycloak';

import AuthProviderKc, { useAuthKc } from './security/helpers/AuthContextKc';




function AuthenticatedRoute({ children }) {
    const authContext = useAuthKc();
    if (authContext.isAuthenticated) {
        return children
    }
    return <Navigate to='/' />

}

// function RedirectLoginRoute({ children }) {
//     const authContext = useAuthKc();
//     console.log(authContext.isAuthenticated)
//     if (!authContext.isAuthenticated) {
//         return children
//     }
    
//     const url = '/welcome/'+authContext.username;
//     return <Navigate to = {url} />

// }

export default function TodoApp() {

    return (
        <div className="TodoApp">

            <AuthProviderKc>
                    <BrowserRouter>
                        <HeaderComponent />
                        <Routes>
                            <Route path='/' element={<LoginComponent />} />
                            <Route path='/login' element={<LoginComponent />} />
                            <Route path='/welcome/:username' element={<AuthenticatedRoute><WelcomeComponent /></AuthenticatedRoute>} />
                            <Route path='/todos' element={<AuthenticatedRoute><ListTodosComponent /></AuthenticatedRoute>} />
                            <Route path='/todos/:id' element={<AuthenticatedRoute><TodoComponent /></AuthenticatedRoute>} />
                            <Route path='/logout' element={<AuthenticatedRoute><LogoutComponent /></AuthenticatedRoute>} />
                            <Route path='*' element={<ErrorComponent />} />
                        </Routes>
                        <FooterComponent />
                    </BrowserRouter>
            </AuthProviderKc>
            

        </div>
    )


}