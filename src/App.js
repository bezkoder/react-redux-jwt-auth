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
import TutotialDetails from "./components/tutorial.detail.component"
import MenuComponent from "./components/menu.component";
import UserService from "../src/services/user.service"
import AuthVerify from "./common/auth-verify";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';
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
      info
    } = this.state;
    console.log(currentUser)

    return (
      <Router history={history}>
        <div>
          {/* navbar start section */}
          <div className="header">
            <div class="container">
              <div className="logo-section">
                <img src={logo} className="logo" alt="" />
                <Link to={"/"} className="NameLogo">
                  منصة البريد الداخلي
                </Link>
              </div>
              <ul class="main-nav">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    الرئيسية
                  </Link>
                </li>
                {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to={"/TutorialsList"} className="nav-link">
                      المراسلات
                      <i class="material-icons">article</i></Link>
                  </li>
                )}
                {showModeratorBoard && (
                  <li className="nav-item">
                    <Link to={"/AddTutorial"} className="nav-link">
                      مراسلة جديدة
                      <i class="material-icons">assignment_add</i></Link>

                  </li>
                )}
                {currentUser ? (
                  <div className="nav-item  ">
                    <li id="menu">
                      <i class="material-icons md-48 ">account_circle</i>
                      <MenuComponent currentUser={currentUser} logOut={this.logOut} />
                    </li>

                  </div>




                ) : (
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      الدخول
                      <i class="material-icons">login</i></Link>
                  </li>
                )}
                {currentUser ? (
                  ""
                  // <span className="nav-item">
                  //   <a href="/login" className="nav-link" onClick={this.logOut}>
                  //     <i class="material-icons">logout</i></a>
                  // </span>

                ) : (
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      التسجيل
                      <i class="material-icons">app_registration</i></Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          {/* navbar end section */}



          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              {info && <Route exact path="/profile" component={Profile} />}
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/TutorialsList" component={TutorialsList} />
              <Route path="/AddTutorial" component={() => <AddTutorial users={this.state.users} />} />
            </Switch>
          </div>

          <AuthVerify logOut={this.logOut} />
        </div>
      </Router >
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(App);
