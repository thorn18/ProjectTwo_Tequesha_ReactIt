import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

interface MyEvent {
    queryStringParameters: {'address':string};
}

export const handler = async (event: MyEvent) => {
    let address = event.queryStringParameters.address;
    const email = await getEmailAddress(address);
    if(email){
        return {
            body: JSON.stringify(email),
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        };
    } else {
        return {
            body: JSON.stringify({}),
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
    //return JSON.stringify(event);
}

async function getEmailAddress(address: string): Promise<Email | null> {
    // Look up by email address
    const params = {
        TableName: 'emails',
        Key: {
            'address': address
        }
    };
    return await docClient.get(params).promise().then((data) => {
        if (data && data.Item) {
            return data.Item as Email;
        } else {
            console.log("Promise Failed");
            return null;
        }
    })
}

class Email{
    public address: string = '';
    public username: string = '';
    public reason: string = '';
    public bannedBy: string = '';
}