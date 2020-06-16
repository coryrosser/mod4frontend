import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import ProjectForm from './ProjectForm'
import styled from 'styled-components'
import { withRouter } from "react-router";


class AddProject extends React.Component {
    state = {
        show: false,
        project: {
            username: this.props.current_user.username,
            name: '',
            desc: '',
            video: 'https://www.github.com',
            link: '',
            img: '',
        }
    }

    
    componentDidMount() {
        console.log(this.props.current_user)
    }
    nameChange = (value) => {
        let editProject = {...this.state.project}
        editProject.name = value;
        this.setState({project: editProject})
    }
    descChange = (value) => {
        let editProject = {...this.state.project}
        editProject.desc = value;
        this.setState({project: editProject})
    }
    videoChange = (value) => {
        let editProject = {...this.state.project}
        editProject.video = value;
        this.setState({project: editProject})
    }
    linkChange = (value) => {
        let editProject = {...this.state.project}
        editProject.link = value;
        this.setState({project: editProject})
    }
    pictureChange = (value) => {
        let editProject = {...this.state.project}
        editProject.picture = value;
        this.setState({project: editProject})
    }
    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});
    render() { 
        return (
            <>
        <Button size="sm" block onClick={() => this.handleShow()}>
            Post your project!
        </Button>

        <Modal show={this.state.show} onHide={() => this.handleClose()}>
        <Modal.Header closeButton>
            <Modal.Title>Project Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ProjectForm
            handleClose={this.handleClose}
            postProject={this.props.postProject}
            nameChange={this.nameChange}
            descChange={this.descChange}
            videoChange={this.videoChange}
            linkChange={this.linkChange}
            pictureChange={this.pictureChange}
            project={this.state.project}
            current_user={this.props.current_user}/>
        </Modal.Body>
        </Modal>
    </>
        )
    }
}

export default AddProject