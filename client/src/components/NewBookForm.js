import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Redirect } from 'react-router-dom'

export default class NewBookForm extends Component {

    state = {
        newBook: {
            title: '',
            author: '',
            isbn: '',
            year_published: '',
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
                    <Link to={`/`}>Home</Link>
                </div>
                <div>
                    <h2>New Book Form</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='book-title'>Title: </label>
                        <input
                            type='text'
                            id='book-title'
                            name='title'
                            value={this.state.newBook.title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='author'>Author: </label>
                        <input
                            type='text'
                            id='author'
                            name='author'
                            value={this.state.newBook.author}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='isbn'>ISBN: </label>
                        <input
                            type='text'
                            id='isbn'
                            name='isbn'
                            value={this.state.newBook.isbn}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='year_published'>Year Published: </label>
                        <input
                            type='text'
                            id='year-published'
                            name='year_published'
                            value={this.state.newBook.year_published}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                            <input type='submit' value='Submit' className="submit"/>
                        </div>
                </form>
            </div>
        )
    }
}
