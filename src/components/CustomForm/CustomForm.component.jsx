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

export default function CustomForm() {
    const classes = useStyles();
    const cities = ['None', 'Mumbai', 'Pune', 'Bengalore', 'Hyderabad', 'Chennai', 'Ernakulam', 'Delhi', 'Jaipur'];
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [date, setDate] = useState('');
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
            setMobileValid(false);
        } else {
            setMobileValid(true);
        }
    }

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }

    const handleGenderChange = (e) => {
        if(e.target.checked) {
            setGender(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let submission = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            date: date,
            gender: gender,
            city: city,
            language: language
        }

        console.log(submission);

        axios.post(`http://localhost:3001/submit`, { submission })
            .then(res => {
                if(res.data.status === 200) {
                    console.log('submission successful');
                } else {
                    console.log('submission failed');
                }
            });
        handleReset(e);
    }

    const handleReset = (e) => {
        e.preventDefault();
        setFirstName('');
        setLastName('');
        setEmail('');
        setMobile('');
        setDate('');
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
                        <DatePicker value={date} handleDateChange={handleDateChange} />
                    </div>
                    <div className="radio-button-container">
                        <input type="radio" id="male" name="gender" onChange={(e) => handleGenderChange(e)} value="male" />
                        <label for="male">Male</label>&emsp;
                        <input type="radio" id="female" name="gender" onChange={(e) => handleGenderChange(e)} value="female" />
                        <label for="female">Female</label>&emsp;
                        <input type="radio" id="other" name="gender" onChange={(e) => handleGenderChange(e)} value="other" />
                        <label for="other">Other</label>
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
                        <label for="english">English</label>&emsp;
                        <input
                            type="checkbox" 
                            id="hindi" 
                            name="language"
                            checked={language.hindi} 
                            onChange={(e) => setLanguage({[e.target.value]: e.target.checked})}
                            value="hindi" 
                        />
                        <label for="hindi">Hindi</label>
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
                        firstName.length > 0 && lastName.length > 0 && email.length > 0 && gender.length > 0 && date.length > 0 && emailValid && mobileValid
                        ?   <button className='submission-allowed' onClick={(e) => handleSubmit(e)} type="submit">Save</button>
                        :   <button className='submit-button' disabled={true} type="submit">Save</button>
                    }
                    
                    <button className="reset-button" onClick={(e) => handleReset(e)}>Reset</button>
                </div>
            </form>
        </div>
    );
}
