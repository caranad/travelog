import axios from 'axios';
import CONFIG from '../../config.json';

export default class UserService {
    constructor() { }

    authenticateUser(username, password) {
        return axios.post(`${CONFIG.api_url}/api/login`, { username, password })
    }

    getUser(username) {
        return axios.get(`${CONFIG.api_url}/api/users/${username}`)
    }

    updateUser(username, data) {
        return axios.patch(`${CONFIG.api_url}/api/users/${username}`, data)
    }
}