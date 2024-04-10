// import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Task, TaskContext } from "../TaskContext";
import React, { useContext } from "react";
import { Button, ButtonGroup, Checkbox } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

export default function TaskTable() {
const { open, setOpen, editing, tasks, setTasks, setEditing, setIndexTaskEdit } = useContext(TaskContext);

const handleCheckBoxClick = ()=>{
  console.log("clicked checkbox")
}

const handleDelete = (index) => {
  // Create a copy of the tasks array to avoid mutation
  const newTasks = [...tasks];
  // Remove the task at the specified index
  newTasks.splice(index, 1);

  // Update the tasks state with the modified array
  setTasks(newTasks);
};

const handleCheckBox = (index, task) => {
  // Toggle the completion status of the task
  const updatedTask = {
    ...task,
    isCompleteCheckBox: !task.isCompleteCheckBox,
  };

  // Update the task in the array
  const updatedTasks = [...tasks];
  updatedTasks[index] = updatedTask;

  // Set the updated tasks array to the state
  setTasks(updatedTasks);
};

const handleUpdate = (index)=>{
  setOpen(true);
  setEditing(true);
  setIndexTaskEdit(index);
  console.log('this is the index ', index)
}


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
            {tasks && tasks.map((task, index) => (
              <TableRow
                key={task.title}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {task.title}
                </TableCell>
                <TableCell align="center">{task.description}</TableCell>
                <TableCell align="center">{task.deadline}</TableCell>
                <TableCell align="center">{task.priority}</TableCell>
                <TableCell align="center">
                <Checkbox
                  checked={task.isCompleteCheckBox} // Reflect the actual value
                  onChange={() => handleCheckBox(index, task)}
                  inputProps={{ "aria-label": "controlled" }}
                />
                </TableCell>
                <TableCell align="center">

                <ButtonGroup orientation="vertical" aria-label="Vertical button group">
          <Button
            onClick={()=>handleUpdate(index)}
            variant="contained"
            startIcon={<EditIcon />}
          >
            UPDATE
          </Button>
          {!task.isCompleteCheckBox && (
            <Button
              variant="contained"
              color="error"
              startIcon={<CancelRoundedIcon />}
              onClick={()=>handleDelete(index)}
            >
              DELETE
            </Button>
          )}
        </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
