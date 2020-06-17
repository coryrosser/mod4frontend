import React from 'react'
import ProjectContainer from './ProjectContainer'
import {Row, Col} from 'react-bootstrap'
import AddProject from '../components/AddProject'

import styled from 'styled-components'
const Styles = styled.div`
max-height: 95vh; 
overflow: scroll;
align-items:center;
background: url("https://images.unsplash.com/photo-1549281899-f75600a24107?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80");
background-size: cover;
position: relative;
.add-project-row {
    background: #f7f7f7;
    height: 5vh;
    border-bottom: #e7e7e7 solid 1px;
    border-radius: 5%;
}

.overlay {
    background-color: black;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
}
h5 {
    color: #222;
    text-align:center;
}
`
class Feed extends React.Component {
    render() {
        return (
            <Styles>
                <div className="overlay"></div>
                <Row  className="align-items-center add-project-row">
                <Col xs={4}>
                    <h5>Let the world see your work!</h5>
                </Col>
                {this.props.current_user ? 
                <Col xs={4} className="align-items-center">
                    <AddProject 
                    postProject={this.props.postProject}
                    current_user={this.props.current_user}/>
                </Col>
                
                : 
                    <p>Please Login to Post a Project</p>
                }
                <Col xs={4} />
                </Row>
                <ProjectContainer
                    postComment={this.props.postComment}
                    current_user={this.props.current_user}
                    comments={this.props.comments}
                    projects={this.props.projects} 
                    forFeed={true}/>
            </Styles>
        )
    }

}

export default Feed