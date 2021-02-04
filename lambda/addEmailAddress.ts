import * as AWS from 'aws-sdk';
import createresponse from './createresponse';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

export const handler = async (event: any): Promise<any> => {
    let email = JSON.parse(event.body);
    let resp = await addEmailAddress(email);
    
    if(resp){
        return createresponse('', 204);
    } else {
        return createresponse('', 400);
    }
}

async function addEmailAddress(email: Email): Promise<boolean> {
    const params = {
        TableName: 'emails',
        // Email address being put on banned list
        Item: email,
    };

    return await docClient.put(params).promise().then((result) => {
        return true;
    }).catch((error) => {
        console.log(error);
        return false;
    });
}

class Email{
    public address: string = '';
    public username: string = '';
    public reason: string = '';
    public bannedBy: string = '';
}