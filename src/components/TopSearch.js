import React from 'react'
import { InputGroup,DropdownButton, Dropdown, FormControl } from 'react-bootstrap'

class TopSearch extends React.Component {
    render () {
        return (
            <InputGroup className="mb-1" size="sm">
                <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title="Search For: "
                id="input-group-dropdown-1"
                >
                <Dropdown.Item href="#">Users</Dropdown.Item>
                <Dropdown.Item href="#">Projects</Dropdown.Item>
                </DropdownButton>
                <FormControl aria-describedby="basic-addon1" placeholder="Search for users or projects..."/>
            </InputGroup>
        )
    }
}

export default TopSearch