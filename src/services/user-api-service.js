import config from '../config';
import TokenService from './token-service';

//CRUD operations for the users API endpoint
const HighLowUserService = {
    getUsers() {
        return fetch(`${config.API_ENDPOINT}/users`, {
            headers: {},
        })
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            );
    },
    getUserById(id) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            );
    },
    patchUser(id, user_name, bank) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                user_name,
                bank
            })
        });
    },
    deleteUser(id) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        });
    }
};

export default HighLowUserService;