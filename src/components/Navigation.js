import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

class Navigation extends React.Component {
    render() {
        return (
            <React.Fragment>
            <ListGroup>
                <ListGroup.Item >
                    Home
                </ListGroup.Item>
                <ListGroup.Item >
                    My Profile
                </ListGroup.Item>
                <ListGroup.Item >
                    Settings
                </ListGroup.Item>
            </ListGroup>,
        </React.Fragment>
        )
    }
}

export default Navigation