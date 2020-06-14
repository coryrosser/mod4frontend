import React from 'react'
import { Container, Grid, Row, Col, Card, Button, Image, Dropdown, DropdownButton } from 'react-bootstrap'
import styled from 'styled-components'
import ProjectContainer from '../containers/ProjectContainer';
import UserFriends from '../components/UserFriends'

const Styles = styled.div`
    .top-row {
        background: #f7f7f7;
        align-items: center;
        border-bottom: #333 solid 1px;
    }
    .mid-row {
        background: #f6f6f6;
        padding-bottom: 1rem;

    }
    .bottom-row {
        text-align: center;
    }
`;

class User extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    state= {
        lowerView: 1,
    }
    render() {
        return (
            <Styles>
                <Container fluid>
                    <Row className="top-row justify-content-center pt-4">
                        <Col 
                        md={4}>
                            <Image 
                            className="pb-1"
                            src={this.props.user.img} 
                            height={250}
                            roundedCircle />
                        </Col>
                        <Col md={4}>
                            <h1 className="user-name ml-5">{this.props.user.name}</h1>
                            <h3 className="ml-5">About: </h3> 
                            <p className="ml-5">{this.props.user.bio}</p>
                        </Col>
                    </Row>
                    <Row className="mid-row pt-4">
                        <Col xs={{offset: 2}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                <Card.Title>{this.props.user.name}'s Friends:</Card.Title>
                                <Card.Text>
                                    {this.props.user.friends.length}
                                </Card.Text>
                                <Button variant="primary" 
                                onClick={() => {this.setState({lowerView: 2})}}>
                                    See Friends
                                </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={{offset: 0}} >
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                <Card.Title>{this.props.user.name}'s Projects:</Card.Title>
                                <Card.Text>
                                    {this.props.user.projects.length}
                                </Card.Text>
                                <Button variant="primary" 
                                onClick={() => {this.setState({lowerView: 1}, console.log("switch"))}}
                                >See Projects
                                </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="bottom-row"> 
                        {this.state.lowerView == 1 ? 
                        <ProjectContainer projects={this.props.user.projects}/>
                        
                            :
                        <UserFriends friends={this.props.user.friends}/>}
                    </Row>
                </Container>
            </Styles>
        )
    }

}

export default User