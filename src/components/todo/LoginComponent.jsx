import { useAuthKc } from './security/helpers/AuthContextKc';
export default function LoginComponent() {


    // const [showErrorMessage, setErrorMessage] = useState(false)

    const authContext = useAuthKc();

        return (
            <div className="Login">
                <h1>Time to Login!</h1>

                {/* {showErrorMessage &&
                <div className='errorMessage'>Authentication Failed. Please check your credentials</div>} */}

                <div className="LoginForm">
                    {/* <div>
                    <label>User Name</label>
                    <input id='username' type="text" name="username"
                        value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input id='password' type="password" name="password"
                        value={password} onChange={handlePasswordChange} />
                </div> */}
                    <div>
                        <button type="button" name="login" onClick={authContext.login}>Login</button>
                    </div>
                </div>
            </div>
        )
    
}