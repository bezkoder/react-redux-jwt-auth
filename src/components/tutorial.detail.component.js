import React from 'react';
import Moment from 'moment/min/moment-with-locales';

const TutorialDetailComponent = (props) => {
    Moment.locale('ar-dz')
    const { currentTutorial, user, onDownload, getBack, inbox, fileLinkViewer } = props;
    console.log(currentTutorial.fileLink)

    const Download = (id, link) => {

        onDownload(id, link)
    }

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
                                onClick={Download(user.id, currentTutorial.fileLink)}
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
        </div >
    );
}

export default TutorialDetailComponent;


