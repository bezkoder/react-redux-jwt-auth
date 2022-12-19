import React from "react";

import Moment from 'moment/min/moment-with-locales';

const Send = (props) => {
    Moment.locale('ar-dz')
    const { tutos, setActiveTutorial } = props

    const reversing = (array) => {
        const tu = []
        if (array) {
            array.map((tut, index) => {
                tu.unshift(tut)
            })
        }
        return tu
    }
    const tu = reversing(tutos)

    return (
        <div>
            {tu ? (
                tu.map((tuto, index) => (

                    <li
                        className={"list-group-item " +
                            (tuto.seen ? "seen" : "")
                        }
                        onClick={() => setActiveTutorial(tuto, index)}
                        key={index}
                    >

                        <div className='row  wraper'>
                            <div className="col-md-3 sender">
                                {tuto.sentTo}
                            </div>
                            <div className="col-md-2 tit">
                                {tuto.title}
                            </div>
                            <div className="col-md-5 object">
                                {tuto.description}
                                {tuto.published ? (<div className="published">تم الإطلاع</div>
                                ) : (<div className="unpublished">في الإنتظار</div>)}
                            </div>
                            <div className="col-md-2 time" >
                                {Moment(tuto.createdAt).startOf('min').fromNow()}
                            </div>
                        </div>


                    </li>

                ))
            ) : (""
                // <li className={"list-group-item "}> لا يوجد رسائل صادرة</li>
            )

            }
        </div>

    )


}



export default Send