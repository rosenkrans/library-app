import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Category from "./components/Category";
import CategoryList from "./components/CategoryList";
import Book from "./components/Book";
import Member from "./components/Member";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>Library</h1>
                        <div>
                            <div><Link to="/">Category List</Link></div>
                        </div>
                    </div>

                    <Switch>
                      <Route exact path="/" component={CategoryList}/>
                      <Route path="/category/:categoryId" component={Category}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

