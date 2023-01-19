import React, { Component } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import http from "../http-common";
import {
  retrieveTutorials,
  findTutorialsByTitle,
  deleteAllTutorials,
  downloadFile,
  updateTutorial
} from "../slices/tutorials";
import Inbox from "./inbox.component";
import Send from "./send.component"
import Search from "./search.component";
// import TutotialDetails from "./tutorial.detail.component"
import TutorialDetails from "./tutorial.details.component"
import Moment from "moment/min/moment-with-locales";

const user = JSON.parse(localStorage.getItem("user"))
let myInterval

class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.getBack = this.getBack.bind(this)
    this.unseenTuto = this.unseenTuto.bind(this)
    this.refreshing = this.refreshing.bind(this)
    this.setInbox = this.setInbox.bind(this)
    this.setSendbox = this.setSendbox.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)

    this.state = {
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
      searching: false,
      inbox: true,
      tutorialSelected: false,
      fileLinkViewer: "",
      Unseen: 0,

    };
  }

  componentDidMount() {

    if (this.state.searching === false) {
      this.refreshing()
    }
    ;
  }

  refreshing() {
    this.props.retrieveTutorials({ data: user }).then(tutorials => {
      this.unseenTuto(tutorials.payload[0])
    })
    if (!myInterval) {
      myInterval = setInterval(() => {

        this.props.retrieveTutorials({ data: user }).then(tutorials => {
          this.unseenTuto(tutorials.payload[0])
        })
      }, 30 * 1000)
    }

  }
  setInbox() {
    this.setState({ inbox: true, currentTutorial: null, currentIndex: -1, searching: false, searchTitle: "" })
    if (!myInterval) {
      this.refreshing()
    }

  }

  setSendbox() {
    this.setState({ inbox: false, currentTutorial: null, currentIndex: -1, searching: false, searchTitle: "" })
    if (!myInterval) {
      this.refreshing()
    }
  }

  unseenTuto(tuto) {
    let unSee = 0
    if (tuto.inbox) {
      tuto.inbox.map((tut) => {
        if (tut.seen === false) {
          unSee++
        }
      })
    }
    
      this.onTitleChange(unSee)
    
    this.setState({ Unseen: unSee })
    console.log(unSee)
  }

  onTitleChange(unSeen) {
    const title = document.title
    const myTitle = title;
    let myInterval=0
    let myNewTitle = ` مـنـصـة الـبـريـد الداخـلـي (  ${unSeen} ) `
    // if (unSeen != 0) {
    //   document.title = myNewTitle
    //   myInterval=setInterval(() => {
    //     document.title === myTitle ? document.title = myNewTitle : document.title = myTitle
    //   }, 2 * 1000);
    //   console.log(myInterval)
    // }else{
    //   clearInterval(myInterval)
    //   console.log("hello")
    //   document.title=title
    // }




  }
  onDownload(id, data) {

    this.props.downloadFile(id, data).then(resp => {
      const url = window.URL.createObjectURL(new Blob([resp.data]));
      const link = document.getElementsByClassName('down')
      // const filelink = document.getElementsByTagName('Document')
      link[0].href = url;
      link[0].setAttribute('download', data);


    })
      .catch(err => console.error(err))

  }
  onChangeSearchTitle(e) {
    if (myInterval) {
      clearInterval(myInterval)
      // this.setState({ myInterval: null })
      myInterval = null
      console.log(myInterval)

    }
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
    if (tutorial.seen === false) {
      const see = this.state.Unseen - 1
      this.props.updateTutorial({ id: tutorial._id, data: tutorial })
      this.setState({
        Unseen: see
      });
    }

    this.setState({
      currentTutorial: tutorial,
      currentIndex: index,
      tutorialSelected: true,
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
  getBack() {
    this.setState({
      currentIndex: -1
    })
  }
  findByTitle() {
    this.refreshData();

    this.props.findTutorialsByTitle({ title: this.state.searchTitle, id: user.id })
      .then(
        res => {
          this.setState({
            searching: true,
          });
        }
      );

  }

  render() {
    Moment.locale('ar-dz')
    const { searchTitle, currentTutorial, currentIndex, inbox, searching, Unseen } = this.state;
    const { tutorials } = this.props;
    console.log(tutorials)
    return (
      <div className="list">
        <div className="container">
          <div className="cour-list">
            <div className="content">
              <div className="row searching">
                <div className="title"><span >قائمة المراسلات</span></div>
                <div className="search-bar">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className={searchTitle ? ("form-control serach-input filled") : ("form-control serach-input")}
                      placeholder=" بحث بالموضوع"
                      value={searchTitle}
                      onChange={this.onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                      <button
                        className={searchTitle ? ("btn btn-outline-secondary") : ("btn btn-outline-secondary disabled")}
                        type="button"
                        onClick={this.findByTitle}

                      >إبحث
                      </button>

                    </div>
                  </div>
                </div>

              </div>

              <div className="row cont">

                <div className=" col-md-9 list-content">
                  {currentIndex !== -1 ? (

                    <TutorialDetails currentTutorial={currentTutorial} user={user}
                      getBack={this.getBack} inbox={inbox}
                    // fileLinkViewer={fileLinkViewer}
                    />

                  ) : (

                   
                      <ul className="list-group">
                        <div className='row titles'>
                          <div className="col-md-2 title" >
                            وقت الإرسال
                          </div>
                          <div className="col-md-5 title">
                            الموضوع
                          </div>
                          <div className="col-md-2 title">
                            العنوان
                          </div>
                          <div className="col-md-3 title">
                            {inbox ? "المرسل" : "المرسل إليه"}
                          </div>

                        </div>
                        <div className="tuto-container">

                          {tutorials &&
                            searching ? (
                            <Search tutos={tutorials} currentIndex={currentIndex}
                              setActiveTutorial={this.setActiveTutorial}
                              onClick={this.setActiveTutorial}
                            />
                          ) : (
                            tutorials && tutorials.map((tutorial, index) => (

                              inbox === true ? (
                                <Inbox tutos={tutorial.inbox} currentIndex={currentIndex}
                                  setActiveTutorial={this.setActiveTutorial}

                                />
                              ) : (

                                <Send tutos={tutorial.send} currentIndex={currentIndex}
                                  setActiveTutorial={this.setActiveTutorial} />
                              )
                            )

                            ))}
                        </div>
                      </ul>
                    
                  )}

                </div>
                <div className="col-md-3 nav-content">

                  {/* <div>
                    <li className={"list-group-item titl"}>
                      <Link to={"/AddTutorial"} className="nav-link">مراسلة جديدة</Link></li>

                  </div> */}
                  <ul className="list-group">
                    <li className={"list-group-item titl " + (inbox ? ("selected") : "")}
                      onClick={this.setInbox}><a> {Unseen ? (` (${Unseen} ) `) : ("")}</a>البريد الوارد  </li>
                    <li className={"list-group-item titl " + (!inbox ? ("selected") : "")}
                      onClick={this.setSendbox}>البريد الصادر</li>
                  </ul>


                  <Link to={"/AddTutorial"} className="nav-link add-new">

                    <i class="material-icons md-36 add">assignment_add</i></Link>


                </div>

              </div>
            </div>
          </div>
        </div>


      </div >
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
  downloadFile,
  updateTutorial
})(TutorialsList);
