import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
				<Link to={`/categorylist/${category.id}/`}>
					<div>
						<h3>{category.name}</h3>			
					</div>
				</Link>
			);
		});
		return (
			<div>
                <div>
                    <Link to={`/`}>Home</Link>
                </div>
                <div><h2>Category List</h2></div>
                {categoryList}
                
				<Link to='/category/new/'>Add New Category</Link>
			</div>
		);
	}
  
}

