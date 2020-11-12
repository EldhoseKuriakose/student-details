import { StudentActionTypes } from './student.types';

export const addStudent = student => ({
    type: StudentActionTypes.ADD_STUDENT,
    payload: student
});

export const removeStudent = studentId => ({
    type: StudentActionTypes.REMOVE_STUDENT,
    payload: studentId
});

export const updateStudent = student => ({
    type: StudentActionTypes.UPDATE_STUDENT,
    payload: student
});