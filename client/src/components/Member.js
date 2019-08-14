import React, { Component } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

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
        axios.put(`/api/v1/members/${this.state.member.memberId}/`
            this.state.member 
        )
            .then(() => {
                this.setState({ isEditFormDisplayed: false })
            })
    }

    handleDelete = () => {
        axios.delete(`/api/v1/members/${this.state.member.memberId}/`)
            .then(() => {
                this.setState({ redirectToMembers: true })
            })
    }

    render() {
        if (this.state.redirectToMembers) {
            return (
                <Redirect to={`/memberlist`}/>
            )
        }

        return (
            <div>
				<button onClick={this.handleToggleEditForm}>
					{this.state.isEditFormDisplayed
						? "Back to Member"
						: "Edit Member"}
				</button>
				{this.state.isEditFormDisplayed ? (
					<div>
						<form onSubmit={this.handleSubmit}>
							<div>
								<label htmlFor='member-name'>Name: </label>
								<input
									type='text'
									id='member-name'
									name='name'
									value={this.state.member.name}
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor='phone-number'>Phone Number : </label>
								<input
									type='text'
									id='phone-number'
									name='phone_number'
									value={this.state.member.phone_number}
									onChange={this.handleChange}
								/>
							</div>
							<div>
								<label htmlFor='email'>Email: </label>
								<input
									type='text'
									id='email'
									name='email'
									value={this.state.member.email}
									onChange={this.handleChange}
								/>
							</div>
                            <div>
                                <label htmlFor='member-expiration-date'>Expiration Date: </label>
                                <input
                                    type='text'
                                    id='member-expiration-date'
                                    name='member_expiration_date'
                                    value={this.state.member.member_expiration_date}
                                    onChange={this.handleChange}
                                />
                            </div>
							<div>
								<input type='submit' value='Submit' />
							</div>
						</form>
					</div>
				) : (
					<div>
						<h2>{this.state.member.name}</h2>
						<p>{this.state.member.phone_number}</p>
						<p>{this.state.member.email}</p>
                        <p>{this.state.member.member_expiration_date}</p>
					</div>
				)}
				<button onClick={this.handleDelete}>Delete Member</button>
			</div>
		)
        

    }
}


