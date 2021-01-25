import React from 'react';
import userService from './user.service';
import { UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {changeLocale, changeUser, registerAction} from '../store/actions';
import {
    Button,
    TextInput,
    Text,
    View,
} from 'react-native';
import style from '../global-styles';
import welcomeName from '../router/navbar.component';
import I18n, { strings } from '../i18n';

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
        console.log(user);

    }

    return (
        <View style={[style.container, style.login]}>
            <Text>Password: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(changeUser({ ...user, password: value }))
                }
                placeholder='Password Hidden'
            />
            <br></br>
            <Text>Name: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) => 
                    dispatch(changeUser({ ...user, name: value }))
                }
                placeholder={user.name}
            />
            <br></br>
            <Text>Email: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(changeUser({ ...user, email: value }))
                }
                placeholder={user.email}
            />
            <br></br>
            <Text>Age: </Text>
            <TextInput
                
                style={style.input}
                onChangeText={(value) =>

                    dispatch(changeUser({ ...user, age: Number(value) }))
                }
            />
            <br></br>
            <Text>Phone Number: </Text>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(changeUser({ ...user, phonenumber: value }))
                }
                placeholder={user.phonenumber}
            />
            <br></br>
            <Text>Language Options: </Text>
            {I18n.locale === 'fr' ? (
                <Button
                    onPress={() => {
                        I18n.locale = 'en';
                        dispatch(changeLocale('en'))
                    }}
                    title='EN'
                />
            ) : (
                <Button
                    onPress={() => {
                        I18n.locale = 'fr';
                        dispatch(changeLocale('fr'))
                    }}
                    title='FR'
                />
            )}
            <br></br>
            <Button onPress={submitForm} title='Update' color='#880022' />
        </View>
    )
}

export default ModifyUserComponent;
