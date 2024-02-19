import { useNavigate, useParams } from "react-router-dom"
import { createTodo, getTodo, updateTodo } from "./api/TodoApiServices"
import { useEffect, useState } from "react"
// import { useAuth } from "./security/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import moment from "moment";
import { useAuthKc } from "./security/helpers/AuthContextKc";

export default function TodoComponent() {

    const authContext = useAuthKc();

    const navigate = useNavigate();

    const { id } = useParams()

    const [todo, setTodo] = useState({ id: id, username: authContext.username, description: "", targetDate: "", done: false })
    // const [description, setDescription] = useState("")
    // const [targetDate, setTargetDate] = useState("")
    // const [done, setDone] = useState(false)


    useEffect(() => {if(authContext.isInitialized) {retriveTodo()}}, [authContext.isInitialized])

    function retriveTodo() {
        if (id !== -1) {
            
            getTodo(authContext.username, id)
                .then(response => {
                    setTodo({
                        id: response.data.id,
                        username: authContext.username,
                        description: response.data.description,
                        // targetDate: format(new Date(response.data.targetDate), "yyyy-MM-dd"),
                        targetDate: moment(response.data.targetDate).format("yyyy-MM-DD"),
                        done: response.data.done
                    })
                })
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        if(id===-1){
            createTodo(authContext.username, values).then(response => {
                navigate(`/todos`)
            }).catch(error => console.log(error))
        } else {
            updateTodo(authContext.username, values).then(response => {
                navigate(`/todos`)
    
            }).catch(error => console.log(error))
        }
        

    }

    function validate(values) {
        let errors = {}
        if (values.description.length < 5) {
            errors.description = "Enter at least 5 characters in description"
        }
        if (!values.targetDate || ! moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter valid target date"
        }
        const today = new Date();
        const target = new Date(values.targetDate);
        if (target < today) {
            errors.targetDate = "Enter target date greater than today"
        }
        return errors;
    }

    return (
        <div className="container">
            <Formik initialValues={todo}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate} validateOnChange={false} validateOnBlur={false}>
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            >

                            </ErrorMessage>

                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            >

                            </ErrorMessage>

                            <fieldset className="form-group">
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </div>
                                <div className="mb-5">
                                    <label className="form-label">Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </div>
                                <div className="mb-3">
                                    {/* <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                    <Field type="checkbox" class=" form-check form-check-input" id="exampleCheck1" />
                                         */}
                                </div>
                                <div className="mb-3 form-check form-switch">

                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault" >is Done?
                                        <Field id="flexSwitchCheckDefault" className="form-check-input" type="checkbox" role="switch" name="done"></Field>
                                    </label>

                                </div>
                            </fieldset>
                            <div>
                                <button type="submit" className="btn btn-success">Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}