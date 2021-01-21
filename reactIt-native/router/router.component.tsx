import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from '../user/login.component';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import NavBarComponent from './navbar.component';
import RestaurantDetailComponent from '../restaurant/restaurant.detail.component';
import TableComponent from '../restaurant/table.component';
import { Restaurant } from '../restaurant/restaurant';
import { GrubState } from '../store/store';
import { useSelector } from 'react-redux';

/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
    Login: undefined;
    RestaurantDetail: Restaurant;
    Restaurants: undefined;
};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Text>GrubDash: Your Food Very Slowly</Text>,
    headerRight: () => <NavBarComponent />,
};
function RouterComponent(props: any) {
    const rest = useSelector((state: GrubState) => state.restaurant);
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name='Login'
                component={LoginComponent}
                options={headerOptions}
            />
            <Stack.Screen
                name='RestaurantDetail'
                component={RestaurantDetailComponent}
                options={headerOptions}
                initialParams={rest}
            />
            {/* RestaurantListComponent */}
            <Stack.Screen
                name='Restaurants'
                component={TableComponent}
                options={headerOptions}
            />
        </Stack.Navigator>
    );
}

export default RouterComponent;
