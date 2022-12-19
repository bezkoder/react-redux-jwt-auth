import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { createTutorial } from "../slices/tutorials";
import { getListUsers } from '../actions/users'
import axios from 'axios';
import $ from "jquery";
const user = JSON.parse(localStorage.getItem("user"))


class AddTutorial extends Component {

  constructor(props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeSentValue = this.onChangeSentValue.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onFileChange = this.onFileChange.bind(this);

    this.state = {
      id: null,
      title: "",
      docNumb: 0,
      docDate: "",
      sentTo: "",
      sentToId: 0,
      sentFrom: { username: user.nom, id: user.id },
      fileLink: "",
      seen: false,
      description: "",
      published: false,
      submitted: false,
    };
  }
  componentWillMount() {
    this.props.getListUsers()

  }
  componentDidMount() {
    // console.log($('#sentTo'))
    // $('#sentTo').multiSelect('select', String | Array)

    // $(document).ready(function () {
    //   $('#sentTo');
    // });
  }

  onChangeValue(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
    console.log(this.state)
  }
  onChangeSentValue(e) {
    const IdReg = new RegExp(/\d+$/, 'i')
    const nameReg = new RegExp(/\D*/, 'i')
    const send = nameReg.exec(e.target.value)[0]
    const sendId = IdReg.exec(e.target.value)[0]
    this.setState({
      sentTo: send,
      sentToId: sendId
    });


  }
  onFileChange(e) {
    this.setState({ fileLink: e.target.files[0] })
  }
  onLoad(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", this.state.fileLink)

    axios.post("http://localhost:8083/api/tutorials/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
    })
  }

  saveTutorial() {
    const { title, description, docNumb, docDate, sentTo, sentToId, sentFrom, fileLink, seen } = this.state;

    this.props
      .createTutorial({ title, description, docNumb, docDate, sentTo, sentToId, sentFrom, fileLink, seen })
      .unwrap()
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          docNumb: data.docNumb,
          docDate: data.docDate,
          sentTo: data.sentTo,
          sentToId: data.sentToId,
          sentFrom: data.sentFrom,
          fileLink: data.fileLink,
          seen: false,
          description: data.description,
          published: data.published,
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      id: null,
      title: "",
      docNumb: 0,
      docDate: "",
      sentTo: "",
      sentToId: 0,
      fileLink: "",
      seen: false,
      description: "",
      published: false,
      submitted: false,
    });
  }

  render() {
    const { users } = this.props

    return (


      <div className="submit-form">
        <div className="container">
          {this.state.submitted ? (
            <Redirect to="/TutorialsList" />
          ) : (
            <div className="box">
              <div className="title">
                <span >مراسلة جديدة</span>
              </div>

              <div className="form-group">
                <div className="flex-group">
                  <div>
                    <label htmlFor="title">نوع المراسلة</label>
                    <select
                      name="title"
                      id="title"
                      className="form-control"
                      required
                      value={this.state.title}
                      onChange={this.onChangeValue}>
                      <option value=""></option>
                      <option value="جدول إرسال">جدول إرسال</option>
                      <option value="مراسلة">مراسلة</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="title">التاريخ</label>
                    <input
                      type="date"
                      className="form-control"
                      id="docDate"
                      required
                      value={this.state.docDate}
                      onChange={this.onChangeValue}
                      name="docDate"
                    />
                  </div>
                  <div>
                    <label htmlFor="title">رقم المراسلة</label>
                    <input
                      type="number"
                      className="form-control"
                      id="docNumb"
                      required
                      value={this.state.docNumb}
                      onChange={this.onChangeValue}
                      name="docNumb"
                      style={{ "width": "100px" }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="sentTo">الجهة المرسل إليها</label>
                <select
                  name="sentTo"
                  id="sentTo"
                  className="form-control"
                  required
                  // multiple="multiple"
                  value={this.state.sentTo}
                  onChange={this.onChangeSentValue}>
                  <option value=""></option>
                  {
                    users && users.map((user, index) => {
                      return (
                        <option key={index} value={user.nom + user.id}>{user.nom}</option>
                      )

                    })
                  }
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">الموضوع</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required

                  value={this.state.description}
                  onChange={this.onChangeValue}
                  name="description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">تحميل المراسلة</label>
                <input
                  type="file"
                  className="form-control"
                  id="fileLink"
                  required
                  onChange={this.onFileChange}
                  name="fileLink"
                />
              </div>

              <button onClick={this.saveTutorial} >
                إرسال
              </button>
            </div>
          )}
        </div>

      </div >
    );
  }
}
function mapStateToProps(state) {
  const { users } = state.users.users ? state.users.users : "";
  return {
    users
  };
}

export default connect(mapStateToProps, { createTutorial, getListUsers })(AddTutorial);
