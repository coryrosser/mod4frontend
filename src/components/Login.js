import React from 'react'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'



class Login extends React.Component {
    state={
        email: '',
        password: ''
    }

    render() {
        return(
                <Form className="form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
        )
    }
}

export default Login