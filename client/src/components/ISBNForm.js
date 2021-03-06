import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

export default class ISBNForm extends Component {

    state = {
        searchISBN: '',
        isbn: {
            bib_key: '',
            info_url: '',
            preview: '',
            preview_url: '',
            thumbnail_url: ''
        },
        redirectToISBNForm: false
    }

    handleChange = (event) => {
        this.setState({ searchISBN: event.target.value })
    }

    fetchISBN = (event) => {
        event.preventDefault()  
        axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${this.state.searchISBN}`)
            .then(res => {
                
                let data = res.data
                
                let parsedData = JSON.parse(data.substring(data.indexOf("{"), data.lastIndexOf("}") + 1))
                console.log(typeof parsedData)
                
                let resultKeys = Object.keys

                if(Object.keys(parsedData).length !== 0) {
                    this.setState({
                        isbn: Object.values(parsedData)[0],
                    })
                } else (window.alert("CANNOT GET BOOK INFORMATION FROM THAT ISBN"))
            })
            .catch(err => {
                
                
                console.log(err);
                this.setState({redirectToISBNForm: true})
                
            })
           
    }


    render() {
        if(this.state.redirectToISBNForm) {
            return <Redirect to='/categorylist/searchISBN'/>
        }
        return (
            <div>
                <div>
                    <Link to={`/categorylist`}>Back to Categories List</Link>
                </div>

                <div>
                    <h2>ISBN Search Form</h2>
                </div>

                <div className='isbn-search-form-div'>
                    <Form onSubmit={this.fetchISBN} className='isbn-search-form'>
                        <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control 
                            type='text' 
                            name='isbn'
                            placeholder="Enter ISBN" 
                            id='isbn-search'
                            onChange={this.handleChange}
                            value={this.state.searchISBN.isbn}
                        />
                        </Form.Group>

                        <Button variant="primary" type="submit">
							Submit
						</Button>
                    </Form>
                </div>

                <div className='book-image'>
                  
                    <img src={this.state.isbn.thumbnail_url} width='100'/>
                </div>

                <div className="category-table-div">
                    <Table striped bordered hover size="sm" className="category-table">
                        <thead>
                            <tr>
                                <th className='bib-key-th'>Bib Key</th>
                                <th>Info URL</th>
                                <th>Preview</th>
                                <th>Preview URL</th>
                            
                            </tr>
                            
                        </thead>
                        <tbody>
                            <tr>
                                <td className='bib-key-td'>{this.state.isbn.bib_key}</td>
                                <td><a href={this.state.isbn.info_url} target='_blank'>{this.state.isbn.info_url}</a></td>
                                <td>{this.state.isbn.preview}</td>
                                <td><a href={this.state.isbn.preview_url} target='_blank'>{this.state.isbn.preview_url}</a></td>
                            </tr>
                            
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}
