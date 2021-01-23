import axios from 'axios';
import { User } from './user';

class UserService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/users';
    }
    getLogin(): Promise<User> {
        // withCredentials sends our cookies with the request.
        return axios.get(this.URI+'/login', {withCredentials: true}).then(result=>{
            console.log(result);
            return result.data
        });
    }

    register(user: User): Promise<User>{
        return axios.post(this.URI, user, {withCredentials: true}).then(result => result.data).catch(err => err);
    }

    getUserByName(user: User): Promise<User> {
        return axios.get(this.URI+'/login'+'/'+user.username, {withCredentials: true}).then(result => result.data).catch(err => err);
    }
    
    /* logout(): Promise<null> {
        return axios.delete(this.URI, {withCredentials: true}).then(result => null);
    } */
}

export default new UserService();