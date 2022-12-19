import React from 'react';

const MenuComponent = (props) => {
    const { currentUser, logOut } = props
    return (
        <div>
            <div className="mega-menu">
                {/* <div className="image">
                    <img src="imgs/megamenu.png" alt="" />
                </div> */}
                <ul className="links">

                    <li>
                        <a href="#team"> {currentUser.nom}</a>
                    </li>
                    <li className="logout">
                        <a href="/login" onClick={logOut}>الخروج
                            <i class="material-icons">logout</i></a>
                    </li>



                </ul>
            </div>


        </div>
    );
}

export default MenuComponent;
