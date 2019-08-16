import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom' 
import Table from 'react-bootstrap/Table'
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
                    </tr>
                
            )
        })

        return this.state.isEditFormDisplayed ? (
            <form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor='category-name'>Category: </label>
					<input
						type='text'
						name='name'
						id='category-name'
						onChange={this.handleChange}
						value={this.state.category.name}
					/>
				</div>

				<input type='submit' value='Submit' />
			</form>
        ) : (
            <div>
                <div>
                    <Link to={`/categorylist`}>Back to Categories List</Link>
                </div>
                {/* <h1>Single Category</h1> */}
                <h1>{this.state.category.name}</h1>
                
                <button
                    className='edit-category-button' onClick={this.handleToggleEditForm}>
                    Edit Category
                </button>
                <input type='button' onClick={this.handleDelete} value='Delete Category' className='delete-category-button'/>
                <h3 className="book-title-header">Book Titles: </h3>

                <Table striped bordered hover size="sm" className="book-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Year Published</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookList}
                    </tbody>
                </Table>


                {/* <div>{bookList}</div> */}


                <div className="add-book-link">
                    <Link to={`/categorylist/${this.props.match.params.categoryId}/book/new/`}>
                        {/* <button type="button" className="btn add-new-book-button"> */}
                        Add New Book
                        {/* </button> */}
                    </Link>
                </div>
                
                {/* <div className="delete-category-button-div">
                    <input type='button' onClick={this.handleDelete} value='Delete Category' className='delete-category-button'/>
                </div> */}

            </div>
        )
    }
}

