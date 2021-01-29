import React, {useEffect} from 'react';
import emailService from '../email/email.service';
import { Button, View, Text } from 'react-native';
import { Email } from './email';
import {useNavigation} from '@react-navigation/native';
import {UserState, EmailState} from '../../store/store';
import {useSelector, useDispatch} from 'react-redux';
import {getAllBanned} from '../../store/actions';


function DisplayEmailComponent() {
    const emailSelector = (state: EmailState) => state.emails;
    const emails = useSelector(emailSelector);
    const dispatch = useDispatch();
    let allBanned: Email[] = [];

    useEffect(() => {
        emailService.getAllBanned().then((emailAddresses) =>{
            console.log('Banned Emails: ', emailAddresses);
            allBanned = emailAddresses;
            console.log('All Banned in useEffect: ', allBanned);
            dispatch(getAllBanned(emailAddresses));
            console.log('State: ', emails);
        });        
    }, []);

    
    console.log('All Banned: ', allBanned);
    console.log(emails);

    return (
        <View>
            <Text>Banned Emails</Text>
             {emails.map((email) => {
                    return (
                        <View key={email.address}>
                            <Text>{`Email Address: ${email.address}`}</Text>
                            <Text>{`Username: ${email.username}`}</Text>
                            <Text>{`Reason Banned: ${email.reason}`}</Text>
                            <Text>{`Banned by: ${email.bannedBy}`}</Text>
                            <br></br>
                        </View>
                    );
                })}   
            <br></br>
        </View>
    );
}

export default DisplayEmailComponent;
