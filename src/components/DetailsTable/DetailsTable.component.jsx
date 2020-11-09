import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './DetailsTable.styles.css';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DetailsTable({ studentdatas }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentdatas.map(studentdata => (
            <TableRow key={studentdata.id}>
              <TableCell>{studentdata.firstname}</TableCell>
              <TableCell>{studentdata.lastname}</TableCell>
              <TableCell>{studentdata.email}</TableCell>
              <TableCell>{studentdata.mobile}</TableCell>
              <TableCell>{studentdata.dob}</TableCell>
              <TableCell>{studentdata.gender}</TableCell>
              <TableCell>{studentdata.city}</TableCell>
              <TableCell>{studentdata.language}</TableCell>
              <TableCell><button className="edit-button table-buttons">Edit</button></TableCell>
              <TableCell><button className="delete-button table-buttons">Delete</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}