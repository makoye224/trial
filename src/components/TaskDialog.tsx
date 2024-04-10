import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { AppBar, Box, ButtonGroup, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Stack, Toolbar, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import React, { useContext } from 'react';
import { Task, TaskContext } from "../TaskContext";

export default function TaskDialog() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null); // Assuming you want a deadline field
  const [priority, setPriority] = useState("low"); // Assuming a default priority  
  const { open, setOpen, editing, tasks, setTasks, setEditing, indexTaskEdit } = useContext(TaskContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (editing && indexTaskEdit !== null) {
      const task = tasks[indexTaskEdit];
      setTitle(task.title);
      setDescription(task.description);
      setDate(null); 
      setPriority(task.priority);
    } else {
      // Reset the form if not editing
      setTitle('');
      setDescription('');
      setDate(null);
      setPriority("Low");
    }
  }, [editing, indexTaskEdit, tasks]);


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    // Construct a task object from the form fields
    const updatedTask = {
      title,
      description,
      deadline: formatDeadline(date), // Assuming you want to capture deadline
      priority,
      isCompleteCheckBox: false, // Assuming tasks start unchecked, adjust as needed
    };
  
    if (editing) {
      console.log('editing', indexTaskEdit)
      // If editing, replace the task at indexTaskEdit with updatedTask
      const updatedTasks = [...tasks]; // Create a copy of the tasks array
      updatedTasks[indexTaskEdit] = updatedTask; // Update the task at the specified index
      setTasks(updatedTasks); // Set the updated tasks array back to state
    } else {
      // If not editing, add the new task to the end of the tasks array
      setTasks([...tasks, updatedTask]);
    }
  
    // Reset form fields and close the dialog
    console.log("Form submitted");
    setTitle("");
    setDescription("");
    setDate(null);
    setPriority("low");
    handleClose();
  };
  

  const formatDeadline = (date) => {
    if (date) {
      return date.format("MMMM Do, YYYY"); // Example format: July 15th, 2024
    }
    return ""; // Display empty string if no deadline is selected
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>
          {editing ? "Edit Task" : "Add Task"}  {/* Change title based on editing state */}
        </DialogTitle>
        <DialogContent>
          <FormControl>
            <TextField
              error={false}
              helperText="Title is required!"
              id="title"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              placeholder="Title"
              required // Mark title field as required
            />
            <br />
            <TextField
              error={false}
              helperText="Description is required!"
              id="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              placeholder="Description"
            />
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Deadline"
                  value={date} // Pass the current deadline state to the DatePicker
                  onChange={(newValue) => {
                    setDate(newValue); // Update deadline state with the new selected date
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <br></br>
            <FormLabel id="demo-row-radio-buttons-group-label">
            Priority
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => setPriority(e.target.value)}  // Implicit onChange handler
          >
            <FormControlLabel value="Low" control={<Radio />} label="Low" />
            <FormControlLabel value="Med" control={<Radio />} label="Med" />
            <FormControlLabel value="High" control={<Radio />} label="High" />
          </RadioGroup>

          </FormControl>
        </DialogContent>

        <DialogActions>
          <Stack direction="row" spacing={2}>
            {editing ? <Button type="submit" variant="contained" startIcon={<EditIcon />}>
              Edit
            </Button>: <Button type="submit" variant="contained" startIcon={<EditIcon />}>
              Add
            </Button>}
            
            <Button
              onClick={handleClose}
              variant="contained"
              color="error"
              startIcon={<DoDisturbIcon />}
            >
              Cancel
            </Button>
          </Stack>
        </DialogActions>

      </Dialog>
    </>
  );
}
