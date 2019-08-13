import React, { Component } from 'react'
import { Link } from 'react-router-dom' 

export default class Main extends Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Library App</h1>
                </div>
                <div>
                    <Link to="/categorylist">Category List</Link>
                </div>
                <div>
                    <Link to="/memberlist">Member List</Link>
                </div>
            </div>
        )
    }
}
