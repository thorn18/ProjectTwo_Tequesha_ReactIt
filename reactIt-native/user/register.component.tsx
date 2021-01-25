import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, registerAction } from '../store/actions';
import {
    Platform,
    Button,
    TextInput,
    Text,
    View,
    TouchableNativeFeedback,
    TouchableHighlight,
} from 'react-native';
import style from '../global-styles';

// Function Component
interface RegisterProp {
    navigation: any;
}
function RegisterComponent({ navigation }: RegisterProp) {
    const userSelector = (state: UserState) => state.registerUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    function submitForm() {

        userService.register(user).then((user) => {
            console.log(user);
            dispatch(getUser(user));
        });
        navigation.navigate('Login');

    }
    function handle() {
        alert('press');
    }
    function longHandle() {
        alert('long press');
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
                value={user.password}
            />
            <Text>Name: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, name: value }))
                }
                value={user.name}
            />
            <Text>Email: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, email: value }))
                }
                value={user.email}
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
                value={user.phonenumber}
            />
            <Button onPress={submitForm} title='Register' color='#880022' />

        </View>
    );
}

export default RegisterComponent;