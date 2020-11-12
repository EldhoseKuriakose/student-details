import { StudentActionTypes } from './student.types';
import { v4 as uuid } from 'uuid';

const INITIAL_STATE = {
    studentData: [
        {   
            id: uuid(),
            firstName: "John",
            lastName: "Joseph",
            email: "joseph@gmail.com",
            mobile: 1111111111,
            dob: "1988-05-21",
            gender: "Male",
            city: "Hyderabad",
            language: ["English"]
        },
        {
            id: uuid(),
            firstName: "AB",
            lastName: "CD",
            email: "abcd@gmail.com",
            mobile: 9999999999,
            dob: "1999-01-09",
            gender: "Female",
            city: "Mumbai",
            language: ["Hindi"]
        },
        {
            id: uuid(),
            firstName: "Rahul",
            lastName: "Dravid",
            email: "rahul@gmail.com",
            mobile: 2222222222,
            dob: "1990-01-09",
            gender: "Male",
            city: "Pune",
            language: ["Hindi"]
        },
        {
            id: uuid(),
            firstName: "Sachin",
            lastName: "Tendulkar",
            email: "sachin@gmail.com",
            mobile: 9999999955,
            dob: "1999-10-25",
            gender: "Male",
            city: "Mumbai",
            language: ["Hindi"]
        },
        {
            id: uuid(),
            firstName: "AB",
            lastName: "De Villiers",
            email: "abd@gmail.com",
            mobile: 1717171717,
            dob: "1980-01-09",
            gender: "Male",
            city: "Ernakulam",
            language: ["English", "Hindi"]
        },
        {
            id: uuid(),
            firstName: "Jennifer",
            lastName: "CD",
            email: "jennifer@gmail.com",
            mobile: 3333333333,
            dob: "1995-04-10",
            gender: "Female",
            city: "Chennai",
            language: ["English"]
        }
    ],

}

const studentReducer = (state = INITIAL_STATE, { type, payload }) => {
    switch(type) {
        case StudentActionTypes.ADD_STUDENT:
            return {
                ...state,
                studentData: [...state.studentData, payload]
            }
        case StudentActionTypes.REMOVE_STUDENT:
            return {
                ...state,
                studentData: state.studentData.filter(student => student.id !== payload)
            }
        case StudentActionTypes.UPDATE_STUDENT:
            return {
                ...state,
                studentData: state.studentData.map(student => (
                    (student.id === payload.id)
                    ?   payload
                    :   student
                ))
            }
        default:
            return state;
    }
}

export default studentReducer;