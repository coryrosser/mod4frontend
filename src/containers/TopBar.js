import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }
    .navbar-brand, .navbar-nav .nav-link {
        color: #bbb;

        &:hover {
            color: white;
            transition: 0.3s;
        }
    }
`;

const TopBar = (props) => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/">Mod 4</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" >
                    <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/user">Profile</Nav.Link></Nav.Item>
                </Nav>
                <Nav className="ml-auto">
                <Nav.Item><Nav.Link href="/user">Login</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="/user">Sign Up</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)

export default TopBar