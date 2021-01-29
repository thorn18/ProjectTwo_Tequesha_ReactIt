import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreadState, UserState } from '../store/store';
import {
    Button,
    TextInput,
    Text,
    View,

} from 'react-native';
import style from './thread_table_style';
import { addThread, getThreads } from '../store/actions';
import { useNavigation } from '@react-navigation/native';
import threadService from './thread.service';

interface NewThreadProp{
    navigation: any
}

export default function NewThreadComponent({ navigation }: NewThreadProp) {
    const dispatch = useDispatch();
    const th = useSelector((state: ThreadState) => state.thread);
    const threads = useSelector((state: ThreadState) => state.threads);
    const user = useSelector((state: UserState) => state.user);
    const author = th.username = user.username;


    async function submitThread() {
        await threadService.insertThread(th);
        threads.push(th);
        dispatch(getThreads(threads));
        threadService.insertTags(th);
        navigation.navigate("Home");
    }

    return (
        <View>
            <Text>Author: {author}</Text>
            <br></br>
            <Text>Title: </Text>
            <TextInput style={style.t}
                onChangeText={(value) =>
                    dispatch(addThread({ ...th, threadname: value }))
                }
                value={th.threadname}>
            </TextInput>
            <br></br>
            <Text>Category: </Text>
            <TextInput style={style.t}
                onChangeText={(value) => 
                    dispatch(addThread({...th, threadcategory: value}))
                }
                value={th.threadcategory}>
            </TextInput>
            <br></br>
            <Text>Tags(Comma Seperated): </Text>
            <TextInput style={[style.t,style.tag]}
                onChangeText={(value) =>
                    {
                    dispatch(addThread({...th, tags: value.split(',')}))
                    }
                }
                value={th.tags.toLocaleString()}>
            </TextInput>
            <Text>{th.tags}</Text>
            <br></br>
            <TextInput style={style.t} multiline numberOfLines={4}
                onChangeText={(value) => 
                    dispatch(addThread({...th, threaddescription: value}))
                }
                value={th.threaddescription}>      
            </TextInput>
            <br></br>
            <Button onPress={submitThread} title='Add Thread' color='#880022'/>
        </View>
    )
}