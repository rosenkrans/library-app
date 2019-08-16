import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default class Member extends Component {

    state = {
        member: {
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
				{/* <button onClick={this.handleToggleEditForm}>
					{this.state.isEditFormDisplayed
						? "Back to Member"
						: "Edit Member"}
				</button> */}
                <Button variant="primary" className='edit-member-button' onClick={this.handleToggleEditForm}>
                    {this.state.isEditFormDisplayed
                        ? "Back to Member"
                        : "Edit Member"}
				</Button>
                {/* <button onClick={this.handleDelete} className="delete-member-button">Delete Member</button> */}
                <Button variant="primary" className='delete-member-button' onClick={this.handleDelete}>
					Delete Member
				</Button>
                {this.state.isEditFormDisplayed ? (
					// <div>
					// 	<form onSubmit={this.handleSubmit}>
					// 		<div>
					// 			<label htmlFor='member-name'>Name: </label>
					// 			<input
					// 				type='text'
					// 				id='member-name'
					// 				name='name'
					// 				value={this.state.member.name}
					// 				onChange={this.handleChange}
					// 			/>
					// 		</div>
					// 		<div>
					// 			<label htmlFor='phone-number'>Phone Number : </label>
					// 			<input
					// 				type='text'
					// 				id='phone-number'
					// 				name='phone_number'
					// 				value={this.state.member.phone_number}
					// 				onChange={this.handleChange}
					// 			/>
					// 		</div>
					// 		<div>
					// 			<label htmlFor='email'>Email: </label>
					// 			<input
					// 				type='text'
					// 				id='email'
					// 				name='email'
					// 				value={this.state.member.email}
					// 				onChange={this.handleChange}
					// 			/>
					// 		</div>
                    //         <div>
                    //             <label htmlFor='member-expiration-date'>Expiration Date: </label>
                    //             <input
                    //                 type='text'
                    //                 id='member-expiration-date'
                    //                 name='member_expiration_date'
                    //                 value={this.state.member.member_expiration_date}
                    //                 onChange={this.handleChange}
                    //             />
                    //         </div>
					// 		<div>
					// 			<input type='submit' value='Submit' />
					// 		</div>
					// 	</form>
					// </div>

                    <div className='edit-member-form-div'>
                        <Form onSubmit={this.handleSubmit} className='edit-member-form'>
                            <Form.Group controlId="formMemberName">
                            <Form.Label>Member Name</Form.Label>
                            <Form.Control 
                                type='text' 
                                name='name'
                                placeholder="Enter first and last name" 
                                id='member-name'
                                onChange={this.handleChange}
                                value={this.state.member.name}
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
                                value={this.state.member.phone_number}
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
                                value={this.state.member.email}
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
						<h2>Member Name: {this.state.member.name}</h2>
						<p>Phone Number: {this.state.member.phone_number}</p>
						<p>Emaill: {this.state.member.email}</p>
                        <p>Expiration Date: {this.state.member.member_expiration_date}</p>
					</div>
				)}
				{/* <button onClick={this.handleDelete} className="delete-member-button">Delete Member</button> */}
			</div>
		)
    }
}


