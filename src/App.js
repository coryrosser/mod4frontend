import React from 'react';
import { Row, Col } from 'react-bootstrap'
import TopBar from './containers/TopBar'
import ChatContainer from './containers/ChatContainer'
import Navigation from './components/Navigation'
import './App.css';
import MainContainer from './containers/MainContainer';

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

createUser = (userToCreate) => {
    debugger
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(userToCreate)
    })
    .then(res=> res.json())
    .then(newUser => {
        this.setState({current_user: newUser})
        this.setState({loggedIn: true})
    })
}

fetchUsers = () => {
  this.setState({fetchDone: false})
  fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(userData => {
      this.setState({users: userData})
      this.randomUser(this.state.users)
      this.setState({fetchDone: true})
  })
}
randomUser(array) {
  this.setState({current_user: array[1]})
}

  render() {
      return (
    <React.Fragment>
      <TopBar/>
        <Row>
          <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Navigation/>
          </Col>
          <Col md={8} style={{ paddingLeft: 0, paddingRight: 0 }}>
            {/* Had a ton of trouble bc this content relied on a
             fetch to be done before it would render. Had to use 
             a new state that i called fetchDone in order to tell react to
             wait until thats "true" to render the main container. */}
            {this.state.fetchDone ? 
            <MainContainer
            loggedIn={this.state.loggedIn}
            createUser={this.createUser}
            onLogin={this.onLogin}
            users={this.state.users} 
            user={this.state.current_user}/>
              :
              <div> Loading </div>}
            
          </Col>
          <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
            {this.state.chatting ? 
              <ChatContainer />
              :
              <p onClick={() => {this.setState({chatting: true})}}> Click to chat. Feature Coming soon</p>
            }
          
          </Col>
        </Row>
    </React.Fragment>
  );
  }

}

export default App;
