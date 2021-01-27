import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreadState } from '../store/store';
import {
    Button,
    TextInput,
    Text,
    View,

} from 'react-native';
import style from '../global-styles';
import { addThread } from '../store/actions';
import { useNavigation } from '@react-navigation/native';
import threadService from './thread.service';

interface NewThreadProp{
    navigation: any
}

export default function NewThreadComponent({ navigation }: NewThreadProp) {
    const dispatch = useDispatch();
    const th = useSelector((state: ThreadState) => state.thread);

    function submitThread() {
        threadService.insertThread();
        console.log('inserted');
        console.log(th);
    }

    function seeComment() {

    }

    return (
        <View>
            <Text>Title: </Text>
            <TextInput style={style.input}
                onChangeText={(value) =>
                    dispatch(addThread({ ...th, threadname: value }))
                }
                value={th.threadname}>
            </TextInput>
            <br></br>
            <Text>Category: </Text>
            <TextInput style={style.input}
                onChangeText={(value) => 
                    dispatch(addThread({...th, threadcategory: value}))
                }
                value={th.threadcategory}>
            </TextInput>
            <br></br>
            <TextInput style={style.input} multiline numberOfLines={4}
                onChangeText={(value) => 
                    dispatch(addThread({...th, threaddescription: value}))
                }
                value={th.threaddescription}>      
            </TextInput>
            <Button onPress={seeComment} title='Comments' />
            <br></br>
            <Button onPress={submitThread} title='Add Thread' color='#880022'/>
        </View>
    )
}