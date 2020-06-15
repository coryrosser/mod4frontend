import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/Home'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import User from '../components/User'
import NoMatch from '../components/NoMatch'
import Feed from './Feed'
import LogOut from '../components/Logout'

const MainContainer = (props) => {
    return (
        <React.Fragment>
            {/* { props.loggedIn ?
             <Feed />
            :  */}
            
            <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/user">
                <User user={props.user}/>
            </Route>
            <Route exact path="/login">
                <Login login={props.login}/>
            </Route>
            <Route exact path="/signup">
                <SignUp createUser={props.createUser}/>
            </Route>
            <Route exact path ="/logout">
                <LogOut logout={props.logout}/>
            </Route>
            <Route component={NoMatch} />
        </Switch>
        </Router>
    
    </React.Fragment>
    )
}

export default MainContainer