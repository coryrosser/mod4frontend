import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import Home from './components/Home'
import User from './components/User'
import NoMatch from './components/NoMatch'
import TopBar from './containers/TopBar'
import ChatContainer from './containers/ChatContainer'
import Navigation from './components/Navigation'
import './App.css';

const ColStyles = {
  border: "#333 solid 1px"
}

function App() {
  return (
    <React.Fragment>
      <TopBar />
        <Row>
          <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Navigation/>
          </Col>
          <Col md={8} style={{ paddingLeft: 1, paddingRight: 0 }}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <Route component={NoMatch} />
            </Switch>
            </Router>
          </Col>
          <Col style={{ paddingLeft: 1, paddingRight: 0 }}>
          <ChatContainer />
          </Col>
        </Row>
    </React.Fragment>
  );
}

export default App;
