import React, { useState, createContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add"; // Note: AddIcon is imported but not used
import TaskTable from "./components/TaskTable";
import TaskDialog from "./components/TaskDialog";
import { TaskContext, TaskContextValue } from "./TaskContext"; // Assuming TaskContext is defined in a separate file

export default function App() {
    const [open, setOpen] = useState(false); // Changed to false to initially hide the dialog
    const [editing, setEditing] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [indexTaskEdit, setIndexTaskEdit] = useState<number | null>(null); // Corrected to null

    // Bundling all task-related states and setters into a single object
    const taskContextValue: TaskContextValue = {
        open,
        setOpen,
        editing,
        setEditing,
        tasks,
        setTasks,
        indexTaskEdit, // Added indexTaskEdit to context
        setIndexTaskEdit,
    };

    return (
        <TaskContext.Provider value={taskContextValue}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Task Manager
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={() => {
                                setOpen(true);
                                setEditing(false);
                            }}
                        >
                            <AddIcon /> ADD
                        </Button>
                    </Toolbar>
                </AppBar>
                {/* Components that consume the context */}
                <TaskTable />
                <TaskDialog />
            </Box>
        </TaskContext.Provider>
    );
}
