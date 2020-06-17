import React from 'react'
import { Nav, Navbar, Col} from 'react-bootstrap'
import styled from 'styled-components'
import TopSearch from '../components/TopSearch'

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }
    .navbar-brand, .navbar-nav .nav-link {
        padding: 0.4rem;
        border-right: #222 solid 1px;
        border-left: #222 solid 1px;
        color: #bbb;
        margin-left: 1rem;
        font-size: 1rem;

        &:hover {
            color: white;
            border-right: #bbb solid 1px;
            border-left: #bbb solid 1px;
            transition: 0.3s;
        }
    }
`;

const loginLogout = (props) => {
    if(props.loggedIn)
        return <Nav.Item><Nav.Link href="/logout">Log Out</Nav.Link></Nav.Item>
    else
        return <Nav.Item><Nav.Link href="/login">Log In</Nav.Link></Nav.Item>
}

const TopBar = (props) => (
    <Styles>
        <Navbar expand="lg">
            <Col md={2}>
                <Navbar.Brand href="/">DevBook</Navbar.Brand>
            </Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Col md={6}>
                <TopSearch 
                handleSearchSelect={props.handleSearchSelect}
                users={props.users}
                projects={props.projects}
                searchType={props.searchType}
                changeSearchType={props.changeSearchType}
                searchTerm={props.searchTerm}
                setSearchTerm={props.setSearchTerm}/>
                
                </Col>
                <Col md={4}>
                    <Nav className="ml-auto">
                    {loginLogout(props)}
                    <Nav.Item><Nav.Link href="/signup">Sign Up</Nav.Link></Nav.Item>
                </Nav>
                </Col>
                
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)

export default TopBar