import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DatePicker({ value, handleDateChange }) {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
        <TextField
            id="date"
            label="Date of birth"
            type="date"
            defaultValue={value}
            onChange={(e) => handleDateChange(e)}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
        />
    </form>
  );
}