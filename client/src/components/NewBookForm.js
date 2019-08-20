import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class NewBookForm extends Component {

    state = {
        newBook: {
            title: '',
            author: '',
            isbn: '',
            year_published: '',
            checked_out: '',
            category: this.props.match.params.categoryId
        },
        redirectToBooks: false
    }

    handleChange = event => {
        const copiedNewBook = {...this.state.newBook}
        copiedNewBook[event.target.name] = event.target.value 
        this.setState({newBook: copiedNewBook})
    }

    handleSubmit = event => {
        event.preventDefault()
        axios.post(`/api/v1/books/`, this.state.newBook).then(() => {
            this.setState({
                newBook: {
                    title: '',
                    author: '',
                    isbn: '',
                    year_published: '',
                    checked_out: '',
                    category: this.props.match.params.categoryId 
                },
                redirectToBooks: true
            })
        })
    }


    render() {
        if (this.state.redirectToBooks) {
            return <Redirect to={`/categorylist/${this.props.match.params.categoryId}`}/>
        }
        return (
            <div>
                <div>
                    <Link to={`/categorylist/${this.props.match.params.categoryId}/booklist`}>Back to Book List</Link>
                </div>
                <div>
                    <h2 className='new-book-form-header'>New Book Form</h2>
                </div>
                
                <div className='new-book-form-div'>
                    <Form onSubmit={this.handleSubmit} className='new-book-form'>
						<Form.Group controlId="formBookTitle">
						<Form.Label>Book Title</Form.Label>
						<Form.Control 
							type='text' 
							name='title'
							placeholder="Enter book title" 
							id='book-name'
							onChange={this.handleChange}
							value={this.state.newBook.title}
						/>
						</Form.Group>

                        <Form.Group controlId="formBookAuthor">
						<Form.Label>Book Author</Form.Label>
						<Form.Control 
							type='text' 
							name='author'
							placeholder="Enter author name" 
							id='author-name'
							onChange={this.handleChange}
							value={this.state.newBook.author}
						/>
						</Form.Group>

                        <Form.Group controlId="formBookISBN">
						<Form.Label>ISBN</Form.Label>
						<Form.Control 
							type='text' 
							name='isbn'
							placeholder="Enter ISBN" 
							id='isbn'
							onChange={this.handleChange}
							value={this.state.newBook.isbn}
						/>
						</Form.Group>

                        <Form.Group controlId="formBookYearPublished">
						<Form.Label>Year Published</Form.Label>
						<Form.Control 
							type='text' 
							name='year_published'
							placeholder="Enter year published" 
							id='year-published'
							onChange={this.handleChange}
							value={this.state.newBook.year_published}
						/>
						</Form.Group>

                        <Form.Group controlId="formBookCheckedOut">
						<Form.Label>Checked Out</Form.Label>
						<Form.Control 
							type='text' 
							name='checked_out'
							placeholder="Enter checked out Y/N" 
							id='checked-out'
							onChange={this.handleChange}
							value={this.state.newBook.checked_out}
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
