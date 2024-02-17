"use client"

import Link from "next/link"
import LeftBar from './components/left-board'
import ChatHistory from './components/chat'
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from "next/navigation";



export default function Home(){

    const [apiData, setapiData] = useState('');
    const [userData, setUserData] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();

    useEffect(()=>{
        const userlist = async ()=>{
            await fetch(process.env.LOCAL_API_URL + '/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
        }
    })
    
    return (
        <>
            <div className="container">
        <div className="row clearfix">
            <div className="col-lg-12">
                <div className="card chat-app">
                <LeftBar/>
                    <div className="chat">
                        <div className="chat-header clearfix">
                            <div className="row">
                                <div className="col-lg-6">
                                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar"/>
                                    </a>
                                    <div className="chat-about">
                                        <h6 className="m-b-0">Aiden Chavez</h6>
                                        <small>Last seen: 2 hours ago</small>
                                    </div>
                                </div>
                                <div className="col-lg-6 hidden-sm text-right">
                                    <a href="javascript:void(0);" className="btn btn-outline-secondary"><i
                                            className="fa fa-camera"></i></a>
                                    <a href="javascript:void(0);" className="btn btn-outline-primary"><i
                                            className="fa fa-image"></i></a>
                                    <a href="javascript:void(0);" className="btn btn-outline-info"><i
                                            className="fa fa-cogs"></i></a>
                                    <a href="javascript:void(0);" className="btn btn-outline-warning"><i
                                            className="fa fa-question"></i></a>
                                </div>
                            </div>
                        </div>
                        <ChatHistory/>
                        <div className="chat-message clearfix">
                            <div className="input-group mb-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-send"></i></span>
                                </div>
                                <input type="text" className="form-control" placeholder="Enter text here..."/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    );

}