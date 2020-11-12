import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/user/user.actions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUpPage() {
    const classes = useStyles();
    const regUser = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    }

    const handlePasswordChange = (e) => {
        if(e.target.id == 'password') {
            setPassword(e.target.value);
            if(e.target.value.length >= 8) {
                setPasswordValid(true);
            } else {
                setPasswordValid(false);
            }
        } else {
            setConfirmPassword(e.target.value);
            if(e.target.value === password) {
                setConfirmPasswordValid(true);
            } else {
                setConfirmPasswordValid(false);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let submission = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        regUser(registerUser(submission));

        // axios.post(`http://localhost:3001/register`, { submission })
        //     .then(res => {
        //         if(res.data.status === 200) {
        //             console.log('registration successful');
        //         } else {
        //             console.log('registration failed');
        //         }
        //     });
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                    />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            error={!emailValid}
                            value={email}
                            onChange={(e) => handleEmailChange(e)}
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            error={!passwordValid}
                            value={password}
                            onChange={(e) => handlePasswordChange(e)}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            error={!confirmPasswordValid}
                            value={confirmPassword}
                            onChange={(e) => handlePasswordChange(e)}
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled=
                        {
                            !(firstName.length > 0 
                            && lastName.length > 0 
                            && email.length > 0 
                            && password.length > 0 
                            && confirmPassword.length > 0
                            && emailValid 
                            && passwordValid 
                            && confirmPasswordValid)
                        }
                    className={classes.submit}
                    onClick={(e) => handleSubmit(e)}
                >
                    Sign Up
                </Button>
                <Grid container justify="center">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
        </Container>
    );
}