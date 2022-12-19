import React from "react";

import Moment from 'moment/min/moment-with-locales';

const Inbox = (props) => {
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

    // console.log(tu.reverse())
    return (
        <ul>
            {
                tu && tu.map((tuto, index) => (

                    <li
                        className={"list-group-item " +
                            (tuto.seen ? "seen" : "")
                        }
                        onClick={() => setActiveTutorial(tuto, index)}
                        key={index}
                    >

                        <div className='row wraper'>
                            <div className="col-md-3 sender">
                                {tuto.sentFrom.username}
                            </div>
                            <div className="col-md-2 tit">
                                {tuto.title}
                            </div>
                            <div className="col-md-5 object">
                                {tuto.description}
                            </div>
                            <div className="col-md-2 time" >
                                {Moment(tuto.createdAt).startOf('min').fromNow()}
                            </div>




                        </div>
                    </li>

                ))
            }

        </ul>
    )


}



export default Inbox