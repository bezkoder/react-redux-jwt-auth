import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { createTutorial } from "../slices/tutorials";
import axios from 'axios';
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
      sentFrom: { username: user.username, id: user.id },
      fileLink: "",
      seen: false,
      description: "",
      published: false,
      submitted: false,
    };
  }


  onChangeValue(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }
  onChangeSentValue(e) {
    const IdReg = new RegExp(/\d+$/, 'i')
    const nameReg = new RegExp(/\D*/, 'i')
    this.setState({
      [e.target.id]: nameReg.exec(e.target.value)[0],
      sentToId: IdReg.exec(e.target.value)[0]
    });
  }
  onFileChange(e) {
    this.setState({ fileLink: e.target.files[0] })
  }
  onLoad(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", this.state.fileLink)
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    // console.log(formData)
    axios.post("http://localhost:8083/api/tutorials/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res)
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
    const { users } = this.props.users

    return (

      <div className="submit-form">
        {this.state.submitted ? (
          <Redirect to="/TutorialsList" />
        ) : (
          <div className="box-container">
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
                value={this.state.sentTo}
                onChange={this.onChangeSentValue}>
                <option value=""></option>
                {
                  users.map((user, index) => {
                    return <option key={index} value={user.username + user.id}>{user.username}</option>
                  })
                }
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">المضمون</label>
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
                // value={this.state.fileLink}
                onChange={this.onFileChange}
                name="fileLink"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit"
                onClick={this.onLoad}>Upload</button>
            </div>

            <button onClick={this.saveTutorial} className="btn btn-success">
              إرسال
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createTutorial })(AddTutorial);
