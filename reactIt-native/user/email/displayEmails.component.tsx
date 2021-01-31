import React, {useEffect} from 'react';
import emailService from '../email/email.service';
import { Button, View, Text } from 'react-native';
import { Email } from './email';
import {useNavigation} from '@react-navigation/native';
import {UserState, EmailState} from '../../store/store';
import {useSelector, useDispatch} from 'react-redux';
import {getAllBanned} from '../../store/actions';
import style from '../account/account-styles';


function DisplayEmailComponent() {
    const emailSelector = (state: EmailState) => state.emails;
    const emails = useSelector(emailSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        emailService.getAllBanned().then((emailAddresses) =>{
            dispatch(getAllBanned(emailAddresses));
            console.log(emails);
        });        
    }, []);

    return (
        <View>
            <br></br>
            <Text style = {style.text}>Banned Emails</Text>
            <br></br>
             {emails.map((email) => {
                    return (
                        <View key={email.address}>
                            <Text>{`Email Address: ${email.address}`}</Text>
                            <Text>{`Username: ${email.username}`}</Text>
                            <Text>{`Reason Banned: ${email.reason}`}</Text>
                            <Text>{`Banned by: ${email.bannedBy}`}</Text>
                            <Text>---------------------------------</Text>
                            <br></br>
                        </View>
                    );
                })}   
            <br></br>
        </View>
    );
}

export default DisplayEmailComponent;
