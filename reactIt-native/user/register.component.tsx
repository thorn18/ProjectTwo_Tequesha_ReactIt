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

    useEffect(() => {
        // Check to see if we're already logged in. Redirect if we are.
        userService
            .getLogin()
            .then((loggedUser) => {
                dispatch(getUser(loggedUser));
                navigation.navigate('Placeholder');
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function submitForm() {

        userService.register(user).then((user) => {
            console.log(user);
            dispatch(getUser(user));
            navigation.navigate('Login');
        });
    }
    function handle() {
        alert('press');
    }
    function longHandle(){
        alert('long press');
    }
    return (
        <View style={[style.container, style.login]}>
            <Text>Username: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, name: value }))
                }
                value={user.name}
            />
            <Text>Password: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, password: value }))
                }
                value={user.name}
            />
            <Text>Name: </Text>
            <TextInput
                secureTextEntry={true}
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
                secureTextEntry={true}
                style={style.input}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, age: Number(value) }))
                }
                value={String(user.age)}
            />
            <Text>Phone Number: </Text>
            <TextInput
                secureTextEntry={true}
                style={style.input}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, phonenumber: value }))
                }
                value={''+ user.phonenumber}
            />
            <Button onPress={submitForm} title='Register' color='#880022' />
            <Text>{Platform.OS}</Text>
            {Platform.OS === 'android' ? (
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackground()}
                >
                </TouchableNativeFeedback>
            ) : (
                <TouchableHighlight onPress={handle} underlayColor='white'>
                </TouchableHighlight>
            )}
            <TouchableHighlight onLongPress={longHandle} underlayColor='white'>
            </TouchableHighlight>
        </View>
    );
}

export default RegisterComponent;
