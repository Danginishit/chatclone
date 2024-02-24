"use client"

import Link from "next/link"
import LeftBar from './components/left-board'
import ChatHistory from './components/chat'
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from "next/navigation";



export default function Home() {


    const [apiData, setapiData] = useState([]);
    const [touserData, setToUserData] = useState('');
    const [userChat, setUserChat] = useState('');
    const [selectedUserInfo, setSelectedUserInfo] = useState({username:'',last_seen:''});
    const [currentUser, setCurrentuser] = useState({id:''});
    const [message, setMessage] = useState('');
    const [cookies] = useCookies(['user']);
    const router = useRouter();

    const receiveDataFromChild = async (data) => {
        await setToUserData(data);
        apiData.map((value,index)=>{
            if(parseInt(data)==parseInt(value.id)){
                setSelectedUserInfo(value);
            }
        });

        const UserChatData = async () => {
            const serializedData = cookies?.user;
            const serializedUserData = serializedData.split('=')[1];
            const userData = JSON.parse(decodeURIComponent(serializedUserData));
            const ChatResponse = await fetch(process.env.LOCAL_API_URL + '/chat/list/' + data, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userData?.token
                },
            });
            if (ChatResponse.ok) {
                const data = await ChatResponse.json();
                setUserChat(data); // Set the API ResponseData to state if needed
            } else {
                console.error('API request failed:', ChatResponse.status, ChatResponse.statusText);
            }
        }
        UserChatData();
    };

    const sendMessage = async () => {
        const serializedData = cookies?.user;
        const serializedUserData = serializedData.split('=')[1];
        const userData = JSON.parse(decodeURIComponent(serializedUserData));
        const ChatResponse = await fetch(process.env.LOCAL_API_URL + '/chat/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userData?.token
            },
            body: JSON.stringify({
                from_user: currentUser.id,
                to_user: touserData,
                message:message,
            }),
        });
        if (ChatResponse.ok) {
            const data = await ChatResponse.json();
            if(data?.status){
                setMessage('');
                receiveDataFromChild(touserData);
            }
        } else {
            console.error('API request failed:', ChatResponse.status, ChatResponse.statusText);
        }
    }

    useEffect(() => {
        const userlist = async () => {
            const serializedData = cookies?.user;
            const serializedUserData = serializedData.split('=')[1];
            const userData = JSON.parse(decodeURIComponent(serializedUserData));
            setCurrentuser(userData);
            const ResponseData = await fetch(process.env.LOCAL_API_URL + '/user/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userData?.token
                },
            });
            if (ResponseData.ok) {
                const data = await ResponseData.json();
                setapiData(data); // Set the API ResponseData to state if needed
            } else {
                console.error('API request failed:', ResponseData.status, ResponseData.statusText);
            }

        }

        userlist();
        // console.log(apiData)
    }, [cookies?.user,touserData,userChat]);


    if(selectedUserInfo.username){
        return(
            <>
                <div className="container">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <LeftBar userList={apiData} currentuser={currentUser} selectUser={receiveDataFromChild} />
                            <div className="chat">
                                <div className="chat-header clearfix">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <a href="#" data-toggle="modal" data-target="#view_info">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                            </a>
                                            <div className="chat-about">
                                                <h6 className="m-b-0">{selectedUserInfo?.username ?? "No User Selected"}</h6>
                                                <small>Last seen: {selectedUserInfo?.last_seen}</small>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 hidden-sm text-right">
                                            <a href="#" className="btn btn-outline-secondary"><i
                                                className="fa fa-camera"></i></a>
                                            <a href="#" className="btn btn-outline-primary"><i
                                                className="fa fa-image"></i></a>
                                            <a href="#" className="btn btn-outline-info"><i
                                                className="fa fa-cogs"></i></a>
                                            <a href="#" className="btn btn-outline-warning"><i
                                                className="fa fa-question"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <ChatHistory messages={userChat} currentuser={currentUser} />
                                <div className="chat-message clearfix">
                                    <div className="input-group mb-0">
                                        <div className="input-group-prepend">
                                            <button className="input-group-text" onClick={()=>{sendMessage()}}><i className="fa fa-send"></i></button>
                                        </div>
                                        <input type="text" id="messgaeClear" className="form-control" placeholder="Enter text here..." onChange={ (e)=>{setMessage(e.target.value)} } value={message} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }else{
        return (
            <>
                <div className="container">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <LeftBar userList={apiData} currentuser={currentUser} selectUser={receiveDataFromChild} />
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }

}