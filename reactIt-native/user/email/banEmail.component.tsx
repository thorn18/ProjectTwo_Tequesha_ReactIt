import React from 'react';
import emailService from '../email/email.service';
import { Button, View } from 'react-native';
import { Email } from './email';
import {useNavigation} from '@react-navigation/native';
import {UserState} from '../../store/store';
import {useSelector} from 'react-redux';


function BanEmailComponent() {
    const userSelector = (state: UserState) => state.user;
    const currUser = useSelector(userSelector);
    const navigation = useNavigation();

    return (
        <View>

        </View>
    );
}

export default BanEmailComponent;
