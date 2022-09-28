import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import AddTutorial from "./components/add-tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import UserService from "../src/services/user.service"



import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import logo from "./assets/logo.png"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      UserService.getUserInfo(user).then((info) => {
        if (info) {
          user.info = info.data.user
          this.setState({
            info: info.data.user
          })
        }

      })
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });

      UserService.getUsers().then(users => {
        this.setState({
          users: users.data
        });

      })
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser,
      showModeratorBoard,
      showAdminBoard, info
    } = this.state;


    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand white ">
            <div className="logo-img">
              <img src={logo} className="logo" alt="" />
            </div>

            <Link to={"/"} className="navbar-brand">
              منصة المستخدمين
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/home"} className="nav-link">
                  الرئيسية
                </Link>
              </li>

              {showModeratorBoard && (

                <li className="nav-item">
                  <Link to={"/TutorialsList"} className="nav-link">
                    المراسلات
                  </Link>

                </li>

              )}
              {showModeratorBoard && (

                <li className="nav-item">
                  <Link to={"/AddTutorial"} className="nav-link">
                    إرسال
                  </Link>
                </li>

              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    البطاقة الشخصية
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    الخروج
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    دخول
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    التسجيل
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              {info &&
                <Route exact path="/profile" component={Profile} />}
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/TutorialsList" component={TutorialsList} />
              <Route path="/AddTutorial" component={() => <AddTutorial users={this.state.users} />} />


              {/* <Route path="/tutorials" component={Tutorials} /> */}
            </Switch>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(App);
