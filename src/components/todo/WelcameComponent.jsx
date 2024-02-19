import { useParams, Link } from 'react-router-dom';

export default function WelcomeComponent() {

    const { username } = useParams()

    return (
        <div className="Welcome">
            <h1>
                Welcome {username} in TodoApp
            </h1>
            <div >
                Menage your todos. <Link to='/todos'>Click here</Link>
            </div>
        </div>
    )
}