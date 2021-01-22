
import docClient from '../conn/dynamo'; 
import * as User from '../../../reactIt-native/user/user';



export async function searchSingleUser(user:User.User):Promise<User.User|undefined> {
       let params =  {
        TableName: 'Users',
        Key: {
        'username': user.username,
                }
        }

         return await docClient.get(params).promise().then((data) => {
        if(data &&data.Item)
        return data.Item as User.User;

    });
}


