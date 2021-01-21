import {GrubState} from './store';
import {AppAction, getRestaurants} from './actions';
import {ThunkAction} from 'redux-thunk';
import restaurantService from '../restaurant/restaurant.service';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, GrubState, unknown, AppAction>;

export const thunkGetRestaurants = (): AppThunk => async dispatch => {
    const asyncResp = await restaurantService.getRestaurants();
    console.log('before thunk dispatch');
    dispatch(getRestaurants(asyncResp));
}