import React, { Component } from 'react';
import ReviewService from '../../services/review/review';
import './Review.css';

export default class Review extends Component {
    constructor() {
        super();

        this.deleteReview = this.deleteReview.bind(this);

        this.reviewService = new ReviewService();
    }

    deleteReview(id) {
        if (window.confirm("Are you sure you want to remove this review?")) {
            this.reviewService.deleteReview(id).then((response) => {
                if (response.data.success) {
                    this.props.deleted(id);
                }
            })
        }
    }

    render() {
        const review = this.props.review;

        return (
            <div className="travelog_review">
                {
                    review.username === JSON.parse(localStorage.getItem("user")).username ? 
                    <p className="travelog_review_close" onClick={ () => this.deleteReview(review._id) }>✖️</p> :
                    null
                }
                
                <p>
                    <b>User: </b>
                    { review.username }
                </p>
                <p>
                    <b>Location</b><br/>
                    { review.location }
                </p>
                <p>
                    <b>My Review</b><br/>
                    { review.content }
                </p>
                <p>
                    { "🌟".repeat(review.rating) }
                </p>
            </div>
        )
    }
}