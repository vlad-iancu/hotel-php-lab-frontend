import React from 'react'
import './Login.css'
import axios from 'axios'
import { BASE_URL } from '../config'
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.state = { loginData: {}, registerData: {}, status: null, isLoading: false }
    }

    login() {
        this.setState((prevState, props) => ({
            loginData: prevState.loginData,
            registerData: prevState.registerData,
            status: null,
            isLoading: true,
        }))
        axios.post(`${BASE_URL}/login`, {
            email: this.state.loginData.userName,
            password: this.state.loginData.password
        }).then(response => {
            let body = response.data;
            this.setState((prevState, props) => ({
                loginData: prevState.loginData,
                registerData: prevState.registerData,
                status: { message: body.message, error: body.status === "ok" },
                isLoading: false,
            }))
        })
    }

    register() {
        this.setState((prevState, props) => ({
            loginData: prevState.loginData,
            registerData: prevState.registerData,
            status: null,
            isLoading: true,
        }))
        axios.post(`${BASE_URL}/register`, {
            user_name: this.state.registerData.userName,
            email: this.state.registerData.email,
            password: this.state.registerData.password
        }).then(response => {
            let body = response.data;
            this.setState((prevState, props) => ({
                loginData: prevState.loginData,
                registerData: prevState.registerData,
                status: { message: body.message, error: body.status === "ok" },
                isLoading: false,
            }))
        })
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-field-container">
                    <span className="login-label">Email:</span>
                    <input type="text" className="login-input" onChange={(event) => {
                        this.setState((prevState, props) => ({
                            registerData: {
                                email: event.target.value,
                                password: prevState.registerData.password,
                                userName: prevState.registerData.userName
                            },
                            loginData: prevState.loginData,
                            status: prevState.status,
                            isLoading: prevState.isLoading
                        }))
                    }} />

                    <span className="login-label">Password:</span>
                    <input type="password" className="login-input" onChange={(event) => {
                        this.setState((prevState, props) => ({
                            registerData: {
                                email: prevState.registerData.email,
                                password: event.target.value,
                                userName: prevState.registerData.userName
                            },
                            loginData: prevState.loginData,
                            status: prevState.status,
                            isLoading: prevState.isLoading
                        }))
                    }} />

                    <span className="login-label">User Name:</span>
                    <input type="text" className="login-input" onChange={(event) => {
                        this.setState((prevState, props) => ({
                            registerData: {
                                email: prevState.registerData.email,
                                password: prevState.registerData.password,
                                userName: event.target.value
                            },
                            loginData: prevState.loginData,
                            status: prevState.status,
                            isLoading: prevState.isLoading
                        }))
                    }} />

                    <button className="login-button" onClick={(event) => { this.register() }}>Register</button>
                </div>

                <div className="login-field-container">
                    <span className="login-label">Email:</span>
                    <input type="text" className="login-input" onChange={(event) => {
                        this.setState((prevState, props) => ({
                            loginData: {
                                email: event.target.email,
                                password: prevState.loginData.password,
                            },
                            registerData: prevState.registerData,
                            status: prevState.status,
                            isLoading: prevState.isLoading
                        }))
                    }} />

                    <span className="login-label">Password:</span>
                    <input type="password" className="login-input" onChange={(event) => {
                        this.setState((prevState, props) => ({
                            loginData: {
                                email: prevState.loginData.email,
                                password: event.target.value,
                            },
                            registerData: prevState.registerData,
                            status: prevState.status,
                            isLoading: prevState.isLoading
                        }))
                    }} />

                    <button className="login-button" onClick={(event) => { this.login() }}>Login</button>
                </div>

                {this.state.isLoading && <div className="progress-bar"></div>}
            </div>

        )
    }


}