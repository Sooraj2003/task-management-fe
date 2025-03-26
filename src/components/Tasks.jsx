import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../utils/tasksSlice";

const Tasks = () => {
  const tasks = useSelector((store) => store?.tasks);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(""); // Pending/Completed
  const [sortType, setSortType] = useState(""); // Priority/Due Date

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/tasks`, { withCredentials: true });
      dispatch(setTasks(response?.data?.tasks));
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) =>
    statusFilter ? task.status.toLowerCase() === statusFilter : true
  );

  // Sort tasks based on priority or due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortType === "priority") {
      const priorityOrder = { low: 1, medium: 2, high: 3 };
      return priorityOrder[b.priority.toLowerCase()] - priorityOrder[a.priority.toLowerCase()];
    }
    if (sortType === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });

  if (isLoading) return <p className="text-gray-600 text-center">Loading tasks...</p>;
  if (!tasks || tasks.length === 0) return <p className="text-gray-600 text-center">No tasks found.</p>;
  if (error) return <p className="text-red-600 text-center">Error: {error}</p>;
  

  return (
    <div className="space-y-4 h-full mb-4 p-4">
      {/* Filters & Sorting Controls */}
      <div className="flex justify-between items-center mb-4">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        {/* Sorting */}
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">Sort-default</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      {/* Render Sorted & Filtered Tasks */}
      {sortedTasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default Tasks;
