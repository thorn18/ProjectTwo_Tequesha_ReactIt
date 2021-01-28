import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from '../user/login.component';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import NavBarComponent from './navbar.component';
import RegisterComponent from '../user/register.component';
import ModifyUserComponent from '../user/modifyUser.component';
import UserScreenComponent from '../user/userProfile.component';
import HomeComponent from './home.component';
import GetProfileComponent from '../user/getProfile.component';
import NewThreadComponent from '../threads/newthread.component';
import ThreadDetailComponent from '../threads/threadtable.component';

/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
    Login: undefined;
    Register: undefined;
    ModifyUser: undefined;
    Profile: undefined;
    SearchedProfile: undefined;
    Home:undefined;
};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Text>ReactIt: Your Favorite Online Forum</Text>,
    headerRight: () => <NavBarComponent />,
};
function RouterComponent(props: any) {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name='Login'
                component={LoginComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='Register'
                component = {RegisterComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='ModifyUser'
                component = {ModifyUserComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='Profile'
                component = {UserScreenComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='SearchedProfile'
                component = {GetProfileComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='Home'
                component = {HomeComponent}
                options={headerOptions}
            />
        </Stack.Navigator>
        
    );
}

export default RouterComponent;