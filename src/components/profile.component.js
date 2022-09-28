import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      info: ""
    };

  }

  render() {
    var { user: currentUser } = this.props;
    console.log(currentUser)
    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong> بطاقة الموظف </strong>
          </h3>
        </header>
        <div className="infos">
          <div className="info-box">
            <div className="info">
              <p>
                <strong>Nom et Prénom :</strong> {currentUser.username}
              </p>
            </div>
            <div className="info">
              <p>
                <strong>الإسم و اللقب : </strong> {currentUser.info.name}
              </p>
            </div>
          </div>
          <div className="info-box">
            <div className="info">
              <p>
                <strong>Date et Lieu de Naissanace</strong> {currentUser.info.birthday} A : {currentUser.info.birthp}
              </p>
            </div>
            <div className="info">
              <p>
                <strong>تاريخ ومكان الميلاد : </strong> {currentUser.info.birthday} <strong>بـ :  </strong> {currentUser.info.birthp}
              </p>

            </div>
          </div>

          <div className="info-box">
            <div className="info">
              <p>
                <strong>Grade Actuel : </strong> {currentUser.info.grade}
              </p>
              <p>
                <strong>Date de Recrutement</strong>  {currentUser.info.recrutemetdate}
              </p>
            </div>
            <div className="info">
              <p>
                <strong>الرتبة الحالية :  </strong> {currentUser.info.grade}
              </p>
              <p style={{ "textAlign": "right" }}>
                <strong>تاريخ التعيين : </strong>  {currentUser.info.recrutemetdate}
              </p>
            </div>
          </div>

          <div className="info-box">
            <div className="info">
              <p>
                <strong>ُEchelon Actuel : </strong> {currentUser.info.Echelon} <strong>Date d'effet : </strong>  {currentUser.info.EchelonDate}
              </p>
            </div>
            <div className="info">
              <p>
                <strong>الدرجة الحالية : </strong> {currentUser.info.Echelon} <strong>تاريخ الإستفادة : </strong>  {currentUser.info.EchelonDate}
              </p>
            </div>
          </div>

          <div className="info-box">
            <div className="info">
              <p>
                <strong>Affectation : </strong> {currentUser.info.fac}
              </p>
            </div>
            <div className="info">
              <p>
                <strong>التوجيه : </strong> {currentUser.info.fac}
              </p>

            </div>
          </div>


          <div className="info-box">
            <div className="info">
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
            </div>
            <div className="info">
              <p>
                {currentUser.email} <strong>:  البريد الإلكتروني </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
