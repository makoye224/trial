import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { AppBar, Box, ButtonGroup, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Stack, Toolbar, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import { AddingContext } from "../App";
import React, {useContext} from 'react';
import { EditingContext } from "../App";



export default function TaskDialog() {


    const [open, setOpen] = useContext(AddingContext);
    const [title, setTitle] = useState('');
    const { editing, tasks, setTasks, setEditing } = useContext(EditingContext);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const task = {
      title: title,
      description: "desc",
      deadline: "deadline",
      priority: "low",
      isCompleteCheckBox: true, 
      action: 'action',
    };
    console.log("Form submitted");
        console.log(title);

    // Access form data
    const formData = new FormData(e.currentTarget);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    console.log(formData);

    
  }

  

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit:handleSubmit,
        }}
      >
    
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <EditIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Edit Task
            </Typography>
          </Toolbar>
        </AppBar>
        
        <DialogContent>
          <FormControl >
            {(!edititing ?
            <><TextField
                              error={false}
                              helperText="Title is required!"
                              id="title"
                              label="Title"
                              value={title}
                              onChange={(e)=>setTitle(e.target.value)}
                              variant="outlined"
                              placeholder="Title" /><br></br></> : <br></br> )}
            
            <TextField
              error={false}
              helperText="Description is required!"
              id="description"
              label="Description"
              variant="outlined"
              placeholder="Description"
            />
            <br></br>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Deadline" />
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
            >
              <FormControlLabel value="Low" control={<Radio />} label="Low" />
              <FormControlLabel value="Med" control={<Radio />} label="Med" />
              <FormControlLabel value="High" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" startIcon={<EditIcon />}>
              Add
            </Button>
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
