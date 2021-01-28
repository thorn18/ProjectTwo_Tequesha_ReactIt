import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../conn/dynamo';
import { User } from "../../user/user"


class UserService {
    private doc: DocumentClient;
    constructor() {
        // The documentClient. This is our interface with DynamoDB
        this.doc = dynamo; // We imported the DocumentClient from dyamo.ts
    }

    async getUsers(): Promise<User[]> {
        const params = {
            TableName: 'users'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as User[];
        })
    }

    //getUser
    async getUserByName(username: string): Promise<User | null> {
        // GetItem api call allows us to get something by the key
        const params = {
            TableName: 'users',
            Key: {
                'username': username
            }
        };
        return await this.doc.get(params).promise().then((data) => {
            if (data && data.Item) {
                return data.Item as User;
            } else {
                console.log("Promise Failed");
                return null;
            }
        })
    }

    async addUser(user: User): Promise<boolean> {

        // object to be sent to AWS.
        const params = {
            // TableName - the name of the table we are sending it to
            TableName: 'users',
            // Item - the object we are sending
            Item: user,
            // ConditionExpression: '#username <> :username',
            // ExpressionAttributeNames: {
            //     '#username': 'username',
            //     //'#role': 'role'
            // },
            // ExpressionAttributeValues: {
            //     ':username': user.username,
            //     //':role': user.role
            // }
        };


        return await this.doc.put(params).promise().then((result) => {
            return true;
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }

    async  updateUser(user: User): Promise<boolean>{
        const params = {
            TableName: 'users',
            Key: {
                'username': user.username
            },
            UpdateExpression: 'set password = :password, email = :email, age = :age, phonenumber = :phonenumber, accountstatus = :accountstatus',
            ExpressionAttributeValues: {
                ':password': user.password,
                ':email': user.email,
                ':age': user.age,
                ':phonenumber': user.phonenumber,
                ':accountstatus': user.accountstatus,
            },
            ReturnValues: 'UPDATED_NEW'
            };
            return await this.doc.update(params).promise().then((data) => {
                return true;
            }).catch((err) => {
                console.log(err)
                return false;
            });
        }

        async deleteUser(username: string): Promise<Boolean> {
            const params = {
                TableName: 'users',
                Key: {
                    'username': username
                }
            }
            return await this.doc.delete(params).promise().then((data) => {
                return true;
            }).catch((err) => {
                return false;
            });
        }
}

const userService = new UserService();
export default userService;
