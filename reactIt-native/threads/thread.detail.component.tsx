import React from 'react'
import { StackParams } from '../router/router.component';
import { RouteProp } from '@react-navigation/native';
import { View, Text } from 'react-native';
import styles from '../global-styles';

interface Props {
    route: RouteProp<StackParams, 'ThreadDetails'>;
}

export default function ThreadDetailComponent(props: Props) {
    const thr = props.route.params;
    console.log(thr);

    return (
        <View>
            <Text>hello</Text>
            {/* <Text>Author: {thr.username}</Text>
            <Text>Category: {thr.threadcategory}</Text>
            <Text>{thr.threaddescription}</Text>
            <Text>Tags: {thr.tags}</Text> */}
        </View>
    );
}