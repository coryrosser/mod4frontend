import React from 'react'
import { Form, Button } from 'react-bootstrap'


import styled from 'styled-components'


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
                
            <Form className="form"  
            onSubmit={(e) => {
                e.preventDefault()
                this.props.createUser(this.state)
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

        )
    }
}

export default Signup