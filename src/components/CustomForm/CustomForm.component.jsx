import React, { useState } from 'react';
import axios from 'axios';
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
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [language, setLanguage] = useState({english: false, hindi: false});
    const [emailValid, setEmailValid] = useState(true);
    const [mobileValid, setMobileValid] = useState(true);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if(firstName.length > 0 && lastName.length > 0 && email.length > 0 && mobile.length > 0 && dob.length > 0 && emailValid && mobileValid) {
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

                axios.post(`http://localhost:3001/update`, { submission })
                .then(res => {
                    if(res.data.status === 200) {
                        console.log('submission successful');
                    } else {
                        console.log('submission failed');
                    }
                });
            } else {
                let submission = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    mobile: mobile,
                    dob: dob,
                    gender: gender,
                    city: city,
                    language: language
                }
        
                axios.post(`http://localhost:3001/submit`, { submission })
                    .then(res => {
                        if(res.data.status === 200) {
                            console.log('submission successful');
                        } else {
                            console.log('submission failed');
                        }
                    });
            }
            handleReset(e);
        }  
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
                            checked={language.english} 
                            onChange={(e) => setLanguage({[e.target.value]: e.target.checked})} 
                            value="english" 
                        />
                        <label htmlFor="english">English</label>&emsp;
                        <input
                            type="checkbox" 
                            id="hindi" 
                            name="language"
                            checked={language.hindi} 
                            onChange={(e) => setLanguage({[e.target.value]: e.target.checked})}
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
                <div className="form-button-container">
                    {
                        studentDetails
                        ?   <button className='submission-allowed' onClick={(e) => handleSubmit(e)} type="submit">Update</button>
                        :   firstName.length > 0 && lastName.length > 0 && email.length > 0 && mobile.length > 0 && dob.length > 0 && emailValid && mobileValid
                            ?   <button className='submission-allowed' onClick={(e) => handleSubmit(e)} type="submit">Save</button>
                            :   <button className='submit-button' disabled={true} type="submit">Save</button>
                    }
                    
                    <button className="reset-button" onClick={(e) => handleReset(e)}>Reset</button>
                </div>
            </form>
        </div>
    );
}
