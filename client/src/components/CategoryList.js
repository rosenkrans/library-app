import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

export default class CategoryList extends Component {

    state = {
        categories: []
    }

    componentDidMount() {
        this.getAllCategories()
    }

    getAllCategories = () => {
        axios.get("/api/v1/categories/")
            .then(res => {
                this.setState({ categories: res.data})
            })
            .catch(err => {
                this.setState({ error: err.message})
            })
    }

    render() {
		let categoryList = this.state.categories.map(category => {
			return (
                <tr key={category.id}>
                    <th><Link to={`/categorylist/${category.id}/`}>{category.name}</Link></th>

                </tr>
			);
		});
		return (
			<div className="category-list-page">
                <div>
                    <Link to={`/`}>Home</Link>
                </div>

                <div className="search-isbn-link">
                    <Link to='/categorylist/searchISBN/'>Search Book Info By ISBN</Link>
                </div>

                {/* <div className="search-subject-link">
                    <Link to='/categorylist/searchSubject/'>Search Book Info By Subject</Link>
                </div> */}

                <div className="category-list-header"><h2>Category List</h2></div>
                               
                <div className="category-table-div">
                    <Table striped bordered hover size="sm" className="category-table">
                        <thead>
                            <tr>
                                {/* <th>Categories</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {categoryList}
                        </tbody>
                    </Table>
                </div>
                <div className="add-category-button">
                    <Link to='/category/new/'>Add New Category</Link>
                </div>
            </div>
		);
	}
}

