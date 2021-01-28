import React, { useEffect } from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser, getUser, loginAction } from '../store/actions';
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
import {User} from './user';

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
            if(user?.accountstatus === 'deactivated'){
                alert('This account is currently deactivated.  Re-activate to continue.');
                navigation.navigate('ModifyUser');
            } else if(user?.accountstatus === 'moderator-deactivated'){
                dispatch(changeUser(new User));
                alert('Moderators have deactivated this account.')
                navigation.navigate('Login');
            } else{
                if(user) {
                    console.log(user);
                    navigation.navigate('Home');
    
                } else {
                    console.log("No user");
                }
                dispatch(getUser(user));
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    function handle() {
        alert('why?');
    }
    function longHandle(){
        alert('long press');
    }

    function register(){
        navigation.navigate('Register');
    }

    function home() {
        navigation.navigate('Home');
    }

    return (
        <View style={[style.container, style.login]}>
            <Text>Username: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(loginAction({ ...user, username: value }))
                }
                value={user.username}
            />
            <Text>Password: </Text>
            <TextInput
                secureTextEntry={true}
                style={style.input}
                onChangeText={(value) =>
                    dispatch(loginAction({ ...user, password: value }))
                }
                value={user.password}
            />
            
            <Button onPress={submitForm} title='Login' color='#880022' />
            <br></br>
            <Button onPress={register} title='Register' color='#880022' />
            {/* <Button onPress={home} title='Home(Temporary)' color='#880022' /> */}
        </View>
    );
    // TouchableNativeFeedback - Android specific api
    // TouchableHighlight - less specific version
}

export default LoginComponent;