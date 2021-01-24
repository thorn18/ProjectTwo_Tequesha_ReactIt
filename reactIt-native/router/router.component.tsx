import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from '../user/login.component';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import NavBarComponent from './navbar.component';
import { ForumState } from '../store/store';
import { useSelector } from 'react-redux';
import RegisterComponent from '../user/register.component';
import ModifyUserComponent from '../user/modifyUser.component';

/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
    Login: undefined;
    Register: undefined;
    ModifyUser: undefined;
    /* RestaurantDetail: Restaurant;
    Restaurants: undefined; */
};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Text>ReactIt: Your Favorite Online Forum</Text>,
    headerRight: () => <NavBarComponent />,
};
function RouterComponent(props: any) {
    //const rest = useSelector((state: ForumState) => state.restaurant);
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
           
           {/*  <Stack.Screen
                name='RestaurantDetail'
                component={RestaurantDetailComponent}
                options={headerOptions}
                initialParams={rest}
            /> */}
            {/* RestaurantListComponent */}
            {/* <Stack.Screen
                name='Restaurants'
                component={TableComponent}
                options={headerOptions}
            /> */}
        </Stack.Navigator>
        
    );
}

export default RouterComponent;
