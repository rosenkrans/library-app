import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Category from "./components/Category";
import CategoryList from "./components/CategoryList";
import NewCategoryForm from "./components/NewCategoryForm";
import MemberList from "./components/MemberList";
import NewMemberForm from "./components/NewMemberForm";
import Member from "./components/Member";
import NewBookForm from "./components/NewBookForm";
import Book from "./components/Book";
import Main from "./components/Main";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                      <Route exact path="/" component={Main}/>
                      <Route path="/categorylist/:categoryId/booklist/:bookId" component={Book}/>
                      <Route path="/categorylist/:categoryId/book/new" component={NewBookForm}/>
                      <Route path="/categorylist/:categoryId" component={Category}/> 
                      <Route path="/categorylist" component={CategoryList}/>
                      <Route path="/category/new" component={NewCategoryForm}/>
                      <Route path="/memberlist/:memberId" component={Member}/>
                      <Route path="/memberlist" component={MemberList}/>
                      <Route path="/member/new" component={NewMemberForm}/>                                        
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

