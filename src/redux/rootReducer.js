import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import studentReducer from './student/student.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    student: studentReducer
});

export default rootReducer;