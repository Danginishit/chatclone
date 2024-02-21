import React, { useState } from 'react';

export default function LeftBoard({ userList,currentuser, selectUser }) {

    const [dataToSend, setDataToSend] = useState('');

    const sendDataToParentHandler = (dataToSend) => {
        setDataToSend(dataToSend);
        selectUser(dataToSend);
    };

    return (
        <div id="plist" className="people-list">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Search..." />
            </div>
            <ul className="list-unstyled chat-list mt-2 mb-0">
                {Array.isArray(userList) && userList.map((user, index) => (
                    // <li key={index} className="clearfix active">
                    (user.id != currentuser?.id) ?
                    <li key={index} data-id={user.id} className={"clearfix " + ((user.id == dataToSend) ? "active" : '')} onClick={() => sendDataToParentHandler(user.id)}>
                        <img src={"https://bootdey.com/img/Content/avatar/avatar" + index + ".png"} alt="avatar" />
                        <div className="about">
                            <div className="name">{user.username}</div>
                            <div className="status"> <i className="fa fa-circle online"></i> {user.last_seen} </div>
                        </div>
                    </li> : ""
                ))}
            </ul>
        </div>
    );
}