import { useEffect, useState } from "react"
import { getTodos, deleteTodo } from "./api/TodoApiServices"
// import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useAuthKc } from "./security/helpers/AuthContextKc";

export default function ListTodosComponent() {

    // const today = new Date()
    // const targetDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())

    const authContext = useAuthKc();

    const navigate = useNavigate();


    const [todos, setTodos] = useState([])

    const [message, setMessage] = useState(null);

    

    useEffect(() => {if(authContext.isInitialized) {refreshTodos()}}, [authContext.isInitialized])

    function refreshTodos() {
        getTodos(authContext.username)
            .then(response => setTodos(response.data))
            .catch(error => console.log(error))
    }

    function delteTodo(todo) {
        deleteTodo(authContext.username, todo.id)
            .then(() => {
                setMessage(`Deleted of todo "${todo.description.substring(0, 20)}..." successfully`);
                refreshTodos(); 
            })
            .catch()
    }

    function updateTodo(todo) {
        navigate(`/todos/${todo.id}`)
    }

    function addTodo(todo) {
        navigate(`/todos/-1`)
    }


    return (
        <div className='container'>
            <h1>Things you want to Do!</h1>
            {message && <div className="alert alert-warning">{message}</div>}   
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            {/* <td>id</td> */}
                            <th>Description</th>
                            <th>Target date</th>
                            <th>Is Done?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            todos.map(
                                todo => (
                                    <tr key={"todo_" + todo.id} >
                                        {/* <td>{todo.id}</td> */}
                                        <td>{todo.description}</td>
                                        <td>{moment(todo.targetDate).format("yyyy-MM-DD")}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td><button className="btn btn-danger" onClick={() => delteTodo(todo)}>Delete</button></td>
                                        <td><button className="btn btn-warning" onClick={() => updateTodo(todo)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }

                    </tbody>
                </table>
            </div>
            <button className="btn btn-success m-3" onClick={() => addTodo()}>Add new Todo</button>
        </div>
    )
}
