import React, { Component } from 'react';
import UserService from '../../services/users/users';
import './Login.css'

export default class Login extends Component {
    constructor() {
        super();

        this.submit = this.submit.bind(this);
        this.userService = new UserService();
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
                        <button className="primary" type="submit">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}