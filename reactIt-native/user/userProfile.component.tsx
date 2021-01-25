import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {changeUser, getUser, registerAction} from '../store/actions';
import {
    Button,
    TextInput,
    Text,
    View,
    StyleSheet,
    Image
} from 'react-native';
import style from '../global-styles';

interface ModifyUserProp {
    navigation: any;
}

function UserScreenComponent({ navigation }: ModifyUserProp) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    
    function goToModify(){
        navigation.navigate('ModifyUser');
    }

    return (
        <View style={[style.container, style.login]}>
            <Text>{user.username}</Text>
            <Image 
                source={{uri:'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'}}
                style = {{width: 100, height: 100}}
                />
            <Text>Name: {user.name}</Text>
            <Text>Age: {user.age}</Text>
            <br></br>
            <Button onPress={goToModify} title='Modify Account' color='#880022' />
        </View>
    )
}

export default UserScreenComponent;
