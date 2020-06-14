import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import User from '../components/User'
import NoMatch from '../components/NoMatch'
import Feed from './Feed'

const MainContainer = (props) => {
    console.log(`MainContainer props: ${props.current_user}`)
    console.log(`MainContainer props: ${props.users}`)
    return (
        <React.Fragment>
        { props.loggedIn ?
            <Feed />
        :
            
        <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/user">
                <User user={props.user}/>
            </Route>
            <Route path="/login">
                <Login onLogin={props.onLogin}/>
            </Route>
            <Route path="/signup">
                <SignUp createUser={props.createUser}/>
            </Route>
            <Route component={NoMatch} />
        </Switch>
        </Router>
    }
    </React.Fragment>
    )
}

export default MainContainer