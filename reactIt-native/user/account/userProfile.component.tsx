import React, { useEffect } from 'react';
import userService from '../user.service';
import { UserState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {changeUser, getUser, registerAction} from '../../store/actions';
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

interface ModifyUserProp {
    navigation: any;
}

function UserProfileComponent({ navigation }: ModifyUserProp) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    
    function goToModify(){
        navigation.navigate('ModifyUser');
    }

    return (
        <View style={[style.container, style.login]}>
            <br></br>
            <Text style={style.text}>{user.username}</Text>
            <br></br>
            <Image 
                source={{uri:'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'}}
                style = {{width: 100, height: 100}}
                />
            <br></br>
            <Text style={style.text}>Name: {user.name}</Text>
            <Text style={style.text}>Age: {user.age}</Text>
            <br></br>
            <Button onPress={goToModify} title='Modify Account' color='#880022' />
            <br></br>
            {user.role === 'Site Moderator' &&(
                <FindAccountComponent/>
            )}
        </View>
    )
}

export default UserProfileComponent;
