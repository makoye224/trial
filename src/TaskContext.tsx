import { createContext } from "react";

export interface Task {
    title: string;
    description: string; 
    deadline: string;
    priority: string;
    isCompleteCheckBox: boolean;
}

export interface TaskContextValue {
  open: boolean;
  editing: boolean;
  tasks: Task[];
  setOpen: (open: boolean) => void;
  setEditing: (editing: boolean) => void;
  setTasks: (tasks: Task[]) => void;
  indexTaskEdit: number | null;
  setIndexTaskEdit: (index: number | null) => void; 
}

export const TaskContext = createContext<TaskContextValue>({
  open: false,
  editing: false,
  tasks: [],
  setOpen: () => {},
  setEditing: () => {},
  setTasks: () => {},
  indexTaskEdit: null,
  setIndexTaskEdit: () => {}, // Ensure you have this function in your context's default value
});
