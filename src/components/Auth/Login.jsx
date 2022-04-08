import { useFormik } from "formik";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { loginUser, userMe } from "../../api/userAPI";

const Login = ({ switchMode, setLoginedUser }) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values) => {
            loginUser({ email: values.email, password: values.password }).then((response) => {
                userMe(response.data.token).then((user) => {
                    setLoginedUser(user.data.user)
                })
            });
        },
    });

    return <div className="col-md-5 mx-auto" style={{ padding: "20px" }}>
        <Form id={"login-form"} onSubmit={formik.handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email} />
                <Form.Text className="text-muted">
                    Email errors
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password} />
                <Form.Text className="text-muted">
                    Password errors
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                    type="checkbox"
                    label="Check me out"
                    id="rememberMe"
                    name="rememberMe"
                    onChange={formik.handleChange}
                    value={formik.values.rememberMe} />
            </Form.Group>

            <Button variant="success" type="submit">
                Submit
            </Button>

            <Button onClick={switchMode} variant="outline-secondary" style={{ float: 'right' }}>
                Sign up
            </Button>
        </Form>
    </div>
}

export default Login;