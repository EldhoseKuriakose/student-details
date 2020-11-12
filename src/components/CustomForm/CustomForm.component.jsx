import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addStudent, updateStudent } from '../../redux/student/student.actions';
import Loader from '../Loader/Loader.component';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DatePicker from '../DatePicker/DatePicker.component';
import './CustomForm.styles.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function CustomForm({ studentDetails }) {
    const classes = useStyles();
    const cities = ['None', 'Mumbai', 'Pune', 'Bengalore', 'Hyderabad', 'Chennai', 'Ernakulam', 'Delhi', 'Jaipur'];
    const [firstName, setFirstName] = useState(studentDetails ? studentDetails.student.firstName : '');
    const [lastName, setLastName] = useState(studentDetails ? studentDetails.student.lastName : '');
    const [email, setEmail] = useState(studentDetails ? studentDetails.student.email : '');
    const [mobile, setMobile] = useState(studentDetails ? studentDetails.student.mobile : '');
    const [dob, setDob] = useState(studentDetails ? studentDetails.student.dob : '');
    const [gender, setGender] = useState(studentDetails ? studentDetails.student.gender : '');
    const [city, setCity] = useState(studentDetails ? studentDetails.student.city : '');
    const [language, setLanguage] = useState([]);
    const [emailValid, setEmailValid] = useState(true);
    const [mobileValid, setMobileValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [failed, setFailed] = useState(false);
    const addStud = useDispatch();
    const updateStud = useDispatch();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    }

    const handleMobileChange = (e) => {
        setMobile(e.target.value);
        if(e.target.value.length === 10) {
            setMobileValid(true);
        } else {
            setMobileValid(false);
        }
    }

    const handleDateChange = (e) => {
        setDob(e.target.value);
    }

    const handleGenderChange = (e) => {
        if(e.target.checked) {
            setGender(e.target.value);
        }
    }

    const handleLanguageChange = (e) => {
        if(e.target.checked) {
            let newLang = language;
            newLang.push(e.target.value);
            setLanguage(newLang);
        } else {
            let temp = language.filter(lang => lang != e.target.value);
            setLanguage(temp);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if(studentDetails) {
            let submission = {
                id: studentDetails.student.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: mobile,
                dob: dob,
                gender: gender,
                city: city,
                language: language
            }

            updateStud(updateStudent(submission));
            setLoading(false);
            setSubmitted(true);

            // axios.post(`http://localhost:3001/update`, { submission })
            // .then(res => {
            //     if(res.data.status === 200) {
            //         setLoading(false);
            //         setSubmitted(true);
            //     } else {
            //         setLoading(false);
            //         setFailed(true);
            //     }
            // });
        } else {
            let submission = {
                id: uuid(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobile: mobile,
                dob: dob,
                gender: gender,
                city: city,
                language: language
            }

            addStud(addStudent(submission));
            setLoading(false);
            setSubmitted(true);
    
            // axios.post(`http://localhost:3001/submit`, { submission })
            //     .then(res => {
            //         if(res.data.status === 200) {
            //             setLoading(false);
            //             setSubmitted(true);
            //         } else {
            //             setLoading(false);
            //             setFailed(true);
            //         }
            //     });
        }
        handleReset(e);
        setTimeout(() => {  
            setSubmitted(false);
            setFailed(false);
        }, 5000); 
    }

    const handleReset = (e) => {
        e.preventDefault();
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobile('');
        setDob('');
    }

    return (
        <div className="custom-form-container">
            <form id="details-form" className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} variant="outlined" />
                <TextField id="outlined-basic" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} variant="outlined" /><br />
                <TextField id="outlined-basic" error={!emailValid} label="E-mail" value={email} onChange={(e) => handleEmailChange(e)} variant="outlined" />
                <TextField id="outlined-basic" type="number" error={!mobileValid} label="Mobile" value={mobile} onChange={(e) => handleMobileChange(e)} variant="outlined" /><br />
                <div className="date-gender-container">
                    <div className="date-picker-wrap">
                        <DatePicker value={dob} handleDateChange={handleDateChange} />
                    </div>
                    <div className="radio-button-container">
                        <input type="radio" id="male" name="gender" onChange={(e) => handleGenderChange(e)} value="male" />
                        <label htmlFor="male">Male</label>&emsp;
                        <input type="radio" id="female" name="gender" onChange={(e) => handleGenderChange(e)} value="female" />
                        <label htmlFor="female">Female</label>&emsp;
                        <input type="radio" id="other" name="gender" onChange={(e) => handleGenderChange(e)} value="other" />
                        <label htmlFor="other">Other</label>
                    </div>
                </div>
                <div className="language-city-container">
                    <div className="language-container">
                        <label>Languages :</label>&emsp;&emsp;
                        <input
                            type="checkbox" 
                            id="english" 
                            name="language"  
                            onChange={(e) => handleLanguageChange(e)} 
                            value="english" 
                        />
                        <label htmlFor="english">English</label>&emsp;
                        <input
                            type="checkbox" 
                            id="hindi" 
                            name="language"
                            onChange={(e) => handleLanguageChange(e)}
                            value="hindi" 
                        />
                        <label htmlFor="hindi">Hindi</label>
                    </div>
                    <TextField
                        id="outlined-select"
                        select
                        label="Select Location"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        SelectProps={{
                            native: true,
                        }}
                        variant="outlined"
                    >
                        {cities.map((option) => (
                            <option key={option} value={option.toLowerCase()}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                </div>
                {
                    loading
                    ?   <Loader />
                    :   submitted
                        ?   <div className="success-outer" id="success">
                                <span>
                                    <i className="material-icons">check</i>
                                    <p>Submitted</p>
                                </span>
                            </div>
                        :   failed
                                ?   <div className="failed-outer">
                                        <span>
                                            <i className="material-icons">error</i>
                                            <p>Submission failed</p>
                                        </span>
                                    </div>
                                :   <div className="form-button-container">
                                        {
                                            studentDetails
                                            ?   <button className='submission-allowed' onClick={(e) => handleSubmit(e)} type="submit">Update</button>
                                            :   firstName.length > 0 && lastName.length > 0 && email.length > 0 && mobile.length > 0 && dob.length > 0 && emailValid && mobileValid
                                                ?   <button className='submission-allowed' onClick={(e) => handleSubmit(e)} type="submit">Save</button>
                                                :   <button className='submit-button' disabled={true} type="submit">Save</button>
                                        }
                                        
                                        <button className="reset-button" onClick={(e) => handleReset(e)}>Reset</button>
                                    </div>
                }
            </form>
        </div>
    );
}
