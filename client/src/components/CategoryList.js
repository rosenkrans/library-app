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
                <tr>
                    <th><Link to={`/categorylist/${category.id}/`}>{category.name}</Link></th>

                </tr>
			);
		});
		return (
			<div className="category-list-page">
                <div>
                    {/* <Link to={`/`}><button type="button">Home</button></Link> */}
                    <Link to={`/`}>Home</Link>
                </div>
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
				    {/* <Link to='/category/new/'><button type="button">Add New Category</button></Link> */}
                    <Link to='/category/new/'>Add New Category</Link>
                </div>
            </div>
		);
	}
}

