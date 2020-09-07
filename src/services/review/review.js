import axios from 'axios';
import CONFIG from '../../config.json';

export default class ReviewService {
    constructor() { }

    getReview(filter) {
        const params = filter ? filter : {};
        return axios.get(`${CONFIG.api_url}/api/reviews`, { params })
    }

    addReview(review) {
        return axios.post(`${CONFIG.api_url}/api/reviews`, review)
    }

    deleteReview(id) {
        return axios.delete(`${CONFIG.api_url}/api/reviews/${id}`);
    }
}