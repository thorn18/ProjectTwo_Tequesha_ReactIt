import axios from 'axios';
import { Email } from './email';

class EmailService {
    private URI: string;
    constructor() {
        // URL of the express server
        this.URI = 'http://localhost:3000/emails';
    }
    
    // Add an email address to the list of emails banned from registration
    addEmailAddress(email: Email): Promise<Email>{
        return axios.post(this.URI+"/", email, {withCredentials: true}).then(result => result.data).catch(err => err);
    }


    getAllBanned(): Promise<Email[]>{
        return axios.get(this.URI, {withCredentials: true}).then(result => result.data).catch(err => err);
    }

    getEmailAddress(address: string): Promise<Email>{
        return axios.get(this.URI+'/'+address, {withCredentials: true}).then(result => result.data).catch(err => err);
    }
    deleteEmailAddress(address: string): Promise<null> {
        return axios.delete(this.URI+'/'+address).then(result => null)
    }

}

export default new EmailService();