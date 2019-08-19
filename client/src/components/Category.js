import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom' 
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios' 

export default class Category extends Component {

    state = {
        category: {
            books: []
        },
        isEditFormDisplayed: false,
        redirectToCategories: false
    }

    componentDidMount() {
        this.getSingleCategory()
    }

    getSingleCategory = () => {
        axios.get(`/api/v1/categories/${this.props.match.params.categoryId}/`)
            .then((res) => {
                this.setState({
                    category: res.data
                })
            })
    }

    handleToggleEditForm = () => {
        this.setState(state => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    handleChange = (event) => {
        let copiedCategory = {...this.state.category}
        copiedCategory[event.target.name] = event.target.value 
        this.setState({category: copiedCategory})
    }

    // create a handle sort method
    // create a copy of the array for sorting to not update state directly


    handleSubmit = (event) => {
        event.preventDefault()
        axios.put(`/api/v1/categories/${this.state.category.id}/`, 
            this.state.category
        )
            .then(() => {
                this.setState({isEditFormDisplayed: false})
            })
            .then(() => {
                this.getSingleCategory()
            })
    }

    handleDelete = () => {
        if(window.confirm("Are you sure you want to delete?")){ 
        axios.delete(`/api/v1/categories/${this.state.category.id}/`)
            .then(() => {
                this.setState({redirectToCategories: true})
            })
        }
    }

    render() {
        if(this.state.redirectToCategories) {
            return <Redirect to='/categorylist'/>
        }

        let bookList = this.state.category.books.map((book) => {
            return(
                
                    <tr>
                        <th><Link to={`/categorylist/${this.props.match.params.categoryId}/booklist/${book.id}/`}>{book.title}</Link></th>
                        <th>{book.author}</th>
                        <th>{book.isbn}</th>
                        <th>{book.year_published}</th>
                        <th>{book.checked_out}</th>
                        <th>{book.checked_out_name}</th>
                        <th>{book.due_date}</th>
                    </tr>
                
            )
        })
        
        return this.state.isEditFormDisplayed ? (
            
            <div className='edit-category-form-div'>
					<Form onSubmit={this.handleSubmit} className='edit-category-form'>
						<Form.Group controlId="formCategoryEditForm">
                        <Form.Label>Category Name</Form.Label>
						<Form.Control 
							type='text' 
							name='name'
							placeholder="Enter category name" 
							id='category-name'
							onChange={this.handleChange}
							value={this.state.category.name}
						/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</div>

        ) : (
            <div>
                <div>
                    <Link to={`/categorylist`}>Back to Categories List</Link>
                </div>
                <h1>{this.state.category.name}</h1>
                
                <Button variant="primary" className='edit-category-button' onClick={this.handleToggleEditForm}>
					Edit Category
				</Button>
    
                <Button variant="primary" className='delete-category-button' onClick={this.handleDelete}>
					Delete Category
				</Button>
                <h3 className="book-title-header">Book Titles: </h3>

                <Table striped bordered hover size="sm" className="book-table">
                    <thead>
                        <tr>
                            {/* create a button in title header with an onClick to call handleSort */}
                            <th>Title </th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Year Published</th>
                            <th>Checked Out</th>
                            <th>Member Name</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookList}
                    </tbody>
                </Table>

                <div className="add-book-link">
                    <Link to={`/categorylist/${this.props.match.params.categoryId}/book/new/`}>
                        Add New Book
                    </Link>
                </div>

            </div>
        )
    }
}



