import React from 'react';
import UserService from '../services/users/users';

export default class RegisterModal extends React.Component {
    constructor() { 
        super();
        this.registerUser = this.registerUser.bind(this);
        this.userService = new UserService();
    }

    validateUser(event) {
        if (!event.target.username.value) {
            alert("You need a username!");
            return false;
        } else if (!event.target.firstname.value || !event.target.lastname.value) {
            alert("You need a first and a last name!");
            return false;
        } else if (!event.target.password.value) {
            alert("You need a password!");
            return false;
        } else if (!event.target.location.value) {
            alert("You need to put in a location!");
            return false;
        }

        return true;
    }

    registerUser(event) {
        event.preventDefault();

        if (this.validateUser(event)) {
            const user = {
                username: event.target.username.value,
                firstname: event.target.firstname.value,
                lastname: event.target.lastname.value,
                password: event.target.password.value,
                location: event.target.location.value,
            }
            
            this.userService.addUser(user).then(() => {
                document.querySelector(".modal").style.display = "none";
            })
        }
    }

    render() {
        return (
            <form onSubmit={ this.registerUser }>
                <section>
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name="firstname"/>
                </section>
                <section>
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" name="lastname"/>
                </section>
                <section>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"/>
                </section>
                <section>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password"/>
                </section>
                <section>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location"/>
                </section>
                <section style={{ marginTop: "50px" }}>
                    <button type="submit" className="success">Register</button>
                </section>
            </form>
        )
    }
}