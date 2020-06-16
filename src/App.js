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
          localStorage.setItem("uid", userInfo.user.username)
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
          localStorage.setItem("uid", userInfo.user.username)
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
          current_user: userData.find(user => user.username === localStorage.getItem('uid'))
        })}
      else
      this.setState({users: userData, fetchDone: true})
    })
  }

  addFriend = (friend) => {
    fetch('http://localhost:3000/user_friends', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "user_friend": {
        "friend_username": friend.username,
        "user_username": this.state.current_user.username,
        "accepted": false
      }})
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
  }

  acceptFriend = (friend) => {
    fetch('http://localhost:3000/user_friends', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "user_friend": {
        "friend_username": friend.username,
        "user_username": this.state.current_user.username,
        "accepted": true
      }})
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
    fetch(`http://localhost:3000/friend`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "user_friend": {
        "friend_username": this.state.current_user.username,
        "user_username": friend.username,
        "accepted": true
      }})
    })
  }

  findUser(props) {
    return <User
      user={this.state.users.find(user => user.username === props.match.params.username)}
      currentUser = {this.state.current_user}
      addFriend={this.addFriend}
      acceptFriend={this.acceptFriend}
      pending={this.findPendingFriends()}
    />
  }

  findPendingFriends(){
    let pending = this.state.users.filter(user => {
      let pendingUsernames = user.pending_friends.map(pf=>pf.username)
      return pendingUsernames.includes(this.state.current_user.username)
    })
    return pending
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
              <Router>
                <Switch>
                    <Route exact path="/">
                      <Home/>
                    </Route>
                    <Route exact path="/home">
                      {
                        this.state.loggedIn ? 
                          <Feed/>
                          :
                          <Home/>
                      }
                    </Route>
                    <Route exact path="/user">
                      <User 
                        user={this.state.current_user} 
                        currentUser={this.state.current_user} 
                        acceptFriend={this.acceptFriend}
                        pending={this.findPendingFriends()}
                      />
                    </Route>
                    <Route exact path="/user/:username" render={(props)=>this.findUser(props)}/>
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
