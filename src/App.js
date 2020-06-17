import React from 'react';
import { Row, Col } from 'react-bootstrap'
import TopBar from './containers/TopBar'
import ChatContainer from './containers/ChatContainer'
import Navigation from './components/Navigation'
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
    comments: [],
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
  this.fetchComments()
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
      let newPending = [...this.state.current_user.pending_friends]
      newPending.push(friend)
      this.setState({current_user: {...this.state.current_user, pending_friends: newPending}})
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
      let newFriends = [...this.state.current_user.friends]
      newFriends.push(res.friend)
      this.setState({current_user: {...this.state.current_user, friends: newFriends}}, ()=>console.log(this.state.current_user))
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

  fetchComments() {
    fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(commentData => {
      this.setState({comments: commentData})
    })
  }

  findUser(props) {
    return <User
      user={this.state.users.find(user => user.username === props.match.params.username)}
      currentUser = {this.state.current_user}
      addFriend={this.addFriend}
      acceptFriend={this.acceptFriend}
      pending={this.findPendingFriends()}
      deleteFriendRequest={this.deleteFriendRequest}
    />
  }

  findPendingFriends(){
    if (this.state.current_user) {
    let pending = this.state.users.filter(user => {
      let pendingUsernames = user.pending_friends.map(pf=>pf.username)
      return pendingUsernames.includes(this.state.current_user.username)
    })
    return pending
  }
  }

fetchProjects = () => {
  fetch('http://localhost:3000/projects')
  .then(res => res.json())
  .then(projectData => {
    this.setState({allProjects: projectData})
  })
}

  changeSearchType = (type) => {
    this.setState({searchType: type})
    console.log(type)
  }
  setSearchTerm = (term) => {
    this.setState({searchTerm: term}, () => {console.log(term)})
  }

  deleteFriendRequest = (friend) => {
    fetch(`http://localhost:3000/deleteRequest`, {
      method: "DELETE",
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
    .then(res=>res.json())
    .then(res=> {
      if(res.message === 'Succesful.'){
        let newUsers = this.state.users.filter(user=>user.username != friend.username)
        this.setState({users: newUsers}, ()=>console.log(this.state.users))
      }
    })
  }

  
  handleSearchSelect = (selection, type) => {
    console.log(selection)
    console.log(type)
    if (type === "Users" && selection) {
      //if the search was for a user, go to user page. 
      let user = this.state.users.find((user) => user.name === selection)
      console.log(user)
    } else if (type === "Projects" && selection) {
      //search for project? get project and find the user, then go to that persons page
      let project = this.state.allProjects.find((project) => project.name === selection)
      let user = this.state.users.find((user) => user.username === project.user.username)
      console.log(user, project)
    } else {
      alert("There was a problem with your search. Please try again.")
    }
  }
  
  postComment = (comment) => {
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({comment: comment})
    })
    .then(res => res.json())
    .then(comment => this.setState({comments: [...this.state.comments, comment]}))
  }

  reverseProjects =(arr) => {
    let reversed = [...arr]
    reversed.reverse()
    return reversed
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

  changeChatShow =() => {
    this.setState({chatting: !this.state.chatting})
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
              <Router>
                <Switch>
                    <Route exact path="/">
                      <Home/>
                    </Route>
                    <Route exact path="/home">
                    {
                        this.state.loggedIn ? 
                          <Feed 
                          postComment={this.postComment}
                          comments={this.state.comments}
                          postProject={this.postProject}
                          projects={this.reverseProjects(this.state.allProjects)}
                          current_user={this.state.current_user}/>
                          :
                          <Home/>
                      }
                    </Route>
                    <Route exact path="/user">
                      <User 
                        postComment={this.postComment}
                        comments={this.state.comments}
                        user={this.state.current_user} 
                        currentUser={this.state.current_user} 
                        acceptFriend={this.acceptFriend}
                        pending={this.findPendingFriends()}
                        deleteFriendRequest={this.deleteFriendRequest}
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
          <Col
          className="h-95"
          style={{ paddingLeft: 1, paddingRight: 0, }}>
              <ChatContainer 
              changeShow={this.changeChatShow}
              chatting={this.state.chatting}/>
            </Col>
        </Row>
    </>
  );
  }

}

export default App;
