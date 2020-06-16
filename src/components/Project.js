import React from 'react'
import {Card, Row, Col, Button, Image, ListGroupItem, ListGroup, Nav} from 'react-bootstrap'

const Project = (props) => {
    let project = props.project
    return (
        <Col className="pt-3" xs={{span: 5, offset: 1 }}>
        <Card style={{ width: '26rem' }}>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
            <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>
                    {project.desc}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                {
                    props.forFeed && (
                        <ListGroupItem>
                            Created By: <Nav.Link href={`/user/${project.user.username}`}> {project.user.username}</Nav.Link>
                        </ListGroupItem>
                    )
                }
                <ListGroupItem>Rails</ListGroupItem>
                <ListGroupItem>React</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Card.Link href={project.link}>Github</Card.Link>
                <Card.Link href="#">Embed Video Soon</Card.Link>
            </Card.Body>
        </Card>
        </Col>
    )
}

export default Project