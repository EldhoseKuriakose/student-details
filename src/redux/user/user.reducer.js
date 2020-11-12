import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: false,
    userDetails: [
        {
            firstName: "Jacob",
            lastName: "Abraham",
            email: "test@gmail.com",
            password: "test@123"
        },
    ],
    registered: false
}

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: state.userDetails.find(user =>
                    user.email === payload.email && user.password === payload.password
                )
            }
        case UserActionTypes.REGISTER_USER:
            return {
                ...state,
                userDetails: [...state.userDetails, payload],
                registered: true
            }
        case UserActionTypes.LOGOUT_USER:
            return {
                ...state,
                currentUser: false,
                registered: false
            }
        default:
            return state;
    }
}

export default userReducer;

