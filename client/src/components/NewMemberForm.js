import React, { Component } from 'react'
import axios from 'axios' 
import { Redirect } from 'react-router-dom'

export default class NewMemberForm extends Component {

    state = {
        newMember: {
            name: "",
            phone_number: "",
            email: "",
            membership_expire_date: ""
        },
        redirectToMembers: false 
    }

    handleChange = event => {
        const copiedNewMember = { ...this.state.newMember };
        copiedNewMember[event.target.name] = event.target.value;
        this.setState({ newMember: copiedNewMember });
    }

    hangleSubmit = event => {
        event.preventDefault();
        axios.post(`/api/v1/members/`, this.state.newMember).then(() => {
            this.setState({
                newMember: {
                    name: "",
                    phone_number: "",
                    email: "",
                    membership_expire_date: ""
                },
                redirectToMembers: true 
            })
        })
    }

    render() {
        if (this.state.redirectToMembers) {
            return <Redirect to={`/memberlist`}/>;
        }
        return (
            <div>
                <div>
                    <h2>New Member Form</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    {/* <div>
                        <h2>Member Form</h2>
                    </div> */}
					<div>
						<label htmlFor='member-name'>Member Name: </label>
						<input
							type='text'
							id='member-name'
							name='name'
							value={this.state.newMember.name}
							onChange={this.handleChange}
						/>
                    </div>
                    <div>
                        <label htmlFor='phone-number'>Phone Number: </label>
                        <input
                            type='text'
                            id='phone-number'
                            name='phone_number'
                            value={this.state.newMember.phone_number}
                            onChange={this.handleChange}
                        />
					</div>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            value={this.state.newMember.email}
                            onchange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='member-expiration'>Member Expiration: </label>
                        <input 
                            type='text'
                            id='member-expiration'
                            name='member_expiration'
                            value={this.state.newMember.membership_expire_date} 
                            onChange={this.handleChange}
                        />
                    </div>
					
					<div>
						<input type='submit' value='Submit' />
					</div>
				</form>
            </div>
        )
    }
}
