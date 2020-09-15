import React, { Component } from 'react';
import UserService from '../../services/users/users';
import './Modal.css';

export default class Modal extends Component {
    constructor() {
        super();

        this.closeModal = this.closeModal.bind(this);

        this.userService = new UserService();
    }

    closeModal(event) {
        document.querySelector(".modal").style.display = "none";
    }

    render() {
        return (
            <div className="modal center" ref={ this.element }>
                <div className="modal_backdrop"></div>
                <div className="modal_content">
                    <h1>{ this.props.title }</h1>
                    { this.props.template }
                    <p className="modal_close" onClick={ this.closeModal }>✖️</p>
                </div>
            </div>
        )
    }
}

{/* <form onSubmit={ this.submit }>
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
</form> */}