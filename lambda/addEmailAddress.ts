import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

interface MyEvent {
    body: string;
}

export const handler = async (event: MyEvent): Promise<any> => {
    let email: Email = JSON.parse(event.body) as Email;
    let resp = await addEmailAddress(email);
    
    if(resp){
        return {
            body: '',
            statusCode: 204,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    } else {
        return {
            body: '',
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
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