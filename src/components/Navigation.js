import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Styles = styled.div`
    a {
        color: #bbb;
        font-size: 1.3rem;
        &:hover {
            color: white;
            transition: 0.3s;
        }
    }
    .item {
        background-color: #333;
        
    }
    .fragment {
        height: 100vh;
        background-color: #333;
    }
`;


class Navigation extends React.Component {
    profileDisabled =(props)=>{
        if(props.loggedIn){
            return <ListGroup.Item  className="item">
                    <a href="/user">My Profile</a>
                </ListGroup.Item>
        } 
    }
    
    render() {
        return (
        <Styles>
            <div className="fragment">
            <React.Fragment>
                <ListGroup className="group">
                    <ListGroup.Item className="item">
                    <a href="/home">Home</a>
                    </ListGroup.Item>
                    {this.profileDisabled(this.props)}
                    <ListGroup.Item className="item">
                        <a href="/home">Settings</a>
                    </ListGroup.Item>
                </ListGroup>,
            </React.Fragment>
            </div>
        </Styles>
        )
    }
}

export default Navigation