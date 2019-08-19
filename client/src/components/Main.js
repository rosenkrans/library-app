import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import books1 from './images/books1.jpg'

export default class Main extends Component {
    render() {
        return (
            <div id="main-page-body">
                <div className="main-page-top">
                    <div className="main-header-div">
                        <h1>LIBRARY APP</h1>
                    </div>
                    
                    <div className="main-links-div">
                        <Link to="/categorylist" className="category-list-link"><b>Category List</b></Link>
                        <Link className="member-list-link" to="/memberlist"><b>Member List</b></Link>
                    </div>
                </div>
            </div>
        )
    }
}
