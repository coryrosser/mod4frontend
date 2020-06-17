import React from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { InputGroup,DropdownButton, Dropdown} from 'react-bootstrap'

const TopSearch = (props) => {
    let userNames = props.users.map((user) => user.name)
    let projectNames = props.projects.map((project) => project.name)
        return (
            <InputGroup className="mb-1" size="sm">
                <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={props.searchType ? props.searchType : "Search For:"}
                id="input-group-dropdown-1"
                
                >
                <Dropdown.Item
                eventKey={"Users"}
                onSelect={(e) => {props.changeSearchType(e)}} >
                    Users
                </Dropdown.Item>
                <Dropdown.Item
                eventKey={"Projects"}
                onSelect={(e) => {props.changeSearchType(e)}} >
                    Projects
                </Dropdown.Item>
                </DropdownButton>
                <Typeahead
                onChange={(e, type) => {
                props.handleSearchSelect(e, props.searchType)
                }}
                placeholder="Search for Users or Projects..."
                options={!props.searchType ? [] 
                : props.searchType === "Users" ?
                userNames 
                : 
                projectNames}
                />
                {/* <FormControl 
                as={'input'}
                value={props.searchTerm}
                onChange={(e) => {
                    props.setSearchTerm(e.target.value)
                    console.log(props.searchTerm)}}
                aria-describedby="basic-addon1" 
                placeholder="Search for users or projects..."/> */}
            </InputGroup>
        )
}

export default TopSearch