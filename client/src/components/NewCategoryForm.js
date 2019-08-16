import React, { Component } from "react"
import axios from "axios"
import { Redirect, Link } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class NewCategoryForm extends Component {
	state = {
		newCategory: {
			name: ''
		},
		redirectToCategories: false
	};

	handleChange = event => {
		const copiedNewCategory = {...this.state.newCategory};
		copiedNewCategory[event.target.name] = event.target.value;
		this.setState({ newCategory: copiedNewCategory });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios.post(`/api/v1/categories/`, this.state.newCategory).then(() => {
			this.setState({
				newCategory: {
					name: ''
				},
				redirectToCategories: true
			});
		});
	};

	render() {
		if (this.state.redirectToCategories) {
			return <Redirect to={`/categorylist`} />;
		}
		return (
			<div>
				<div>
                    <Link to={`/categorylist`}>Back to Categories</Link>
                </div>
				<form onSubmit={this.handleSubmit}>
                    <div>
                        <h2 className='new-category-form-header'>New Category Form</h2>
                    </div>
					{/* <div>
						<label htmlFor='category-name'>Category Name: </label>
						<input
							type='text'
							name='name'
							id='category-name'
							onChange={this.handleChange}
							value={this.state.newCategory.name}
						/>
					</div> */}
					
					{/* <div>
						<input type='submit' value='Submit' className='submit'/>
					</div> */}
				</form>
				<div className='new-category-form-div'>
					<Form onSubmit={this.handleSubmit} className='new-category-form'>
						<Form.Group controlId="formBasicEmail">
						{/* <Form.Label>Category Name</Form.Label> */}
						<Form.Control 
							type='text' 
							name='name'
							placeholder="Enter category name" 
							id='category-name'
							onChange={this.handleChange}
							value={this.state.newCategory.name}
						/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}

