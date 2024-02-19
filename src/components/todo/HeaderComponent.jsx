import { Link } from 'react-router-dom';
import { useAuthKc } from './security/helpers/AuthContextKc';

export default function HeaderComponent() {

    const authContext = useAuthKc();


    return (
        <header className='border-bottom border-light border-5 mb-5 p-2'>
            <div className='container-fluid'>
                <div className='row'>

                    <nav className='navbar navbar-expand-md'>

                        <Link className='navbar-brand ms-2 mr-4 pr-4 fs-2 fw-bold text-black' to='/'>TodoApp</Link>
                        <button className="navbar-toggler" type="button"
                            data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className='collapse navbar-collapse' id="navbarSupportedContent" key="navbarSupportedContent">
                            <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                            {authContext.isAuthenticated &&
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/welcome/user'>Home</Link>
                                </li>}
                                {authContext.isAuthenticated &&
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/todos'>Todos</Link>
                                    </li>}
                            </ul>
                            <ul className='navbar-nav'>
                                {authContext.isAuthenticated &&
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/logout' onClick={authContext.logout}>Logout</Link>
                                    </li>}
                                {!authContext.isAuthenticated &&
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/login'>Login</Link>
                                    </li>}



                            </ul>
                        </div>


                    </nav>


                </div>
            </div>
        </header>
    )
}