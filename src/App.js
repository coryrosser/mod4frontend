import React from 'react';
import { Row, Col } from 'react-bootstrap'
import TopBar from './containers/TopBar'
import ChatContainer from './containers/ChatContainer'
import Navigation from './components/Navigation'
import './App.css';
import MainContainer from './containers/MainContainer';
import { Redirect, RedirectProps } from 'react-router-dom'

class App extends React.Component {

  
  state = {
    fetchDone: false,
    users: [],
    projects: [],
    loggedIn: false,
    current_user: {},
    chatting: true,

}
componentDidMount() {
  this.fetchUsers()
  if(localStorage.getItem("Auth-Key"))
    this.setState({loggedIn: true})
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
        localStorage.setItem("Auth-Key", userInfo.token)
        this.setState({loggedIn: true, current_user: userInfo.user}, () => history.push("/home"))
    })
}

fetchUsers = () => {
  fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(userData => {
      this.setState({users: userData, fetchDone: true, current_user: userData[1]})
  })
}

  render() {
      return (
    <>
      <TopBar loggedIn={this.state.loggedIn}/>
        <Row>
          <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Navigation loggedIn={this.state.loggedIn}/>
          </Col>
          <Col md={8} style={{ paddingLeft: 1, paddingRight: 0 }}>
            {this.state.fetchDone ? 
            <MainContainer
            loggedIn={this.state.loggedIn}
            createUser={this.createUser}
            login={this.login}
            logout={this.logout}
            onLogin={this.onLogin}
            users={this.state.users} 
            user={this.state.current_user}/>
              :
              <div> Loading </div>}
            
          </Col>
          <Col style={{ paddingLeft: 1, paddingRight: 0 }}>
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
