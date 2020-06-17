import React from 'react'
import { ListGroupItem, Image, Col, Row, Button } from 'react-bootstrap'
import { withRouter } from "react-router"

const Friend = (props) => {
    return (
        <ListGroupItem onClick={()=> {
            props.setLowerView(props.pending)
            if(!props.pending)
                props.history.push(`/user/${props.user.username}`)
        }}>
            <Row>
                <Col md={8}>
                    <Image 
                    src={props.user.img}
                    height={75}/>
                    <p>{props.user.name}</p>
                </Col>
            </Row>
            {
                props.pending && (
                    <Row>
                        <Col>
                            <Button variant="success" onClick={()=>{

                                if(props.pendingRemaining === 1)
                                    props.setLowerView(props.pending)
                                props.acceptFriend(props.user)
                            }}/>
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={()=>{
                                if(props.pendingRemaining === 1)
                                    props.setLowerView(props.pending)
                                props.deleteFriendRequest(props.user)
                            }}/>
                        </Col>
                    </Row>
                )
            }
        </ListGroupItem>
    )
}

export default withRouter(Friend)