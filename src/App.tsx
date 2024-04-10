import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import TaskTable from "./components/TaskTable";
import Icon from "@mui/material/Icon";
import TaskDialog from "./components/TaskDialog";
import React, {useState, createContext} from "react";


export const AddingContext = createContext();
export const EditingContext = createContext();

export default function App() {

    const [open, setOpen] = useState(true); 
    const [editing, setEditing] = useState(false);
    const [tasks, setTasks] = useState([]);


  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="small" edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography component="div" sx={{ flexGrow: 2 }}>
          FRAMEWORKS
        </Typography>

        <Button
          onClick={() => {
            setOpen(true);
            setEditing(false);
            console.log(open);
          }}
          variant="contained"
          startIcon={
            <Icon
              baseClassName="fas"
              className="fa-plus-circle"
              
            />
          }
        >
          ADD
        </Button>
      </Toolbar>

      <EditingContext.Provider value={[editing, tasks, setTasks, setEditing]}>
        <AddingContext.Provider value={[open, setOpen]}>
          <TaskTable></TaskTable>
        </AddingContext.Provider>
      </EditingContext.Provider>
      <EditingContext.Provider value={[editing, setEditing]}>
        <AddingContext.Provider value={[open, setOpen]}>
          <TaskDialog></TaskDialog>
        </AddingContext.Provider>
      </EditingContext.Provider>
    </AppBar>
  );
}
