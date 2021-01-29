import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser, getUser, loginAction } from '../store/actions';
import {
    Button,
    TextInput,
    Text,
    View,
    ImageBackground,
} from 'react-native';
import style from './loginstyle';
import { User } from './user';
import image from './portal.jpg'

// Function Component
interface LoginProp {
    navigation: any;
}
function LoginComponent({ navigation }: LoginProp) {
    const userSelector = (state: UserState) => state.loginUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        // Check to see if we're already logged in. Redirect if we are.
        userService
            .getLogin()
            .then((loggedUser) => {
                dispatch(getUser(loggedUser));
                navigation.navigate('Home');
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    function submitForm() {
        userService.login(user).then((user) => {
            if (user?.accountstatus === 'deactivated') {
                alert('This account is currently deactivated.  Re-activate to continue.');
                navigation.navigate('ModifyUser');
            } else if (user?.accountstatus === 'moderator-deactivated') {
                dispatch(changeUser(new User));
                alert('Moderators have deactivated this account.')
                navigation.navigate('Login');
            } else {
                if (user) {
                    console.log('Login User: ', user);
                    navigation.navigate('Home');

                } else {
                    console.log("No user");
                    alert('Login Failed. Please Try Again.')
                }
                dispatch(getUser(user));
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    function register() {
        navigation.navigate('Register');
    }
    return (
        <ImageBackground source = {image} style={[style.image]}>
            <View style={[style.innercontainer]}>
                <Text style={style.text}>Username: </Text>
                <TextInput
                    style={style.input}
                    onChangeText={(value) =>
                        dispatch(loginAction({ ...user, username: value }))
                    }
                    value={user.username}
                />
                <Text style={style.text}>Password: </Text>
                <TextInput
                    secureTextEntry={true}
                    style={style.input}
                    onChangeText={(value) =>
                        dispatch(loginAction({ ...user, password: value }))
                    }
                    value={user.password}
                />

                <Button onPress={submitForm} title='Login' color='green' />
                <br></br>
                <Button onPress={register} title='Register' color='green' />
                {/* <Button onPress={home} title='Home(Temporary)' color='#880022' /> */}
            </View>
        </ImageBackground>

    );
    // TouchableNativeFeedback - Android specific api
    // TouchableHighlight - less specific version
}

export default LoginComponent;