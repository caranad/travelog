import axios from 'axios';
import CONFIG from '../../config.json';

export default class UserService {
    constructor() { }

    authenticateUser(username, password) {
        return axios.post(`${CONFIG.api_url}/api/login`, { username, password })
    }

    uploadImage(data) {
        return axios.post(`${CONFIG.api_url}/api/upload`, data, { headers: 
            { 'content-type': 'multipart/form-data' }
        });
    }

    addUser(user) {
        return axios.post(`${CONFIG.api_url}/api/users`, user);
    }

    getUser(username) {
        return axios.get(`${CONFIG.api_url}/api/users/${username}`)
    }

    updateUser(username, data) {
        return axios.patch(`${CONFIG.api_url}/api/users/${username}`, data)
    }

    deleteUser(username) {
        return axios.delete(`${CONFIG.api_url}/api/users/${username}`);
    }
}