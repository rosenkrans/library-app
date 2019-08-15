import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class MemberList extends Component {

    state = {
        members: [] 
    }

    componentDidMount() {
        this.getAllMembers()
    }

    getAllMembers = () => {
        axios.get("/api/v1/members/")
            .then(res => {
                this.setState({ members: res.data})
            })
            .catch(err => {
                this.setState({ error: err.message})
            })
    }


    render() {

        let memberList = this.state.members.map(member => {
            return (
                <Link to={`/memberlist/${member.id}/`}>
                    <div>
                        <p>{member.name}</p>
                    </div>
                </Link>
            )
        })

        return (
            <div>
                <div>
                    <Link to={`/`}>Home</Link>
                </div>
                <div>
                    <h2>Member List</h2>
                </div>
                <div>
				{memberList}
				<Link to='/member/new'>Add New Member</Link>
			</div>
            </div>
        )
    }
}


