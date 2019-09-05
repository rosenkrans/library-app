import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

export default class SubjectForm extends Component {

    state = {
        searchSubject: '',
        subject: {
            key: '',
            name: '',
            subject_type: '',
            work_count: '',
            works: [
                {
                    key: '',
                    title: '',
                    edition_count: '',
                    authors: [
                        {
                            name: '',
                            key: ''
                        }
                    ],
                    has_fulltext: true,
                    ia: '',
                },
                
            ]
        },
        redirectToSubjectForm: false
    }

    handleChange = (event) => {
        this.setState({ searchSubject: event.target.value })
    }

    fetchSubject = (event) => {
        event.preventDefault()  
        axios.get(`https://openlibrary.org/api/subjects/${this.state.searchSubject}`)
            .then(res => {
                // let test = JSON.stringify(res.data)
                // console.log(test)
                let data = res.data
                console.log(res.data)
                // let parsedData = JSON.parse(data.substring(data.indexOf("{"), data.lastIndexOf("}") + 1))
                // console.log(typeof parsedData)
                // let stringData = JSON.stringify(parsedData)
                // console.log(stringData)
                // let resultKeys = Object.keys

                if(res.data) {
                    this.setState({
                        subject: res.data[0],
                    })
                } else (window.alert("CANNOT GET BOOK INFORMATION FROM THAT SUBJECT"))

                // if(Object.keys(parsedData).length !== 0) {
                //     this.setState({
                //         isbn: Object.values(parsedData)[0],
                //     })
                // } else (window.alert("CANNOT GET BOOK INFORMATION FROM THAT ISBN"))
            })
            .catch(err => {
                window.alert("CANNOT GET BOOK INFORMATION FROM THAT SUBJECT")
                
                console.log(err);
                this.setState({redirectToSubjectForm: true})
                
            })
           
    }


    render() {
        if(this.state.redirectToSubjectForm) {
            return <Redirect to='/categorylist/searchSubject'/>
        }
        return (
            <div>
                <div>
                    <Link to={`/categorylist`}>Back to Categories List</Link>
                </div>

                <div>
                    <h2>Subject Search Form TEST</h2>
                </div>

                <div className='subject-search-form-div'>
                    <Form onSubmit={this.fetchSubject} className='subject-search-form'>
                        <Form.Group>
                        <Form.Label>TEST</Form.Label>
                        <Form.Control 
                            type='text' 
                            name='subject'
                            placeholder="Enter Subject" 
                            id='subject-search'
                            onChange={this.handleChange}
                            value={this.state.searchSubject.subject}
                        />
                        </Form.Group>

                        <Button variant="primary" type="submit">
							Submit
						</Button>
                    </Form>
                </div>

               

                <div className="category-table-div">
                    <Table striped bordered hover size="sm" className="category-table">
                        <thead>
                            <tr>
                                <th className='subject-key-th'>Key</th>
                                <th>Name</th>
                                <th>Subject Type</th>
                                <th>Work Count</th>
                                <th>Works</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            <tr>
                                <td className='subject-key-td'>{this.state.subject.key}</td>
                                <td>{this.state.subject.name}</td>
                                <td>{this.state.subject.subject_type}</td>
                                <td>{this.state.subject.work_count}</td>
                                <td>{this.state.subject.works}</td>
                            </tr>
                            
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}
