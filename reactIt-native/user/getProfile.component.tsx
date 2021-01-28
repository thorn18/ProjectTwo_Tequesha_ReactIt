import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {changeUser, getUser, registerAction, searchUserAction} from '../store/actions';
import {
    Button,
    TextInput,
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native';
import style from './account-styles';
import FindAccountComponent from './findAccount.component';
import {User} from './user';
import {useNavigation} from '@react-navigation/native';
import AccountStatusComponent from './accountStatus.component';



function GetProfileComponent() {
    const userSelector = (state: UserState) => state.user;
    const searchUserSelector = (state: UserState) => state.searchUser;
    const currUser = useSelector(userSelector);
    const searchUser = useSelector(searchUserSelector);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    function goToModify(){
        navigation.navigate('ModifyUser');
    }

    return (
        <View style={[style.container, style.login]}>
            <br></br>
            {searchUser !== null &&(
                <>
                    {searchUser.accountstatus !== 'deactivated' &&(
                    <>
                        <Text style={style.text}>{searchUser.username}</Text>
                        <br></br>
                        <Image 
                            source={{uri:'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'}}
                            style = {{width: 100, height: 100}}
                            />
                        <br></br>
                        <Text style={style.text}>Name: {searchUser.name}</Text>
                        <Text style={style.text}>Age: {searchUser.age}</Text>
                        <br></br>
                        {currUser === searchUser &&(
                            <Button onPress={goToModify} title='Modify Account' color='#880022' />
                        )}
                        <br></br>
                        {currUser !== searchUser && currUser.role === 'Site Moderator' &&(
                            <AccountStatusComponent user={searchUser}/>
                        )}
                    </>
                    )}
                    {searchUser.accountstatus === 'deactivated' && (
                        <Text>This account has been deactivated</Text>
                    )}
                    {searchUser.accountstatus === 'moderator-deactivated' && currUser.role !== 'Site Moderator' &&(
                        <Text>This account has been deactivated</Text>
                    )}
                </>
            )}
            {searchUser === null &&(
                <Text>No account found</Text>
            )}

        </View>
    )
}

export default GetProfileComponent;
