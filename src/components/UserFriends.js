import React from 'react'
import { ListGroup, Row, Container } from 'react-bootstrap'
import Friend from './Friend'
import styled from 'styled-components'

const UserFriends = (props) => {
    return (
        <Container className="mt-2">
            <h2>Friends List</h2>
        <Row>

            <ListGroup className="">
            {props.friends.map((friend) => {
                return (
                    <Friend 
                        user={friend} 
                        pending={props.pending} 
                        acceptFriend={props.acceptFriend} 
                        setLowerView={props.setLowerView} 
                        pendingRemaining={props.friends.length}
                        deleteFriendRequest={props.deleteFriendRequest}
                    />
                )
            })}
            </ListGroup>
        </Row>
        </Container>
    )

}

export default UserFriends