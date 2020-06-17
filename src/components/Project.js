import React from 'react'
import styled from 'styled-components'
import CommentSection from './CommentSection'
import {Card, Row, Col, Button, 
    Image, ListGroupItem, ListGroup, 
    Jumbotron, Nav} from 'react-bootstrap'

    const Styles = styled.div`
        justify-content: center;
        align-items: center;

        .project-img {
            max-height: 175px;

        }
        .white-link {
            color:white;
        }
        .jumbo {
            margin-top: 3vh;
            color: #222;
            width: 60vw;
            height: 40vh;
            box-shadow: 0px 0px 6px 1px;
        }
    `;

const Project = (props) => {
    let project = props.project
    if(!props.forFeed) {
        return (
            <Col className="pt-3" xs={{span: 5, offset: 1 }}>
            <Card style={{ width: '26rem' }}>
                <Card.Img variant="top" src={project.img ? project.img : 'https://bit.ly/37xsDNx'} />
                <Card.Body>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Text>
                        {project.desc}
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Link href={project.link}>Github</Card.Link>
                    <Card.Link href="#">Embed Video Soon</Card.Link>
                </Card.Body>
            </Card>
            </Col>
        )
    } else {
        return (
            <Row className="justify-content-center">
                <Styles>
                    <Jumbotron className="jumbo">
                        <Row>
                        <Col xs={4}>
                            <Image 
                            className="project-img"
                            src={project.img ? project.img : 'https://bit.ly/37xsDNx'} />
                            <Nav.Link href={`/user/${project.user.username}`}> @{project.user.username}</Nav.Link>

                        </Col>
                        <Col xs={4}  className="title-col">
                            <h1>{project.name}</h1>
                            <p> {project.desc}</p>
                        </Col>    
                        <Col xs={4}>
                            <Button block 
                            href={project.link ? 
                                    project.link : "https://www.github.com"}
                            >View Code on Github</Button>

                            <Button block>
                                <Nav.Link className="white-link"
                                href={`/user/${project.user.username}`}> 
                                    View {project.user.username}
                                </Nav.Link>
                            </Button>
                            <Button 
                            href={project.video ? 
                                    project.video : "https://www.youtube.com"}
                            disabled={project.video ? 
                                        false : true}
                            block>View Video Demo</Button>
                            {props.current_user.projects.length > 0 ?
                            <CommentSection
                            postComment={props.postComment}
                            current_user={props.current_user}
                            comments={props.comments}
                            project={project} />
                            : null}
                            
                        </Col>
                        </Row>
                    </Jumbotron>
                </Styles>
            </Row>
            )
    }
        
    
}

export default Project