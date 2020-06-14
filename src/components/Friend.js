import React from 'react'
import { ListGroupItem, Image, Col } from 'react-bootstrap'

const Friend = (props) => {
    console.log(props)
    return (
        <ListGroupItem>
            <Col md={8}>
                <Image 
                src={props.user.img}
                height={75}/>
                <p>{props.user.name}</p>
            </Col>
        </ListGroupItem>
    )

}

export default Friend