import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import books1 from './images/books1.jpg'

export default class Main extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Library App</h1>
                </div>
                
                <div >
                    <Link to="/categorylist" className="category-list-link">Category List</Link>
                    <Link className="member-list-link" to="/memberlist">Member List</Link>
                </div>
                <div >
                
                </div>
                <div className="main-book-image">
                    <img width={500} src={books1}/>
                </div>
            </div>
        )
    }
}
