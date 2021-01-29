import React from 'react';
import emailService from '../email/email.service';
import { Button, TextInput, View } from 'react-native';
import { Email } from './email';
import {useNavigation} from '@react-navigation/native';
import {UserState, EmailState} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';
import DisplayEmailComponent from './displayEmails.component';
import style from '../../global-styles';
import {changeEmail} from '../../store/actions';

export interface EmailProp {
    navigation: any;
}

function BanEmailComponent({navigation}: EmailProp) {
    const userSelector = (state: UserState) => state.user;
    const emailSelector = (state: EmailState) => state.email;
    const currUser = useSelector(userSelector);
    const email = useSelector(emailSelector);
    const dispatch = useDispatch();

    function submitForm() {
        console.log('prop');
        email.bannedBy = currUser.username;
        emailService.addEmailAddress(email).then((bannedEmail) => {
            dispatch(changeEmail(bannedEmail));
        });
        navigation.navigate('BannedEmails');

    }

    return (
        <View>
            <DisplayEmailComponent/>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(changeEmail({ ...email, address: value }))
                }                placeholder='Email Address'
            />
            <br></br>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(changeEmail({ ...email, username: value }))
                }                placeholder='Username'
            />
            <br></br>
            <TextInput
                style={style.input}
                onChangeText={(value) =>
                    dispatch(changeEmail({ ...email, reason: value }))
                }                placeholder='Reason for Ban'
            />
            <br></br>
            <Button onPress={submitForm} title='Submit' color='green' />
        </View>
    );
}

export default BanEmailComponent;
