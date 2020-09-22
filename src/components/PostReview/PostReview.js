import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ReviewService from '../../services/review/review';

import './PostReview.css';

export default class PostReview extends Component {
    constructor() {
        super();

        this.addReview = this.addReview.bind(this);
        this.validateReview = this.validateReview.bind(this);
        this.updateRating = this.updateRating.bind(this);

        this.reviewService = new ReviewService();

        this.state = {
            rating: 5
        }
    }

    updateRating(e) {
        this.setState({ rating: e.target.value })
    }

    validateReview(e) {
        if (!e.target.location.value) {
            alert("You are missing the location!");
            return false;
        }
        if (!e.target.review.value) {
            alert("Please provide your review");
            return false;
        }

        return true;
    }
    
    addReview(event) {
        event.preventDefault();

        if (this.validateReview(event)) {
            const review = {
                username: JSON.parse(localStorage.getItem("user")).username,
                location: event.target.location.value,
                content: event.target.review.value,
                rating: this.state.rating
            }
    
            this.reviewService.addReview({ review }).then((response) => {
                if (response.data && response.data.success) {
                    this.props.history.push('/dashboard');
                }
            })
        }
    }

    render() {
        return localStorage.getItem("user") ? (
            <div className="travelog_container">
                <Sidebar/>
                
                <div className="travelog_post_container">
                    <h1>Write Review</h1>
                    <form onSubmit = { this.addReview }>
                        <section>
                            <label htmlFor="location">Location</label>
                            <input type="text" name="location"></input>
                        </section>
                        <section>
                            <label htmlFor="review">Review</label>
                            <textarea name="review"></textarea>
                        </section>
                        <section>
                            <label htmlFor="rating">Rating</label>
                            <input type="range" min="0" max="5" step="1" onChange={ this.updateRating }/>{ this.state.rating }
                        </section>
                        <button className="primary" type="submit">Submit Review</button>
                    </form>
                </div>
            </div>
        ) : null;
    }
}