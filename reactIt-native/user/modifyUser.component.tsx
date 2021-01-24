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
} from 'react-native';
import style from '../global-styles';
import { User } from './user';
import {State} from 'react-native-gesture-handler';
//import styles from '../global-styles';

interface ModifyUserProp {
    navigation: any;
}

function ModifyUserComponent({ navigation }: ModifyUserProp) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();


    function submitForm() {
        userService.updateUser(user).then(() => {
            navigation.navigate('Login');
        });
        dispatch(changeUser(user));
        console.log(user);
    }

    return (
        <View style={[style.container, style.login]}>
            <Text>Username: </Text>
            <TextInput
                style={style.input}
                onChangeText= {(value) => {
                    user.username = value;
                    dispatch(registerAction({ ...user, username: value }))
                }}
                value={user.username}
            />
            <Text>Password: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, password: value }))
                }
                placeholder='Password Hidden'
            />
            <Text>Name: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, name: value }))
                }
                placeholder={user.name}
            />
            <Text>Email: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, email: value }))
                }
                placeholder={user.email}
            />
            <Text>Age: </Text>
            <TextInput
                
                style={style.input}
                onChangeText={(value) =>

                    dispatch(registerAction({ ...user, age: Number(value) }))
                }
            />
            <Text>Phone Number: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, phonenumber: value }))
                }
                placeholder={user.phonenumber}
            />
            <br></br>
            <Button onPress={submitForm} title='Update' color='#880022' />
        </View>
    )
}

export default ModifyUserComponent;
