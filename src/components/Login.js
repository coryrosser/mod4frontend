import React from 'react'
import { Form, Button } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    background: url("https://images.unsplash.com/photo-1549281899-f75600a24107?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80");
    background-size: cover;
    position: relative;
    z-index: -2;
    color: #f7f7f7;
    text-align: center;
    height: 100vh;
    .form {
        margin: 0 auto;
        max-width: 30vw;
        justify-content: center;
        align-items: center;
        color: #f7f7f7;
    }

    .overlay {
        background-color: black;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }
    
`;

class Login extends React.Component {
    state={
        email: '',
        password: ''
    }

    render() {
        return(
            <Styles>
                <div className="overlay"></div>
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
            </Styles>
        )
    }
}

export default Login