import { useDispatch, useSelector } from 'react-redux';
import { ThreadState } from '../store/store';
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
import { addThread } from '../store/actions';
import { useEffect } from 'react';

export default function NewThreadComponent() {
    const dispatch = useDispatch();
    const th = useSelector((state: ThreadState) => state.thread);

    function submitThread() {

    }

    function seeComment() {

    }

    return (
        <View>
            <Text>Title: </Text>
            <TextInput style={style.input}
                onChangeText={(value) =>
                    dispatch(addThread({ ...th, title: value }))
                }
                value={th.title}>
            </TextInput>
            <br></br>
            <Text>Category: </Text>
            <TextInput style={style.input}
                onChangeText={(value) => 
                    dispatch(addThread({...th, category: value}))
                }
                value={th.category}>
            </TextInput>
            <br></br>
            <TextInput style={style.input} multiline numberOfLines={4}
                onChangeText={(value) => 
                    dispatch(addThread({...th, body: value}))
                }
                value={th.body}>      
            </TextInput>
            <Button onPress={seeComment} title='Comments' />
            <Button onPress={submitThread} title='Add Thread' color='#880022'/>
        </View>
    )
}