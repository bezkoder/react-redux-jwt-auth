


import React from 'react'

const Inbox = (props) => {
    const { tutos, setActiveTutorial } = props
    return (
        <div>
            {
                tutos && tutos.map((tuto, index) => (
                    <li
                        className={"list-group-item " +
                            (tuto.seen ? "seen" : "")
                        }
                        onClick={() => setActiveTutorial(tuto, index)}
                        key={index}
                    >
                        <div className='row'>
                            <div className="col-md-3">
                                {tuto.sentFrom.username}
                            </div>
                            <div className="col-md-2">
                                {tuto.title}
                            </div>
                            <div className="col-md-4">
                                {tuto.description}
                            </div>
                        </div>
                    </li>
                ))
            }
        </div>

    )


}

export default Inbox