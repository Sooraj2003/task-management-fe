import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [], // This is an array, so state itself is an array
  reducers: {
    // Add a new task
    addTask: (state, action) => {
      state.push(action.payload); // No need for state.tasks
    },

    // Delete a task by MongoDB _id
    deleteTask: (state, action) => {
      return state.filter(task => task._id !== action.payload);
    },

    // Update a specific task by MongoDB _id
    updateTask: (state, action) => {
      const { _id, ...updates } = action.payload;
      const taskIndex = state.findIndex(task => task._id === _id);
      
      if (taskIndex !== -1) {
        state[taskIndex] = { ...state[taskIndex], ...updates };
      }
    },

    // Mark a task as complete
    markTaskComplete: (state, action) => {
      const taskIndex = state.findIndex(task => task._id === action.payload);
      
      if (taskIndex !== -1) {
        state[taskIndex] = { ...state[taskIndex], status: 'completed' };
      }
    },

    // Set tasks from backend
    setTasks: (state, action) => {
      return action.payload; // Directly replace state with new tasks
    }
  }
});

// Export actions
export const { 
  addTask, 
  deleteTask, 
  updateTask, 
  markTaskComplete, 
  setTasks 
} = tasksSlice.actions;

// Export reducer
export default tasksSlice.reducer;
