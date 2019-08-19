import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

export default class Book extends Component {

    state = {
        book: {},
        isEditFormDisplayed: false,
        redirectToBooks: false
    }

    componentDidMount() {
        this.fetchBook()
    }

    fetchBook = () => {
        axios.get(`/api/v1/books/${this.props.match.params.bookId}/`)
            .then(res => {
                this.setState({
                    book: res.data
                })
            })
    }

    handleToggleEditForm = () => {
        this.setState(state => {
            return {isEditFormDisplayed: !state.isEditFormDisplayed}
        })
    }

    handleChange = event => {
        const copiedBook = {...this.state.book}
        copiedBook[event.target.name] = event.target.value 
        this.setState({book: copiedBook})
    }

    handleSubmit = event => {
        event.preventDefault()
        axios.put(`/api/v1/books/${this.state.book.id}/`,
            this.state.book
        )
            .then(() => {
                this.setState({isEditFormDisplayed: false})
            })
            .then(() => {
                this.fetchBook()
            })
    }

    handleDelete = () => {
        if(window.confirm("Are you sure you want to delete?")){ 
        axios.delete(`/api/v1/books/${this.state.book.id}/`)
            .then(() => {
                this.setState({ redirectToBooks: true})
            })
        }
    }


    render() {
        if (this.state.redirectToBooks) {
            return (
                <Redirect to={`/categorylist/${this.props.match.params.categoryId}/`}/>
            )
        }

        return (
            <div>
                <div>                  
                    <Button variant="primary" className='edit-book-button' onClick={this.handleToggleEditForm}>
                        {this.state.isEditFormDisplayed
                            ? "Back to Book"
                            : "Edit Book"}
				    </Button>
  
                    <Button variant="primary" className='delete-book-button' onClick={this.handleDelete}>
					    Delete Book
				    </Button>
                    {this.state.isEditFormDisplayed ? (
                        
                    <div className='edit-book-form-div'>
                        <Form onSubmit={this.handleSubmit} className='edit-book-form'>
                            <Form.Group controlId="formBookTitle">
                            <Form.Label>Book Title</Form.Label>
                            <Form.Control 
                                type='text' 
                                name='title'
                                placeholder="Enter book title" 
                                id='book-name'
                                onChange={this.handleChange}
                                value={this.state.book.title}
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
                                value={this.state.book.author}
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
                                value={this.state.book.isbn}
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
                                value={this.state.book.year_published}
                            />
                            </Form.Group>

                            <Form.Group controlId="formBookCheckedOut">
						    <Form.Label>Checked Out</Form.Label>
						    <Form.Control 
                                type='text' 
                                name='checked_out'
                                placeholder="Enter checked out y/n" 
                                id='checked-out'
                                onChange={this.handleChange}
                                value={this.state.book.checked_out}
						    />
						    </Form.Group>

                            <Form.Group controlId="formBookCheckedOutName">
						    <Form.Label>Member Name</Form.Label>
						    <Form.Control 
                                type='text' 
                                name='checked_out_name'
                                placeholder="Enter member name" 
                                id='checked-out-name'
                                onChange={this.handleChange}
                                value={this.state.book.checked_out_name}
						    />
						    </Form.Group>

                            <Form.Group controlId="formBookDueDate">
						    <Form.Label>Due Date</Form.Label>
						    <Form.Control 
                                type='text' 
                                name='due_date'
                                placeholder="Enter due date" 
                                id='due-date'
                                onChange={this.handleChange}
                                value={this.state.book.due_date}
						    />
						    </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
					    </Form>
                    </div>

                    ) : ( 
                        <div>
                           
                            <div><Link to={`/categorylist/${this.props.match.params.categoryId}/booklist`}>Back to Book List</Link></div>

                            <div className='single-book-table-div'>
                            <Table striped bordered hover size="sm" className="single-book-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>ISBN</th>
                                        <th>Date Published</th>
                                        <th>Checked Out</th>
                                        <th>Member Name</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>                  
                                        <th>{this.state.book.title}</th>
                                        <th>{this.state.book.author}</th>
                                        <th>{this.state.book.isbn}</th>
                                        <th>{this.state.book.year_published}</th>
                                        <th>{this.state.book.checked_out}</th>
                                        <th>{this.state.book.checked_out_name}</th>
                                        <th>{this.state.book.due_date}</th>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>  

                        </div>                   
                    )}
                    
                </div>
            </div>
        )
    }
}

