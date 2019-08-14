import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom' 
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
        this.setState({
            category: copiedCategory
        })
    }

    handleDelete = () => {
        axios.delete(`/api/v1/categories/${this.state.category.id}/`)
            .then(() => {
                this.setState({redirectToCategories: true})
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.put(`/api/v1/categories/${this.props.match.params.categoryId}/`, this.state.category)
            .then(() => {
                this.setState({
                    isEditFormDisplayed: false
                })
            })
            .then(() => {
                this.getSingleCategory()
            })
    }

    render() {
        if(this.state.redirectToCategories) {
            return <Redirect to='/categorylist'/>
        }

        let bookList = this.state.category.books.map((book) => {
            return(
                <div>
                    <Link to={`/category/${this.props.match.params.categoryId}/book/${book.id}/`}>
                        {book.title}
                    </Link>
                </div>
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
                    <Link to={`/categorylist`}>Categories</Link>
                </div>
                <h1>Single Category</h1>
                <h1>{this.state.category.name}</h1>
                
                <button
                    className='edit-category-button' onClick={this.handleToggleEditForm}>
                    Edit Category
                </button>

                <h3>Books: </h3>
                <div>{bookList}</div>
                <div>
                    <Link to={`/categorylist/${this.props.match.params.categoryId}/book/new/`}>
                        Add New Book
                    </Link>
                </div>
                <div>
                    <input type='button' onClick={this.handleDelete} value='Delete Category'/>
                </div>

            </div>
        )
    }
}

