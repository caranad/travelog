import React, { Component } from 'react';
import UserService from '../../services/users/users';
import './Modal.css';

export default class Modal extends Component {
    constructor() {
        super();

        this.updateUser = this.updateUser.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.userService = new UserService();
    }

    updateUser(event) {
        event.preventDefault();

        const data = {
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            location: event.target.location.value
        };

        this.userService.updateUser(localStorage.getItem("user"), data).then((response) => {
            alert("User updated");
            document.querySelector(".modal").style.display = "none";
        })
    }

    closeModal(event) {
        event.preventDefault();
        document.querySelector(".modal").style.display = "none";
    }

    render() {
        return (
            <div className="modal center" ref={ this.element }>
                <div className="modal_content">
                    <h1>Update User</h1>

                    <form onSubmit={ this.updateUser }>
                        <section>
                            <label htmlFor="firstname">First Name</label>
                            <input name="firstname"/>
                        </section>
                        <section>
                            <label htmlFor="lastname">Last Name</label>
                            <input name="lastname"/>
                        </section>
                        <section>
                            <label htmlFor="location">Location</label>
                            <input name="location"/>
                        </section>
                        <section>
                            <button type="submit" className="success">Update</button>
                            <button className="danger" onClick={ this.closeModal }>Cancel</button>
                        </section>
                    </form>
                </div>
            </div>
        )
    }
}