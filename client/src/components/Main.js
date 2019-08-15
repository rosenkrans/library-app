import React, { Component } from 'react'
import { Link } from 'react-router-dom' 

export default class Main extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Library App</h1>
                </div>
                <div className="category-list-link">
                    <Link to="/categorylist">Category List</Link>
                </div>
                <div className="member-list-link">
                    <Link to="/memberlist">Member List</Link>
                </div>
            </div>
        )
    }
}
