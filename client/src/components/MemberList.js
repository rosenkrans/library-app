import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class MemberList extends Component {

    state = {
        members: [] 
    }


    render() {
        return (
            <div>
                <div>
                    <h2>Member List</h2>
                </div>
                <div>
				{/* {memberList} */}
				<Link to='/member/new'>Add New Member</Link>
			</div>
            </div>
        )
    }
}
