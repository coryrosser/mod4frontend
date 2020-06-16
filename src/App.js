import React from 'react';
import { Row, Col } from 'react-bootstrap'
import TopBar from './containers/TopBar'
import ChatContainer from './containers/ChatContainer'
import Navigation from './components/Navigation'
import './App.css';
import MainContainer from './containers/MainContainer';
import { BrowserRouter as Router, Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import User from './components/User'
import NoMatch from './components/NoMatch'
import Feed from './containers/Feed'
import LogOut from './components/Logout'

class App extends React.Component {

  
  state = {
    fetchDone: false,
    users: [],
    //made allProjects to avoid messing up anywhere projects is passed.
    allProjects: [],
    loggedIn: false,
    current_user: {},
    chatting: false,
    searchType: '',
    searchTerm: '',
}
componentDidMount() {
  this.fetchUsers()
  this.fetchProjects()
}
onLogin = (credentials) => {
  console.log("login func")
}

createUser = (userToCreate,history) => {
    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToCreate)
    })
    .then(res=> res.json())
    .then(userInfo => {
      if(!userInfo.errors){
        localStorage.setItem("Auth-Key", userInfo.token)
        localStorage.setItem("uid", userInfo.user.name)
        this.setState({loggedIn: true}, () => history.push("/home"))
      }
    })
}

logout = (history) => {
  localStorage.clear()
  this.setState({loggedIn: false, current_user: {}}, () => history.push("/home"))
}


login = (userInfo,history) => {
  fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })
    .then(res=> res.json())
    .then(userInfo => {
      if(!userInfo.msg) {
        localStorage.setItem("Auth-Key", userInfo.token)
        localStorage.setItem("uid", userInfo.user.name)
        this.setState({loggedIn: true, current_user: userInfo.user}, ()=>{
          history.push("/home")
        })} else {
          alert(userInfo.msg)
        }
    })
}

fetchUsers = () => {
  fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(userData => {
    if(localStorage.getItem("Auth-Key")){
      this.setState({users: userData, 
        fetchDone: true, 
        loggedIn: true, 
        current_user: userData.find(user => user.name === localStorage.getItem('uid'))
      }, ()=>console.log("done"))}
    else
    this.setState({users: userData, fetchDone: true})
  })
}

fetchProjects = () => {
  fetch('http://localhost:3000/projects')
  .then(res => res.json())
  .then(projectData => {
    this.setState({allProjects: projectData})
  })
}

findUser() {
  debugger
  
}
  changeSearchType = (type) => {
    this.setState({searchType: type})
    console.log(type)
  }
  setSearchTerm = (term) => {
    this.setState({searchTerm: term}, () => {console.log(term)})
  }

  
  handleSearchSelect = (selection, type) => {
    console.log(selection)
    console.log(type)
    if (type === "Users" && selection) {
      //if the search was for a user, go to user page. 
      let user = this.state.users.find((user) => user.name == selection)
      console.log(user)
    } else if (type === "Projects" && selection) {
      //search for project? get project and find the user, then go to that persons page
      let project = this.state.allProjects.find((project) => project.name == selection)
      let user = this.state.users.find((user) => user.username === project.user.username)
      console.log(user, project)
    } else {
      alert("There was a problem with your search. Please try again.")
    }
  }

  postProject = (project) => {
    fetch('http://localhost:3000/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({project: project})
    })
    .then(res => res.json())
    .then(projectData => {
        if(!projectData.errors) {
            this.setState({allProjects: [...this.state.allProjects, projectData]},
              () => console.log(projectData))
        } 
    })
    .catch(errors => alert(errors))
}

  render() {
      return (
    <>
      <TopBar 
      handleSearchSelect={this.handleSearchSelect}
      users={this.state.users}
      projects={this.state.allProjects}
      searchType={this.state.searchType}
      loggedIn={this.state.loggedIn}
      changeSearchType={this.changeSearchType}
      setSearchTerm={this.setSearchTerm}
      searchTerm={this.state.searchTerm}/>
        <Row>
          <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Navigation loggedIn={this.state.loggedIn}/>
          </Col>
          <Col md={8} style={{ paddingLeft: 1, paddingRight: 0 }}>
            {this.state.fetchDone ? 
            // <MainContainer
            // loggedIn={this.state.loggedIn}
            // createUser={this.createUser}
            // login={this.login}
            // logout={this.logout}
            // onLogin={this.onLogin}
            // users={this.state.users} 
            // user={this.state.current_user}/>
              <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home">
                    {
                        this.state.loggedIn ? 
                          <Feed 
                          postProject={this.postProject}
                          projects={this.state.allProjects}
                          current_user={this.state.current_user}/>
                          :
                          <Home/>
                      }
                    </Route>
                    <Route exact path="/user">
                      <User user={this.state.current_user}/>
                    </Route>
                    <Route exact path="/user/:username">
                      <User user={this.findUser}/>
                    </Route>
                    <Route exact path="/login">
                      <Login login={this.login}/>
                    </Route>
                    <Route exact path="/signup">
                      <SignUp createUser={this.createUser}/>
                    </Route>
                    <Route exact path ="/logout">
                      <LogOut logout={this.logout}/>
                    </Route>
                    <Route component={NoMatch} />
                </Switch>
              </Router>
              :
              <div> Loading </div>}
            
          </Col>
          <Col
          className="h-95"
          style={{ paddingLeft: 1, paddingRight: 0, }}>
            {this.state.chatting ? 
              <ChatContainer />
              :
              <p onClick={() => {this.setState({chatting: true})}}> Click to chat. Feature Coming soon</p>
            }
          
          </Col>
        </Row>
    </>
  );
  }

}

export default App;
