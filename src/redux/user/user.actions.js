import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});

export const registerUser = user => ({
    type: UserActionTypes.REGISTER_USER,
    payload: user
});

export const logoutUser = () => ({
    type: UserActionTypes.LOGOUT_USER
});