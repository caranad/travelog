import React, { Component } from 'react';
import Modal from '../ProfileModal/Modal';
import Review from '../Review/Review';
import Sidebar from '../Sidebar/Sidebar';

import ReviewService from '../../services/review/review'
import UserService from '../../services/users/users';

import UpdateModal from '../../modal_templates/UpdateModal';
import './Profile.css';

export default class Reviews extends Component {
    constructor() {
        super();

        this.state = {
            reviews: [],
            user: {
                username: '',
                firstname: '',
                lastname: '',
                joined_date: '',
            }
        }

        this.changed = this.changed.bind(this);
        this.updated = this.updated.bind(this);
        this.openModal = this.openModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

        this.reviewService = new ReviewService();
        this.userService = new UserService();
    }

    componentDidMount() {
        this.reviewService.getReview({ username: JSON.parse(localStorage.getItem("user")).username }).then((response) => {
            this.setState({ reviews: response.data.reviews });
        })

        this.setState({ user: JSON.parse(localStorage.getItem("user")) })
    }

    changed(id) {
        const reviews = this.state.reviews.filter(review => review._id !== id);
        this.setState({ reviews });
    }

    updated(user) {
        localStorage.setItem("user", user);
        this.setState({ user: JSON.parse(user) });
    }

    deleteUser() {
        if (window.confirm("Are you sure you want to delete your user? This is irreversible!")) {
            this.userService.deleteUser(JSON.parse(localStorage.getItem("user")).username).then((response) => {
                if (response.data.success) {
                    localStorage.setItem("user", response.data.user);
                    this.props.history.push('/');
                }
            })
        }
    }

    openModal() {
        document.querySelector(".modal").style.display="flex";
    }

    uploadImage(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('avatar', event.target.files[0]);
        formData.append('username', JSON.parse(localStorage.getItem("user")).username);
        this.userService.uploadImage(formData).then((response) => {
            localStorage.setItem("user", response.data.user);
            this.setState({ user: JSON.parse(response.data.user) })
        })
    }

    deleteImage(event) {
        this.userService.updateUser(JSON.parse(localStorage.getItem("user")).username, { img_url: '' }).then((response) => {
            localStorage.setItem("user", response.data.user)
            this.setState({ user: { img_url: '' }})
        })
    }

    render() {
        return localStorage.getItem("user") ? (
            <div className="travelog_container">
                <Modal 
                    template={ <UpdateModal default={this.state.user} changed={ this.updated }/> } 
                    title={ "Update User" }
                />
                <Sidebar/>

                <div className="travelog_pf_container">
                    <h1>My Profile</h1>
                    <p>{this.state.test}</p>

                    { /* Convert this into its own component */ }
                    <div className="travelog_profile">
                        <div className="travelog_profile_data">
                            <div className="travelog_profile_pic">
                                <img src={ this.state.user.img_url ? this.state.user.img_url : "https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png" }></img>
                                {
                                    this.state.user.img_url ? 
                                    <button className="primary" onClick={this.deleteImage}>Remove Image</button> :
                                    <input type="file" name="avatar" onChange={ this.uploadImage } />
                                }
                            </div>
                            <div className="travelog_profile_info">
                                <section>
                                    <div className="travelog_table_cat">Name</div>
                                    <div className="travelog_table_val">{ this.state.user.firstname } { this.state.user.lastname }</div>
                                </section>
                                <section>
                                    <div className="travelog_table_cat">Active Since</div>
                                    <div className="travelog_table_val">{ this.state.user.joined_date }</div>
                                </section>
                                <section>
                                    <div className="travelog_table_cat">Location</div>
                                    <div className="travelog_table_val">{ this.state.user.location }</div>
                                </section>
                                <section>
                                    <div className="travelog_table_cat">Reviews</div>
                                    <div className="travelog_table_val">{ this.state.reviews.length }</div>
                                </section>
                                <section>
                                    <button className="success" onClick={ this.openModal }>Edit</button>
                                    <button className="danger" onClick={ this.deleteUser }>Delete</button>
                                </section>
                            </div>
                        </div>
                    </div>

                    { /* Convert this into its own component */ }
                    <div className="travelog_my_reviews">
                        <h1>My Reviews</h1>
                        {
                            this.state.reviews.map((data, i) => {
                                return (
                                    <Review review = {data} key={i} deleted={this.changed}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        ) : null;
    }
}