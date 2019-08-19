import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

export default class Member extends Component {

    state = {
        member: {
            id: '',
            name: '',
            phone_number: '',
            email: '',
            member_expiration_date: ''
        },
        isEditFormDisplayed: false,
        redirectToMembers: false
    }

    componentDidMount() {
        this.fetchMember()
    }

    fetchMember = () => {
        axios.get(`/api/v1/members/${this.props.match.params.memberId}/`)
            .then(res => {
                this.setState({
                    member: res.data
                })
            })
    }

    handleToggleEditForm = () => {
        this.setState(state => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = event => {
        const copiedMember = {...this.state.member }
        copiedMember[event.target.name] = event.target.value 
        this.setState({ member: copiedMember })
    }

    handleSubmit = event => {
        event.preventDefault()
        axios.put(`/api/v1/members/${this.state.member.id}/`,
            this.state.member 
        )
            .then(() => {
                this.setState({ isEditFormDisplayed: false })
            })
    }

    handleDelete = () => {
        if(window.confirm("Are you sure you want to delete?")){ 
        axios.delete(`/api/v1/members/${this.state.member.id}/`)
            .then(() => {
                this.setState({ redirectToMembers: true })
            })
        }
    }

    render() {
        if (this.state.redirectToMembers) {
            return (
                <Redirect to={`/memberlist`}/>
            )
        }

        return (
            <div>
                <Button variant="primary" className='edit-member-button' onClick={this.handleToggleEditForm}>
                    {this.state.isEditFormDisplayed
                        ? "Back to Member"
                        : "Edit Member"}
				</Button>
            
                <Button variant="primary" className='delete-member-button' onClick={this.handleDelete}>
					Delete Member
				</Button>
                {this.state.isEditFormDisplayed ? (

                    <div className='edit-member-form-div'>
                        <Form onSubmit={this.handleSubmit} className='edit-member-form'>
                            <Form.Group>
                            <Form.Label>Member Name</Form.Label>
                            <Form.Control 
                                type='text' 
                                name='name'
                                placeholder="Enter first and last name" 
                                id='name'
                                onChange={this.handleChange}
                                value={this.state.member.name}
                            />
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Member Phone Number</Form.Label>
                            <Form.Control 
                                type='text' 
                                name='phone_number'
                                placeholder="Enter phone number" 
                                id='phone-number'
                                onChange={this.handleChange}
                                value={this.state.member.phone_number}
                            />
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type='text' 
                                name='email'
                                placeholder="Enter email address" 
                                id='email'
                                onChange={this.handleChange}
                                value={this.state.member.email}
                            />
                            </Form.Group>

                            <Form.Group>
                            <Form.Label>Member Expiration Date</Form.Label>
                            <Form.Control 
                                type='text' 
                                name='member_expiration_date'
                                placeholder="Enter member expiration date" 
                                id='member-expiration-date'
                                onChange={this.handleChange}
                                value={this.state.member.member_expiration_date}
                            />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>

				) : (
					<div>
                        <div className="back-to-member-list-div">
                            <Link to={`/memberlist`}>Back to Member List</Link>
                        </div>
				
                        <div className='single-member-table-div'>
                            <Table striped bordered hover size="sm" className="single-member-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Expiration Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>{this.state.member.id}</th>             
                                        <th>{this.state.member.name}</th>
                                        <th>{this.state.member.email}</th>
                                        <th>{this.state.member.phone_number}</th>
                                        <th>{this.state.member.member_expiration_date}</th>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

					</div>
				)}
			</div>
		)
    }
}


