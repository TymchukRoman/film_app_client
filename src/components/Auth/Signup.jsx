import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { registerUser } from "../../api/userAPI";
import { registerValidation } from "./validation/signup";

const Singup = ({ switchMode, setLoginedUser }) => {

    const [errors, setErrors] = useState([]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
            username: ''
        },
        onSubmit: (values) => {
            const { error } = registerValidation(values)
            if (error) {
                setErrors(error.message)
            } else {
                registerUser({ email: values.email, password: values.password, name: values.username }).then((response) => {
                    if (response.data.error) {
                        setErrors(response.data.error)
                    } else if (response.data?.token && response.data?.user) {
                        localStorage.setItem('auth_token', response.data.token)
                        setLoginedUser(response.data.user);
                    }
                });
            }
        },
    });

    return <div className="col-md-5 mx-auto" style={{ padding: "20px" }}>
        <Form id={"signup-form"} onSubmit={formik.handleSubmit} autoComplete="off">
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password} />

                <Form.Label>
                    Repeat password
                </Form.Label>

                <Form.Control
                    type="password"
                    name="repeatPassword"
                    onChange={formik.handleChange}
                    value={formik.values.repeatPassword} />
                {errors
                    ? <Form.Text className="text-muted">
                        {errors}
                    </Form.Text>
                    : <></>
                }
            </Form.Group>
            <Button variant="success" type="submit">
                Submit
            </Button>

            <Button onClick={switchMode} variant="outline-secondary" style={{ float: 'right' }}>
                Log in
            </Button>
        </Form>
    </div>
}

export default Singup;