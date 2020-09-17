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
        this.openModal = this.openModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

        this.reviewService = new ReviewService();
        this.userService = new UserService();
    }

    componentDidMount() {
        this.reviewService.getReview({ username: localStorage.getItem("user") }).then((response) => {
            this.setState({ reviews: response.data.reviews });
        })

        this.userService.getUser(localStorage.getItem("user")).then((response) => {
            this.setState({ user: response.data.user });
        })
    }

    changed(id) {
        const reviews = this.state.reviews.filter(review => review._id !== id);
        this.setState({ reviews });
    }

    deleteUser() {
        if (window.confirm("Are you sure you want to delete your user? This is irreversible!")) {
            this.userService.deleteUser(localStorage.getItem("user")).then((response) => {
                if (response.data.success) {
                    localStorage.setItem("user", "");
                    window.location.href = "/login";
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
        formData.append('username', localStorage.getItem("user"));
        this.userService.uploadImage(formData).then((response) => {
            this.setState({ user: { img_url: `http://localhost:3001/api/upload/${response.data.img_url}` } })
        })
    }

    deleteImage(event) {
        this.userService.updateUser(localStorage.getItem("user"), { img_url: '' }).then((response) => {
            this.setState({ user: { img_url: '' }})
        })
    }

    render() {
        return localStorage.getItem("user") ? (
            <div className="travelog_container">
                <Modal 
                    template={ <UpdateModal default={this.state.user}/> } 
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