import React from 'react'
import ProjectContainer from './ProjectContainer'

class Feed extends React.Component {
    state = {
        projects: [],
        isLoading: true,
    }
    componentDidMount() {
        fetch('http://localhost:3000/projects')
        .then(res=> res.json())
        .then(projectData => {
            this.setState({projects: projectData.reverse(),isLoading: false})
        })
    }
    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? 
                    <h1>Loading...</h1>
                :
                    <ProjectContainer 
                    projects={this.state.projects} 
                    forFeed={true}/>
            }
            </React.Fragment>
        )
    }

}

export default Feed