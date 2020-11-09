import React from 'react';
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

    return (
        <div className="custom-form-container">
            <form id="details-form" className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="First Name" variant="outlined" />
                <TextField id="outlined-basic" label="Last Name" variant="outlined" /><br />
                <TextField id="outlined-basic" label="E-mail" variant="outlined" />
                <TextField id="outlined-basic" label="Mobile" variant="outlined" /><br />
                <div className="date-gender-container">
                    <div className="date-picker-wrap">
                        <DatePicker />
                    </div>
                    <div className="radio-button-container">
                        <input type="radio" id="male" name="gender" value="male" />
                        <label for="male">Male</label>&emsp;
                        <input type="radio" id="female" name="gender" value="female" />
                        <label for="female">Female</label>&emsp;
                        <input type="radio" id="other" name="gender" value="other" />
                        <label for="other">Other</label>
                    </div>
                </div>
                <div className="language-container">
                    <label>Languages :</label>&emsp;&emsp;
                    <input type="checkbox" id="english" name="language" value="english" />
                    <label for="english">English</label>&emsp;
                    <input type="checkbox" id="hindi" name="language" value="hindi" />
                    <label for="hindi">Hindi</label>
                </div>
                <div className="form-button-container">
                    <button className="submit-button" type="submit">Save</button>
                    <button className="reset-button">Reset</button>
                </div>
            </form>
        </div>
    );
}
