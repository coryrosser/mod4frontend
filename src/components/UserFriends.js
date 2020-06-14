import React from 'react'
import { ListGroup, Row, Container } from 'react-bootstrap'
import Friend from './Friend'

const UserFriends = (props) => {
    console.log(props)
    return (
        <Container className="mt-2">
            <h2>Friends List</h2>
        <Row>

            <ListGroup className="">
            {props.friends.map((friend) => {
                return (
                    <Friend user={friend} />
                )
            })}
            </ListGroup>
        </Row>
        </Container>
    )

}

export default UserFriends