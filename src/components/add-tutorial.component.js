import React, { Component } from "react";
import { connect } from "react-redux";
import { createTutorial } from "../slices/tutorials";

class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      id: null,
      title: "",
      docNumb: 0,
      docDate: "",
      sentTo: "ho",
      sentFrom: "",
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

  saveTutorial() {
    const { title, description, docNumb, docDate, sentTo, sentFrom, fileLink, seen } = this.state;

    this.props
      .createTutorial({ title, description, docNumb, docDate, sentTo, sentFrom, fileLink, seen })
      .unwrap()
      .then((data) => {
        console.log(data)
        this.setState({
          id: data.id,
          title: data.title,
          docNumb: data.docNumb,
          docDate: data.docDate,
          sentTo: data.sentTo,
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
      sentFrom: "",
      fileLink: "",
      seen: false,
      description: "",
      published: false,
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTutorial}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeValue}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="sentTo">sentTo</label>
              <input
                type="text"
                className="form-control"
                id="sentTo"
                required
                value={this.state.sentTo}
                onChange={this.onChangeValue}
                name="sentTo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
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

            <button onClick={this.saveTutorial} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createTutorial })(AddTutorial);
