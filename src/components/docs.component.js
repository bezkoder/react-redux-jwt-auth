import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import AddTutorial from "./add-tutorial.component";
import Tutorial from "./tutorial.component";
import TutorialsList from "./tutorials-list.component";

class App extends Component {
    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/tutorials"} className="navbar-brand">
                        bezKoder
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/tutorials"} className="nav-link">
                                Tutorials
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
                        <Route exact path="/add" component={AddTutorial} />
                        <Route path="/tutorials/:id" component={Tutorial} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
