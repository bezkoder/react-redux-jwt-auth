import React, { Component } from "react";
import { connect } from "react-redux";
import http from "../http-common";
import {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
  downloadFile
} from "../slices/tutorials";
import { Link } from "react-router-dom";
import Inbox from "./inbox.component";
import download from 'js-file-download';

const user = JSON.parse(localStorage.getItem("user"))

class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.onDownload = this.onDownload.bind(this);

    this.state = {
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      inbox: true
    };
  }

  componentDidMount() {

    this.props.retrieveTutorials({ data: user });
  }

  onDownload(id, data) {
    http.get(`/tutorials/file?name=${data}&id=${id}`)
      .then(resp => {
        console.log(resp)
        download(resp.data, data)
      })
      .catch(err => console.error(err))
  }
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1,
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
    });
  }

  removeAllTutorials() {
    this.props
      .deleteAllTutorials()
      .then((response) => {
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByTitle() {
    this.refreshData();

    this.props.findTutorialsByTitle({ title: this.state.searchTitle });
  }

  render() {
    const { searchTitle, currentTutorial, currentIndex, inbox } = this.state;
    const { tutorials } = this.props;
    console.log(currentTutorial)
    return (
      <div className="list">
        <div className="col-md-12">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder=" بحث بالعنوان"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                إبحث
              </button>

            </div>
          </div>
        </div>
        <div className="row">



          <div className="col-md-9">
            <h4>قائمة المراسلات</h4>

            <ul className="list-group">
              {tutorials &&
                tutorials.map((tutorial, index) => (
                  inbox === true ? (
                    <Inbox tutos={tutorial.inbox} currentIndex={currentIndex} setActiveTutorial={this.setActiveTutorial} />

                  ) : (
                    <Inbox tutos={tutorial.send} currentIndex={currentIndex} setActiveTutorial={this.setActiveTutorial} />

                  )

                ))}
            </ul>

            {/* <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllTutorials}
            >
              مسح كل المراسلات
            </button> */}
          </div>

          <div className="col-md-3">
            <div>
              <li className={"list-group-item "}>مراسلة جديدة</li>
            </div>
            <ul className="list-group">
              <li className={"list-group-item "}
                onClick={() => this.setState({ inbox: true, currentTutorial: null, currentIndex: -1 })}>البريد الوارد</li>
              <li className={"list-group-item "}
                onClick={() => this.setState({ inbox: false, currentTutorial: null, currentIndex: -1 })}>البريد الصادر</li>
            </ul>
          </div>
          <div className="col-md-7">
            {currentTutorial ? (
              <div>
                <a href="#download" type="button" value="download"
                  onClick={this.onDownload(user.id, currentTutorial.fileLink)}>Download</a>
                <h4>تفاصيل المراسلة</h4>
                <div>
                  <strong>المرسل إليه : </strong>{" "}{currentTutorial.sentTo}
                </div>
                <div>
                  <strong>المراسلة رقم : </strong>{" "}{currentTutorial.docNumb}
                  المؤرخة في : {" "} {currentTutorial.docDate}
                </div>
                <div>
                  <strong>العنوان:</strong>{" "}{currentTutorial.title}
                </div>
                <div>
                  <strong>المضمون:</strong>{" "}{currentTutorial.description}
                </div>
                <div>
                  <strong>Status:</strong>{" "}{currentTutorial.published ? "Published" : "Pending"}
                </div>



                <Link
                  to={"/tutorials/" + currentTutorial._id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>


              </div>

            ) : (
              <div>

                <br />
                <p>Please click on a Tutorial...</p>
              </div>
            )}
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    tutorials: state.reducer,
  };
};

export default connect(mapStateToProps, {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
  downloadFile
})(TutorialsList);
