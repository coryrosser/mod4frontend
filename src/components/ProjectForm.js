import React from 'react'
import { Form, Button, ButtonGroup } from 'react-bootstrap'


const ProjectForm = (props) => {
    return (<Form
            onSubmit={(e) => {
                e.preventDefault()
                props.postProject(props.project)
                props.handleClose()
            }}>
        <Form.Group>
            <Form.Label>
                Name
            </Form.Label>
            <Form.Control
            value={props.project.name}
            onChange={(e) => {props.nameChange(e.target.value)}}
            placeholder="Enter Name..."/>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                Desc
            </Form.Label>
            <Form.Control
            as='textarea'
            onChange={(e) => {props.descChange(e.target.value)}}
            placeholder='Describe your project...'/>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                Video
            </Form.Label>
            <Form.Control 
            onChange={(e) => {props.videoChange(e.target.value)}}
            placeholder='Do you have a link to a video? Link it here!'/>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                Link
            </Form.Label>
            <Form.Control 
            onChange={(e) => {props.linkChange(e.target.value)}}
            placeholder='Github Link...'/>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                Picture
            </Form.Label>
            <Form.Control 
            onChange={(e) => {props.pictureChange(e.target.value)}}
            placeholder='Any Image URLs?'/>
        </Form.Group>
        <ButtonGroup>
        <Button variant="primary" type="submit">
            Submit
        </Button>
        
        <Button 
        variant="secondary" onClick={() => props.handleClose()}>
            Close
        </Button>

        </ButtonGroup>
        
    </Form>)
}

export default ProjectForm