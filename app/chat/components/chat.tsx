"use client"
import React, { useState } from 'react';


export default function Chat({ messages, currentuser }) {
    return (
        <>
            <div className="chat-history">
                <ul className="m-b-0">
                    {
                        Array.isArray(messages) && messages.map((item, index) => (
                            <li key={index} className="clearfix">
                                <div className={"message-data " + ((item.from_user == currentuser.id) ? 'text-right' : '')}>
                                    <span className="message-data-time">10:15 AM, Today</span>
                                </div>
                                <div className={"message my-message " + ((item.from_user == currentuser.id) ? 'float-right' : '')}>{item.message}</div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}