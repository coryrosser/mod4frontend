import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Home from './components/Home'
import User from './components/User'
import NoMatch from './components/NoMatch'
import TopBar from './containers/TopBar'
import Layout from './components/Layout'
import Navigation from './components/Navigation'
import './App.css';

function App() {
  return (
    <React.Fragment>
      <TopBar />
        <Row>
          <Col>
            <Navigation/>
          </Col>
          <Col md={8}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <Route component={NoMatch} />
            </Switch>
            </Router>
          </Col>
          <Col>
            <div>
              <h1> Chat will Go Here</h1>
            </div>
          </Col>
        </Row>
    </React.Fragment>
  );
}

export default App;
