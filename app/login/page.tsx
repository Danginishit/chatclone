"use client";

import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { serialize } from 'cookie';


export default function LoginForm() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(process.env.LOCAL_API_URL);
            const response = await fetch(process.env.LOCAL_API_URL + '/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setCookie('user', serialize('user',JSON.stringify(userData)), { path: '/' });
                router.push('/dashboard');
            }
            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error submitting data:', error.message);
        }
        console.log('Email:', email, 'Password:', password);
    }


    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
                <input type="email" id="form2Example1" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                <label className="form-label" >Email address</label>
            </div>
            <div className="form-outline mb-4">
                <input type="password" id="form2Example2" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control" />
                <label className="form-label" >Password</label>
            </div>
            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                        <label className="form-check-label" > Remember me </label>
                    </div>
                </div>
                <div className="col">
                    <a href="#!">Forgot password?</a>
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
            <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
                <p>or sign up with:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                </button>
                <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                </button>
            </div>
        </form>
    );
};

