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
    projects: [],
    loggedIn: false,
    current_user: {},
    chatting: true,

}
componentDidMount() {
  this.fetchUsers()
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
        localStorage.setItem("Auth-Key", userInfo.token)
        localStorage.setItem("uid", userInfo.user.name)
        this.setState({loggedIn: true, current_user: userInfo.user}, ()=>{
          history.push("/home")
        })
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
      })}
    else
    this.setState({users: userData, fetchDone: true})
  })
}

findUser() {
  debugger
  
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
                          <Feed/>
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
