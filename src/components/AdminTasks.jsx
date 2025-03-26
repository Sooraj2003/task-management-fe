import React, { useState, useEffect } from "react";
import axios from "axios";
import {BASE_URL } from "../utils/constants";
import AdminTask from "./AdminTask";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../utils/tasksSlice";

const AdminTasks = () => {
  const adminTasks = useSelector((store) => store?.tasks);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(""); // Pending/Completed
  const [sortType, setSortType] = useState(""); // Priority/Due Date
  const [userFilter, setUserFilter] = useState(""); // Filter by user
  const [users, setUsers] = useState([]); // List of users for filtering

  const fetchAdminTasks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${BASE_URL}/admin/tasks`, { withCredentials: true });
      dispatch(setTasks(response?.data?.tasks));
      
      // Extracting unique users for filtering
      const uniqueUsers = [...new Set(response.data.tasks.map(task => task.user?.displayName || task.userId?.firstName))];
      setUsers(uniqueUsers);
      
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminTasks();
  }, []);

  // Filter tasks based on status and user
  const filteredTasks = adminTasks.filter((task) => 
    (statusFilter ? task.status.toLowerCase() === statusFilter : true) &&
    (userFilter ? (task.Id?.firstName === userFilter || task.userId?.firstName === userFilter) : true)
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
  
  if (error) return <p className="text-red-600 text-center">Error: {error}</p>;
  
  return (
    <div className="space-y-4 h-full mb-4 p-4">
      {/* Filters & Sorting Controls */}
      <div className="flex space-x-2 justify-between items-center mb-4">
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

        {/* User Filter */}
        <select
          value={userFilter}
          onChange={(e) => setUserFilter(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Users</option>
          {users.map((user, index) => (
            <option key={index} value={user}>{user}</option>
          ))}
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
        <AdminTask key={task._id} task={task} />
      ))}
    </div>
  );
};

export default AdminTasks;