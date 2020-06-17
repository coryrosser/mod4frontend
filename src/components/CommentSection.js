import React from 'react'

import {Button, Modal} from 'react-bootstrap'
import {Row, Col, Image, Form, InputGroup, FormControl} from 'react-bootstrap'

class CommentSection extends React.Component {
    state = {
        show: false,
        comment: {
            project_id: this.props.project.id,
            user_id: this.props.current_user.projects[0].user_id,
            comment: ''
        },
        commentText: ''
    }
    createComments(comments) {
        return comments.map((comment) => {
            console.log(comment)
            return (
                <Row>
                    <Col xs={5}>@{comment.commenter.username}</Col>
                    <Col xs={2}> {}</Col>
                    <Col xs={5}>"{comment.comment}"</Col>
                </Row>
            )
        })
    }
    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});


    render() {
        return (
            <>
        <Button variant="primary" 
        block
        onClick={()=>this.handleShow()}>
        View Comments
        </Button>

        <Modal show={this.state.show} onHide={() => this.handleClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.createComments(this.props.comments)}
                <Form 
                onSubmit={(e) => {
                    e.preventDefault()
                    let comment = {...this.state.comment}
                    comment.comment = this.state.commentText
                    this.props.postComment(comment)}}
                className="mt-5">
                    <Row>
                <Col xs="auto">
                    <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                    Username
                    </Form.Label>
                    <InputGroup
                    size="sm"
                    className="mb-2">
                    <InputGroup.Prepend>
                    <InputGroup.Text>@{this.props.current_user.username}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl 
                    id="inlineFormInputGroup" 
                    value={this.state.commentText}
                    onChange={(e) => this.setState({commentText: e.target.value})}
                    size="sm"
                    placeholder="Enter your feedback..." />
                </InputGroup>
                </Col>
                <Col xs="auto">
                <Button 
                type="submit" 
                size="sm"
                className="mb-2">
                    Submit
                </Button>
                </Col>
                </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
            Close
            </Button>
            <Button variant="primary" onClick={() => this.handleClose()}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    </>
        )
    }
}

export default CommentSection