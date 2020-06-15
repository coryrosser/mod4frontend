import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { withRouter } from "react-router";


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
        z-index: 1;
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

class Signup extends React.Component {
    state={
        name: '',
        username: '',
        bio: '',
        img: '',
        password: '',
    }

    setName = (value) => {
        this.setState({name: value})
    }
    setUsername = (value) => {
        this.setState({username: value})
    }
    setBio = (value) => {
        this.setState({bio: value})
    }
    setImg = (value) => {
        this.setState({img: value})
    }
    setPassword = (value) => {
        this.setState({password: value})
    }

    render() {
        return(
            // <Styles>
                // <div className="overlay"></div>
            <Form className="form"  
            onSubmit={(e) => {
                e.preventDefault()
                this.props.createUser({user: this.state}, this.props.history)
            }}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type="Name" 
                    placeholder="Enter Name"
                    value={this.state.name}
                    onChange={(e) => {this.setName(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="Username" placeholder="Enter Username" 
                    onChange={(e) => {this.setUsername(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicImg">
                    <Form.Label>Profile Image</Form.Label>
                    <Form.Control type="ProfileImage" placeholder="Enter Profile Image" 
                    onChange={(e) => {this.setImg(e.target.value)}}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicBio">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control type="Bio" placeholder="Enter Bio" 
                    onChange={(e) => {this.setBio(e.target.value)}}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" 
                    onChange={(e) => {this.setPassword(e.target.value)}}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            // </Styles>
        )
    }
}

export default withRouter(Signup)