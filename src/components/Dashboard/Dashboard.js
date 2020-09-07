import React, { Component } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Review from '../Review/Review';
import ReviewService from '../../services/review/review';
import './Dashboard.css';

export default class Dashboard extends Component {
    constructor() {
        super();

        this.reviewService = new ReviewService();

        this.state = {
            reviews: []
        }

        this.changed = this.changed.bind(this);
    }

    componentDidMount() {
        this.reviewService.getReview().then((response) => {
            this.setState({ reviews: response.data.reviews });
        })
    }

    changed(id) {
        const reviews = this.state.reviews.filter(review => review._id !== id);
        this.setState({ reviews });
    }

    render() {
        return localStorage.getItem("user") ? (
            <div className="travelog_container">
                <Sidebar/>
                
                <div className="travelog_db_reviews">
                    <h1>Dashboard</h1>

                    <div className="travelog_db_reviews_list">
                    {
                        this.state.reviews.map((data, i) => {
                            return (
                                <Review review={ data } key={ i } deleted={ this.changed }/>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        ) : null
    }
}