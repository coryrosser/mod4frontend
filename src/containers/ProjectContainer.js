import React from 'react'
import Project from '../components/Project'

const ProjectContainer = (props) => {
    return (
            props.projects.map((project) => { 
        return <Project project={project} forFeed={props.forFeed}/>
        })
    )

}

export default ProjectContainer