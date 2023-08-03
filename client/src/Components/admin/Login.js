import React, { useRef, useEffect } from 'react';
import '../../CSS/admin/Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const uname = useRef();
    const password = useRef();
    const getUname = localStorage.getItem("unameData");

    useEffect(() => {
        if (getUname) {
            navigate('/dashboard');
        }
    }, [getUname, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:1005/users?uname=${uname.current.value}`)
            .then((response) => {
                const userData = response.data[0];
                if (userData && password.current.value === userData.password) {
                    localStorage.setItem("unameData", userData.uname);
                    navigate('/dashboard');
                } else {
                    window.confirm("Please Enter valid values");
                }
            })
            .catch((error) => {
                console.log('Error fetching Category data in Brand.js:', error);
            });
    };

    return (
        <>
            <div className="card login-form-desig">
                <form className="box" onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-muted"> Please enter your user name and password!</p>
                    <input type="text" placeholder="Username" ref={uname} />
                    <input type="password" name="" placeholder="Password" ref={password} />
                    <NavLink className="forgot text-muted" to="/admin">Forgot password?</NavLink>
                    <input type="submit" value="Login" />
                    <div className="col-md-12">
                        <ul className="social-network social-circle">
                            <li><NavLink to="/admin" className="icoFacebook" title="Facebook"><i className="fab fa-facebook-f"></i></NavLink></li>
                            <li><NavLink to="/admin" className="icoTwitter" title="Twitter"><i className="fab fa-twitter"></i></NavLink></li>
                            <li><NavLink to="/admin" className="icoGoogle" title="Google +"><i className="fab fa-google-plus"></i></NavLink></li>
                        </ul>
                    </div>
                </form>
            </div>
        </>
    )
}
