// import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Checkbox } from "@mui/material";
import { useState } from "react";
import { AddingContext } from "../App";
import { EditingContext } from "../App";
import React, { useContext } from "react";

function createData(
  title: string,
  description: string,
  deadline: number,
  priority: string,
  isCompleteCheckBox: React.ReactNode,
  action: React.ReactNode
) {
  return { title, description, deadline, priority, isCompleteCheckBox, action };
}




export default function TaskTable() {

const [open, setOpen] = useContext(AddingContext);
const { editing, tasks, setTasks, setEditing } = useContext(EditingContext);


const [isChecked, setIsChecked] = useState(false);

  const task = [
    createData(
      "Sleeping",
      "8 hours",
      9,
      "med",
      <Checkbox
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
          console.log(isChecked);
        }}
        inputProps={{ "aria-label": "controlled" }}
      />,
        <ButtonGroup orientation="vertical" aria-label="Vertical button group">
          <Button
            onClick={() => {
                setOpen(true);
                setEditing(true);
              console.log(open);
            }}
            variant="contained"
            startIcon={<EditIcon />}
          >
            UPDATE
          </Button>

          {!isChecked && (
            <Button
              variant="contained"
              color="error"
              startIcon={<CancelRoundedIcon />}
            >
              DELETE
            </Button>
          )}
        </ButtonGroup>
    ),
  ];


  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <strong>Title</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Description</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Deadline</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Priority</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Is Complete</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((row) => (
              <TableRow
                key={row.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.deadline}</TableCell>
                <TableCell align="center">{row.priority}</TableCell>
                <TableCell align="center">{row.isCompleteCheckBox}</TableCell>
                <TableCell align="center">{row.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
