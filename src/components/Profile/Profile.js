import React, { Component } from 'react';
import Review from '../Review/Review';
import Sidebar from '../Sidebar/Sidebar';

import ReviewService from '../../services/review/review'
import UserService from '../../services/users/users';
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

    openModal() {
        document.querySelector(".modal").style.display="flex"
    }

    render() {
        return localStorage.getItem("user") ? (
            <div className="travelog_container">
                <Sidebar/>

                <div className="travelog_pf_container">
                    <h1>My Profile</h1>

                    { /* Convert this into its own component */ }
                    <div className="travelog_profile">
                        <div className="travelog_profile_data">
                            <div className="travelog_profile_pic">
                                <img src="https://racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png"></img>
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
                                    <div className="travelog_table_val">Toronto, Ontario</div>
                                </section>
                                <section>
                                    <div className="travelog_table_cat">Reviews</div>
                                    <div className="travelog_table_val">{ this.state.reviews.length }</div>
                                </section>
                                <section>
                                    <button className="success" onClick={ this.openModal }>Edit</button>
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