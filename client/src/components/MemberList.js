import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
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
                <tr key={member.id}>                  
                    <th><Link to={`/memberlist/${member.id}/`}>{member.name}</Link></th>
                    <th>{member.email}</th>
                    <th>{member.phone_number}</th>
                    <th>{member.member_expiration_date}</th>
                </tr>
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
                
                <Table striped bordered hover size="sm" className="member-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Expiration Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberList}
                    </tbody>
                </Table>

                <div>
				    <Link to='/member/new'>Add New Member</Link>
			    </div>
                
            </div>
        )
    }
}


