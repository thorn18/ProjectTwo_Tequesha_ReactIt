import { Thread } from './thread';
import { useDispatch, useSelector } from 'react-redux';
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

function NewThreadComponent() {
    const dispatch = useDispatch();

    return (
        <View> 
            <Text>Title</Text>
            <TextInput style={style.input}
                onChangeText={(value) =>
                    dispatch(registerAction({ ...user, name: value }))
                }
                value={user.name}></TextInput>
        </View>
    )
}