import React from 'react'
import Project from '../components/Project'

const ProjectContainer = (props) => {
    return (
            props.projects.map((project) => { 
        return <Project 
                postComment={props.postComment}
                current_user={props.current_user}
                comments={
                    props.comments ?
                    props.comments.filter(comment => comment.project_id === project.id)
                    : []}
                project={project} 
                forFeed={props.forFeed}/>
        })
    )

}

export default ProjectContainer