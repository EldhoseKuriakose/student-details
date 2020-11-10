import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loader.styles.css';

const useStyles = makeStyles((theme) => ({
    root: {
            display: 'flex',
            '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function Loader() {
    const classes = useStyles();

    return (
        <div id="loader-container" className={classes.root}>
            <CircularProgress />
        </div>
    );
}