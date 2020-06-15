import React from 'react'
import { withRouter } from "react-router";


const LogOut = (props) => {
    return <div>
            {props.logout(props.history)}
        </div>
}

export default withRouter(LogOut)