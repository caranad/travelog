import React, { Component } from 'react';
import UserService from '../../services/users/users';
import Modal from '../ProfileModal/Modal';
import RegisterModal from '../../modal_templates/RegisterModal'
import './Login.css'

export default class Login extends Component {
    constructor() {
        super();

        this.submit = this.submit.bind(this);
        this.register = this.register.bind(this);
        this.userService = new UserService();
    }

    register(e) {
        e.preventDefault();
        document.querySelector(".modal").style.display="flex";
    }

    submit(e) {
        e.preventDefault();

        this.userService.authenticateUser(e.target.username.value, e.target.password.value).then((response) => {
            if (response.data.isValid) { 
                localStorage.setItem("user", response.data.username)
                this.props.history.push('/dashboard');
            } else {
                alert("Invalid username or password. Please try again or register.")
            }
        })
    }

    render() {
        return (
            <div className="travelog_login_container center">
                <Modal 
                    template={ <RegisterModal/> } 
                    title={ "Register User" }
                />
                <div className="travelog_login center">
                    <img src="./images/logo-travelog.png"/>
                    <form onSubmit={ this.submit }>
                        <section>
                            <label htmlFor="username">Username</label>
                            <br/>
                            <input type="text" name="username"/>
                        </section>
                        <section>
                            <label htmlFor="password">Password</label>
                            <br/>
                            <input type="password" name="password"/>
                        </section>
                        <section>
                            <button className="primary" type="submit">Login</button>
                            <button className="success" onClick={this.register}>Register</button>
                        </section>
                    </form>
                </div>
            </div>
        )
    }
}