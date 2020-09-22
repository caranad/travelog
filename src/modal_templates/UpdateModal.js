import React from 'react';
import UserService from '../services/users/users';

export default class UpdateModal extends React.Component {
    constructor(props) { 
        super(props);
        this.updateUser = this.updateUser.bind(this);
        this.userService = new UserService();
    }

    validateUser(event) {
        if (!event.target.firstname.value || !event.target.lastname.value) {
            alert("You need a first and a last name!");
            return false;
        } else if (!event.target.location.value) {
            alert("You need to put in a location!");
            return false;
        }

        return true;
    }

    updateUser(event) {
        event.preventDefault();

        if (this.validateUser(event)) {
            const user = {
                firstname: event.target.firstname.value,
                lastname: event.target.lastname.value,
                location: event.target.location.value
            }
            
            this.userService.updateUser(JSON.parse(localStorage.getItem("user")).username, user).then((response) => {
                if (response.data) {
                    if (response.data.success) {
                        alert("Successfully updated user!");
                        this.props.changed(response.data.user);
                    }
                    document.querySelector(".modal").style.display = "none";
                }
            })
        }
    }

    render() {
        return (
            <form onSubmit={ this.updateUser }>
                <section>
                    <label htmlFor="firstname">First Name</label>
                    <input name="firstname" defaultValue={ this.props.default.firstname }/>
                </section>
                <section>
                    <label htmlFor="lastname">Last Name</label>
                    <input name="lastname" defaultValue={ this.props.default.lastname }/>
                </section>
                <section>
                    <label htmlFor="location">Location</label>
                    <input name="location" defaultValue={ this.props.default.location }/>
                </section>
                <section style={{ marginTop: "50px" }}>
                    <button type="submit" className="success">Update</button>
                </section>
            </form>
        )
    }
}