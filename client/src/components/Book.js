import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export default class Book extends Component {

    state = {
        book: {
            title: '',
            author: '',
            isbn: '',
            year_published: ''
        },
        isEditFormDisplayed: false,
        redirectToBooks: false
    }

    componentDidMount() {
        this.fetchBook()
    }

    fetchBook = () => {
        axios.get(`/api/v1/categories/${this.props.match.params.categoryId}/books/${this.props.match.params.bookId}/`)
            .then(res => {
                this.setState({
                    book: res.data
                })
            })
    }

    handleToggleEditForm = () => {
        this.setState(state => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = event => {
        const copiedBook = {...this.state.book}
        copiedBook[event.target.name] = event.target.value 
        this.setState({ book: copiedBook })
    }

    handleSubmit = event => {
        event.prevendDefault()
        axios.put(`/api/v1/categories/${this.props.match.params.categoryId}/books/${this.state.book.bookId}/`,
            this.state.book
        )
            .then(() => {
                this.setState({ isEditFormDisplayed: false })
            })
    }

    handleDelete = () => {
        axios.delete(`/api/v1/categories/${this.props.match.params.categoryId}/books/${this.state.book.bookId}`)
            .then(() => {
                this.setState({ redirectToBooks: true})
            })
    }


    render() {
        if (this.state.redirectToBooks) {
            return (
                <Redirect to={`/categorylist/:categoryId/booklist/:bookId`}/>
            )
        }


        return (
            <div>
                <div>
                    <h2>Single Book</h2>
                </div>

                <div>
                    <button onClick={this.handleToggleEditForm}>
                        {this.state.isEditFormDisplayed
                            ? "Back to Book"
                            : "Edit Book"}
                    </button>
                    {this.state.isEditFormDisplayed ? (
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <label htmlFor='book-title'>Title: </label>
                                    <input
                                        type='text'
                                        id='book-title'
                                        name='title'
                                        value={this.state.book.title}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='author'>Author: </label>
                                    <input 
                                        type='text'
                                        id='author'
                                        name='author'
                                        value={this.state.book.author}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='isbn'>ISBN: </label>
                                    <input
                                        type='text'
                                        id='isbn'
                                        name='isbn'
                                        value={this.state.book.isbn}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='year-published'>Year Published: </label>
                                    <input 
                                        type='text'
                                        id='year-published'
                                        name='year_published'
                                        value={this.state.book.year_published}
                                    />
                                </div>

                                <div>
                                    <input type='submit' value='Submit'/>
                                </div>
                            </form>
                        </div>
                    ) : ( 
                        <div>
                            <h2>{this.state.book.title}</h2>
                            <h3>{this.state.book.author}</h3>
                            <p>{this.state.book.isbn}</p>
                            <p>{this.state.book.year_published}</p>
                        </div>                   
                    )}
                    <button onClick={this.handleDelete}>Delete Book</button>
                </div>
            </div>
        )
    }
}

