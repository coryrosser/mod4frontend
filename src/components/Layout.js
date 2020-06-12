import React from 'react'
import { Container, Row } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    
`;

const Layout = (props) => (
    <Container fluid className="container-layout">
        <Row>
            {props.children}
        </Row>
    </Container>
)

export default Layout