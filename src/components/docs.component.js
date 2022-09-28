import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserService from "../services/user.service";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import AddTutorial from "./add-tutorial.component";
import Tutorial from "./tutorial.component";
import TutorialsList from "./tutorials-list.component";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: ""
        };
    }
    componentDidMount() {
        console.log(this.props)
        UserService.getUsers().then(users => {
            this.setState({
                users: users.data
            });

        })

    }

    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/tutorials"} className="navbar-brand">
                        تطبيق الإرساليات
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/tutorials"} className="nav-link">
                                المراسلات
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                إرسال
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/tutorials"]} component={() => <TutorialsList users={this.state.users} />} />
                        <Route exact path="/add" component={() => <AddTutorial users={this.state.users} />} />
                        <Route path="/tutorials/:id" component={Tutorial} />
                    </Switch>
                </div>
            </Router>
        );
    }
}


export default (App);
