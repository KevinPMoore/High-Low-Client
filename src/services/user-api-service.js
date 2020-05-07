import config from '../config'
import TokenService from './token-service'

const HighLowUserService = {
    getUsers() {
        return fetch(`${config.API_ENDPOINT}/users`, {
            headers: {},
        })
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    },
    getUserById(id) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
            )
    },
    patchUser(id, bank) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                bank
            })
        })
    },
    deleteUser(id) {
        return fetch(`${config.API_ENDPOINT}/users/${id}`, {
            method: 'DELETE',
        })
    }
}

export default HighLowUserService;