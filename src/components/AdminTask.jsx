import React, { useState } from 'react';
import { Pencil, Trash2, CheckCircle } from 'lucide-react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteTask, markTaskComplete, updateTask } from '../utils/tasksSlice';

const AdminTask = ({task}) => {
    const dispatch = useDispatch();
    const {_id,userId, title, description, dueDate, priority, status} = task;
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title,
        description,
        dueDate,
        priority,
        status
    });

    // Priority color mapping with fallback
    const priorityColors = {
        low: 'bg-green-100 text-green-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-red-100 text-red-800'
    };

    // Status color mapping with fallback
    const statusColors = {
        pending: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800'
    };

    // Safely capitalize first letter
    const capitalizeFirst = (str = '') => {
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveUpdate = async(_id) => {
        try {  
            // Update on DB
            const res = await axios.patch(
                `${BASE_URL}/admin/task/${_id}`, 
                editedTask,
                {withCredentials: true}
            );
            dispatch(updateTask(res?.data?.task));
            
            // Close edit mode
            setIsEditing(false);
        } catch(err) {
            console.error(err.message); 
        }
    };

    const handleDelete = async (_id) => {
        try { 
            // Delete task on the DB
            const res = await axios.delete(
                `${BASE_URL}/admin/task/${_id}`,
                {withCredentials: true}
            );
            dispatch(deleteTask(res?.data?.task?._id));
        } catch(err) {
            console.log(err.message);
        }
    };

    const handleComplete = async(_id) => {
        try { 
            setEditedTask(prev => ({
                ...prev,
                status: 'completed'
            }));

            // Complete on DB
            const res = await axios.patch(
                `${BASE_URL}/admin/task/complete/${_id}`, 
                {}, 
                {withCredentials: true}
            );
            dispatch(markTaskComplete(res?.data?.task?._id));

            setIsEditing(false);
        } catch(err) {
            console.log(err.message);
        }
    };

    // Ensure priority and status are valid
    const safeStatus = ['pending', 'completed'].includes(editedTask.status) 
        ? editedTask.status 
        : 'pending';
    const safePriority = ['low', 'medium', 'high'].includes(editedTask.priority) 
        ? editedTask.priority 
        : 'medium';

    // If editing, render editable form
    if (isEditing) {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={editedTask.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={editedTask.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                        rows="3"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={editedTask.dueDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                        name="priority"
                        value={editedTask.priority}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => handleSaveUpdate(_id)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    // Default view when not editing
    return (
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-start">
                <div>
              
                    <h2 className="text-xl font-bold text-gray-800">{editedTask.title || 'Untitled Task'}</h2>
                    <div className="flex space-x-2 mt-2">
                        <span className={`px-2 py-1 rounded text-xs ${priorityColors[safePriority]}`}>
                            {capitalizeFirst(safePriority)} Priority
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${statusColors[safeStatus]}`}>
                            {capitalizeFirst(safeStatus)}
                        </span>
                    </div>
                    {/* Added user display name */}
                    <p className="text-sm text-gray-600 mt-1">
                        Assigned to: {userId?.firstName || "Unknown user"}
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 hover:bg-blue-100 p-2 rounded-full"
                        title="Edit Task"
                    >
                        <Pencil size={20} />
                    </button>
                    <button 
                        onClick={() => handleDelete(_id)}
                        className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                        title="Delete Task"
                    >
                        <Trash2 size={20} />
                    </button>
                    {safeStatus !== 'completed' && (
                        <button 
                            onClick={() => handleComplete(_id)}
                            className="text-green-600 hover:bg-green-100 p-2 rounded-full"
                            title="Mark as Complete"
                        >
                            <CheckCircle size={20} />
                        </button>
                    )}
                </div>
            </div>

            <p className="text-gray-600 mt-2">{editedTask.description || 'No description provided'}</p>

            <div className="text-sm text-gray-500 mt-4">
                <strong>Due Date:</strong> {editedTask.dueDate || 'No due date'}
            </div>
        </div>
    );
};

export default AdminTask;