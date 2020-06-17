import React from 'react'
import { Container, Row, Col, Card, Button, Image} from 'react-bootstrap'
import styled from 'styled-components'
import ProjectContainer from '../containers/ProjectContainer';
import UserFriends from '../components/UserFriends'

const Styles = styled.div`
    
    background: url("http://www.baltana.com/files/wallpapers-5/Gradient-Background-Wallpaper-16358.jpg");
    background-size: cover;
    overflow: scroll;
    max-height: 95vh;
    .top-row {
        align-items: center;
        color: #f7f7f7;
        border-bottom: #333 solid 1px;
    }
    .mid-row {
        padding-bottom: 1rem;

    }
    .contain {
        height: 45vh;
    }
    .bottom-row {
        text-align: center;
        height: 100%;
    }
    .banner {
        position: absolute;
        top: 0;
        left: 0;
        size: cover;
        z-index:-1;
        filter: blur(6px);
    }
    .overlay {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background-color: rgba(0, 0, 0, .6);
    }

`;

class User extends React.Component {
    state= {
        lowerView: 1,
    }

    isCurrentUser = () => this.props.user.username === this.props.currentUser.username ? true : false

    isFriend = () => {
        let friendsNames = this.props.user.friends.map(friend => friend.username)
        return friendsNames.includes(this.props.currentUser.username)
    }

    isPending = () => { 
        let pending = this.props.currentUser.pending_friends.map(friend => friend.username)
        return pending.includes(this.props.user.username)
    }

    lowerView = () => {
        if(this.state.lowerView === 1)
            return <ProjectContainer 
            postComment={this.props.postComment}
            comments={this.props.comments}
            current_user={this.props.currentUser}
            projects={this.props.user.projects}/>
        else if(this.state.lowerView === 2)
            return <UserFriends friends={this.props.user.friends} pending={false} acceptFriend={this.acceptFriend}/>
        else
            return <UserFriends friends={this.props.pending} pending={true} acceptFriend={this.props.acceptFriend}/>
    }

    render() {
        return (            
            <Styles>
                <Container fluid>
                    <Row className="top-row justify-content-center pt-4">
                        {/* {this.props.user.banner_img ? 
                        <>
                        <Image className="banner" src={this.props.user.banner_img} />
                        <div className="overlay"></div>
                        </>
                        : ''
                        } */}
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
                            {
                                !this.isCurrentUser() && !this.isFriend() && !this.isPending() && (
                                    <Button variant="primary" 
                                        onClick={() => {this.props.addFriend(this.props.user)}}>
                                        Add Friend
                                    </Button>
                                )
                            }
                            {
                                !this.isCurrentUser() && !this.isFriend() && this.isPending() && (
                                    <Button variant="danger">
                                        Pending
                                    </Button>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="mid-row pt-4">
                        <Col xs={{offset: 0}}>
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
                        <Col xs={{offset: 0}} >
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                <Card.Title>Pending Friends</Card.Title>
                                <Card.Text>
                                    {this.props.pending.length}
                                </Card.Text>
                                <Button variant="primary" 
                                onClick={() => {this.setState({lowerView: 3})}}
                                >
                                    View
                                </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="bottom-row"> 
                    <div className="contain">
                        {this.lowerView()}
                    </div>
                    </Row>
                </Container>
            </Styles>
        )
    }

}

export default User