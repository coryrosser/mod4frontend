import React from 'react'
import { ListGroupItem, Image, Col, Row, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withRouter } from "react-router"

const Friend = (props) => {
    return (
        <ListGroupItem onClick={()=> {}}>
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
                            <Button variant="success" onClick={()=>props.acceptFriend(props.user)}/>
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={()=>console.log('approved')}/>
                        </Col>
                    </Row>
                )
            }
        </ListGroupItem>
    )
}

export default withRouter(Friend)