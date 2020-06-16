import React from 'react'
import ProjectContainer from './ProjectContainer'
import {Row, Col} from 'react-bootstrap'
import AddProject from '../components/AddProject'

import styled from 'styled-components'
const Styles = styled.div`
max-height: 95vh; 
overflow: scroll;
align-items:center;
.add-project-row {
    background: #e7e7e7;
    height: 5vh;
    border-bottom: #e7e7e7 solid 1px;
    border-radius: 5%;
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
                <Row>
                <ProjectContainer 
                    projects={this.props.projects.reverse()} 
                    forFeed={true}/>
                </Row>
            </Styles>
        )
    }

}

export default Feed