import React, { Component } from 'react';
import { connect } from "react-redux";
import { onDownload } from "../actions/file";
import Moment from 'moment/min/moment-with-locales';
import http from "../http-common";

class TutorialDetails extends Component {
    constructor(props) {
        super(props);
        this.Download = this.Download.bind(this);
    }
    Download(id, data) {

        http.get(`/tutorials/file?name=${data}&id=${id}`, {
            responseType: 'blob',
        }).then(resp => {
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.getElementsByClassName('down')
            // const filelink = document.getElementsByTagName('Document')
            link[0].href = url;
            link[0].setAttribute('download', data);


        })
            .catch(err => console.error(err))

    }

    render() {
        Moment.locale('ar-dz')
        const { currentTutorial, user, getBack, inbox, } = this.props;

        return (
            <div>
                {currentTutorial ? (
                    <div className="details">

                        <div className=" titles">
                            {/* <button onClick={getBack}><i class="material-icons">arrow_back</i>رجوع</button> */}
                            <a href="#download" type="button" className="back-arrow" onClick={getBack}>
                                <i class="material-icons">arrow_back</i></a>
                            <span className='titre'>تفاصيل المراسلة</span>

                        </div >
                        <div className="details-content">
                            <div className='sub-title-1'>
                                <div id="description" >
                                    {currentTutorial.title} {" : "}  {currentTutorial.description}
                                </div>
                            </div>
                            <div className='sub-title-2'>
                                <div className='time-send'>
                                    ـ{Moment(currentTutorial.createdAt).format('Do MMMM YYYY , hh:mm a')}{" ("}
                                    {Moment(currentTutorial.createdAt).startOf('min').fromNow()}{")"}
                                </div>


                                {inbox ? (<div id='sender'>
                                    <strong>المرسل : </strong>{" "}{currentTutorial.sentFrom.username}
                                </div>) : (

                                    <div id='sender'>
                                        <strong>المرسل إليه : </strong>{" "}{currentTutorial.sentTo}
                                    </div>

                                )}

                            </div>

                            <div className='tutorial-state'>
                                {inbox ? (<div></div>) : (
                                    <div className='state'>
                                        حالة الإرسال {" : "}
                                        {currentTutorial.published ? (<span id='seen'>تم الإطلاع</span>) :
                                            (<span id='unseen'>في الإنتظار</span>)}
                                    </div>
                                )}
                                <div>
                                    <strong> {currentTutorial.title} {" "} رقم :  </strong>{" "}{currentTutorial.docNumb} {" "}
                                    <strong> المؤرخة في :</strong> {" "} {Moment(currentTutorial.docDate).format('LL')}
                                </div>
                            </div>

                            {currentTutorial.fileLink ? (
                                <a href="#download" type="button" className="down"
                                    onClick={this.Download(user.id, currentTutorial.fileLink)}
                                >
                                    Download {" / "} {currentTutorial.fileLink}</a>
                            ) : ("")}
                            {/* <ViewerComponent id="file-viewer" /> */}
                        </div>

                    </div>

                ) : (
                    <div>

                        <br />
                        <p>يرجى إختيار مراسلة ...</p>
                    </div>
                )
                }
            </div>
        );
    }
}

export default connect(null, { onDownload })(TutorialDetails);
