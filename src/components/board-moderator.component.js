import React, { Component } from "react";
// import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
// import TutorialsList from "./tutorials-list.component";
import Docs from "./docs.component"
import store1 from "../store1";
// import userService from "../services/user.service";




export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }


  componentDidMount() {
    UserService.getModeratorBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (



      <Docs />




    )
  }
}
