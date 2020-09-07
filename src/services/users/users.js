import axios from 'axios';
import CONFIG from '../../config.json';

export default class UserService {
    constructor() { }

    getUser(username, password) {
        return axios.post(`${CONFIG.api_url}/api/login`, { username, password })
    }
}