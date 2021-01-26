import React, { createRef, useRef } from 'react';
import { ForumState, UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    View,
} from 'react-native';
import style from './homestyle';
import { SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native';
import { getThreads, ThreadAction } from '../store/actions';
import ThreadDetailComponent from '../threads/threaddetail.component';
import threadService from '../threads/thread.service';


// Function Component
interface LoginProp {
    navigation: any;
}

interface ThreadProp {
    data: "hello";
}

function HomeComponent({ navigation }: LoginProp) {
    const userSelector = (state: UserState) => state.loginUser;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = React.useState('');
    const selectThread = (state: ForumState) => state.threads;
    const threads = useSelector(selectThread);

    //TODO: Utilize later for preferences
    // useEffect(() => {
    //     // Check to see if we're already logged in. Redirect if we are.
    //     userService
    //         .getLogin()
    //         .then((loggedUser) => {
    //             dispatch(getUser(loggedUser));
    //             navigation.navigate('Home');
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // }, []);

    function handleSearchInput() {
        // searchQuery = 
    }

    function createNewThread() {
        navigation.navigate('NewThread');
    }

    function handleStuff() {
        threadService.getAllThreads();

    }

    return (
        <View style={[style.homeContainer]}>
            <Button onPress={handleStuff} title='Get Threads' color='#880022' />

            <Button onPress={createNewThread} title='Create New Thread' color='#880022' />
            <SearchBar
                style={[style.searchBar]}
                onChangeText={(value) => {
                    console.log(searchQuery);
                    //DIspatch needs updating once Thread element exists.
                    dispatch(getThreads({ threads, searchQuery }));
                    value = searchQuery
                }
                }
            />
            {/* <FlatList
            data={threads}
            renderItem={({item}) => 
            (<ThreadDetailComponent data={item}></ThreadDetailComponent>)}
            keyExtractor={(item)=>item.name}
            /> */}
        </View>
    );
}

export default HomeComponent;
