import React, { useEffect, useState } from 'react';
import { ThreadState, UserState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    ImageBackground,
    View,
} from 'react-native';
import style from './homestyle';
import { Icon, SearchBar } from 'react-native-elements';
import { FlatList } from 'react-native';
import { getThreads } from '../store/actions';
import ThreadTableComponent from '../threads/threadtable.component';
import threadService from '../threads/thread.service';
import { Thread } from '../threads/thread';
import DropDownPicker from 'react-native-dropdown-picker';
import image from './alien.jpg';

// Function Component
interface HomeProp {
    navigation: any;
}

interface ThreadProp {
    data: Thread
}

function HomeComponent({ navigation }: HomeProp) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const selectThread = (state: ThreadState) => state.threads;
    let threads = useSelector(selectThread);

    let [q2, q2setter] = useState("");
    let [qchooser, qchoosersetter] = useState("");
    let [a, achooser] = useState(0);

    useEffect(() => {
        handleStuff()
    }, [q2]);

    function createNewThread() {
        navigation.navigate('NewThread');
    }

    function handleStuff() {
        console.log("hello");
        // settest(1);
        let th: any;
        threadService.getAllThreads().then((result) => {
            th = result;
            populateThreads(th);
        });
    }

    function populateThreads(thr: any) {
        console.log("calling populate thread");
        let temp: Thread[] = [];
        thr.forEach((row: Thread) => {
            temp.push(row);
        })
        threads = temp;
        dispatch(getThreads(threads));
    }

    function refresh() {
        handleStuff();
    }
    
    function checkfilter(thread: Thread) {
        if (qchooser == "Thread Title") {
            if (threads.includes(thread) && thread.threadname.includes(q2)) {
                return true;
            } else {
                return false;
            }
        } else if (qchooser == "Author") {
            if (threads.includes(thread) && thread.username.includes(q2)) {
                return true;
            } else {
                return false;
            }
        } else if (qchooser == "Category") {
            if (threads.includes(thread) && thread.threadcategory.includes(q2)) {
                return true;
            } else {
                return false;
            }
        } else if (qchooser == "Tags") {
            if (threads.includes(thread) && thread.tags.includes(q2)) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }

    }

    return (
        <ImageBackground source={image} style={[style.image]}>
            <View style={[style.homeContainer]}>
                {user.username ? (
                    <Button onPress={createNewThread} title='Create New Thread' color='green' />
                ) : (
                        <></>
                    )}

                <DropDownPicker
                    items={[
                        { label: 'Thread Title', value: 'Thread Title', icon: () => <Icon name="flag" size={18} color="#900" /> },
                        { label: 'Author', value: 'Author', icon: () => <Icon name="flag" size={18} color="#900" /> },
                        { label: 'Category', value: 'Category', icon: () => <Icon name="flag" size={18} color="#900" /> },
                        { label: 'Tags', value: 'Tags', icon: () => <Icon name="flag" size={18} color="#900" /> },

                    ]}
                    defaultValue=""
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={(value) => {
                        console.log(value.value)
                        qchoosersetter(value.value)
                        console.log("changed category to: " + qchooser)

                    }
                    }
                />
                <SearchBar
                    style={[style.searchBar]}
                    onChangeText={(value) => {
                        q2setter(value);
                        console.log("Query Changed to: " + value);
                        value = q2;
                    }
                    }
                    value={q2}
                />
                <FlatList
                    data={threads}
                    renderItem={({ item }) => ((checkfilter(item) && <ThreadTableComponent data={item}></ThreadTableComponent>))}
                    keyExtractor={(item) => item.thread_id}
                />
                <Button onPress={refresh} title='Refresh Thread List' color='green' />

            </View>
        </ImageBackground>

    );
}


export default HomeComponent;
