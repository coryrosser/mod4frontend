import React from 'react'
import { Jumbotron as Jumbo, Container, Button,Row,Col } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    .jumbo {
        background: url("https://images.unsplash.com/photo-1549281899-f75600a24107?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80");
        background-size: cover;
        position: relative;
        z-index: -2;
        color: #f7f7f7;
        text-align: center;
        height: 100vh;
        margin-left: 0;

    }
    .jumbo h1 {
        font-size: 5rem;
    }
    .button {
        z-index: 1;
    }
    .overlay {
        background-color: black;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
    }
`;

const Home = () => (
    <Styles>
        <Jumbo fluid className="jumbo">
            <div className="overlay"></div>
            <Container>
                <h1> Welcome </h1>
                <p> 
                    DevBook is your new place to meet and connect with other
                    Developers, while also being able to show off your 
                    projects! 
                </p>
                <p>If you are new to GitBook, please make an account by pressing Sign Up!</p>
                
                <Row className="mt-5">
                    </Row>
            </Container>
        </Jumbo>
    </Styles>
)

export default Home