import * as AWS from 'aws-sdk';

let docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-west-2',
    endpoint: 'http://dynamodb.us-west-2.amazonaws.com'
});

// AWS Lambda needs a Handler Function. In node, that handler function must be named 'handler'.
export async function handler() {
    const emails = await getBannedEmails();
    if(emails) {
        return {
            body: JSON.stringify(emails),
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
}

async function getBannedEmails(): Promise<Email[]> {
    const params = {
        TableName: 'emails'
    };
    return await docClient.scan(params).promise().then((data) => {
        return data.Items as Email[];
    })
}

class Email{
    public address: string = '';
    public username: string = '';
    public reason: string = '';
    public bannedBy: string = '';
}