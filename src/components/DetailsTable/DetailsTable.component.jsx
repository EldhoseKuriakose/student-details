import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './DetailsTable.styles.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DetailsTable({ studentdatas, handleEdit, handleDelete }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" stickyHeader={true} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>LastName</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Mobile</StyledTableCell>
            <StyledTableCell>DOB(yyyy-mm-dd)</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>City</StyledTableCell>
            <StyledTableCell>Language</StyledTableCell>
            <StyledTableCell>Edit</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentdatas.map(studentdata => (
            <StyledTableRow key={studentdata.id}>
              <StyledTableCell>{studentdata.firstName}</StyledTableCell>
              <StyledTableCell>{studentdata.lastName}</StyledTableCell>
              <StyledTableCell>{studentdata.email}</StyledTableCell>
              <StyledTableCell>{studentdata.mobile}</StyledTableCell>
              <StyledTableCell>{studentdata.dob}</StyledTableCell>
              <StyledTableCell>{studentdata.gender}</StyledTableCell>
              <StyledTableCell>{studentdata.city}</StyledTableCell>
              <StyledTableCell>{studentdata.language}</StyledTableCell>
              <StyledTableCell><button id={studentdata.id} className="edit-button table-buttons" onClick={(e) => handleEdit(e)}>Edit</button></StyledTableCell>
              <StyledTableCell><button className="delete-button table-buttons" onClick={(e) => handleDelete(e)}>Delete</button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}