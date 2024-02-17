"use client"

export default function Chat(){
    return (
        <>
            <div className="chat-history">
                            <ul className="m-b-0">
                                <li className="clearfix">
                                    <div className="message-data text-right">
                                        <span className="message-data-time">10:10 AM, Today</span>
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar"/>
                                    </div>
                                    <div className="message other-message float-right"> Hi Aiden, how are you? How is the
                                        project coming along? </div>
                                </li>
                                <li className="clearfix">
                                    <div className="message-data">
                                        <span className="message-data-time">10:12 AM, Today</span>
                                    </div>
                                    <div className="message my-message">Are we meeting today?</div>
                                </li>
                                <li className="clearfix">
                                    <div className="message-data">
                                        <span className="message-data-time">10:15 AM, Today</span>
                                    </div>
                                    <div className="message my-message">Project has been already finished and I have results
                                        to show you.</div>
                                </li>
                            </ul>
                        </div>
        </>
    )
}