import React, { Component } from 'react'
import axios from 'axios' 
import { Redirect, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class NewMemberForm extends Component {

    state = {
        newMember: {
            name: '',
            phone_number: '',
            email: '',
            member_expiration_date: ''
        },
        redirectToMembers: false 
    }

    handleChange = event => {
        const copiedNewMember = { ...this.state.newMember };
        copiedNewMember[event.target.name] = event.target.value;
        this.setState({ newMember: copiedNewMember });
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post(`/api/v1/members/`, this.state.newMember).then(() => {
            this.setState({
                newMember: {
                    name: '',
                    phone_number: '',
                    email: '',
                    member_expiration_date: ''
                },
                redirectToMembers: true 
            });
        });
    };

    render() {
        if (this.state.redirectToMembers) {
            return <Redirect to={`/memberlist`}/>;
        }
        return (
            <div>
                <div>
                    <Link to={`/memberlist`}>Back to Member List</Link>
                </div>
                <div>
                    <h2 className='new-member-form-header'>New Member Form</h2>
                </div>

                <div className='new-member-form-div'>
                    <Form onSubmit={this.handleSubmit} className='new-member-form'>
						<Form.Group controlId="formMemberName">
						<Form.Label>Member Name</Form.Label>
						<Form.Control 
							type='text' 
							name='name'
							placeholder="Enter first and last name" 
							id='member-name'
							onChange={this.handleChange}
							value={this.state.newMember.name}
						/>
						</Form.Group>

                        <Form.Group controlId="formMemberPhoneNumber">
						<Form.Label>Member Phone Number</Form.Label>
						<Form.Control 
							type='text' 
							name='phone_number'
							placeholder="Enter phone number" 
							id='phone-number'
							onChange={this.handleChange}
							value={this.state.newMember.phone_number}
						/>
						</Form.Group>

                        <Form.Group controlId="formMemberEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control 
							type='text' 
							name='email'
							placeholder="Enter email address" 
							id='email'
							onChange={this.handleChange}
							value={this.state.newMember.email}
						/>
						</Form.Group>

                        <Form.Group controlId="formMemberExpirationDate">
						<Form.Label>Member Expiration Date</Form.Label>
						<Form.Control 
							type='text' 
							name='member_expiration_date'
							placeholder="Enter member expiration date" 
							id='member-expiration-date'
							onChange={this.handleChange}
							value={this.state.newMember.member_expiration_date}
						/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
                </div>

            </div>
        )
    }
}
