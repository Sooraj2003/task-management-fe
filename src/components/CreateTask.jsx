import  { useState } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTask } from '../utils/tasksSlice';

const CreateTask = () => {
  const [showToast,setShowToast] = useState(false);
  const [isError,setIsError] = useState(false);
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    
  });
  
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
       console.log(task);
       
        //Make a post call to /task/create api
        const response = await axios.post(BASE_URL+"/task/create",task,{withCredentials:true})
        //add task to the app state
        dispatch(addTask(response?.data?.task))
        
        
        // Reset form after submission
        setTask({
          title: '',
          description: '',
          dueDate: '',
          priority: 'medium',
         
        });
        if(response){
          setShowToast(true);  // Immediately show the toast
        
          setTimeout(()=>{
            setShowToast(false); // Hide the toast after 5 seconds
            navigate("/"); // Navigate after hiding the toast
          }, 1000);
        }
        

    }catch(err){
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 1000);
         console.log(err.message);
    }
   
  };

  return (
    <div className='h-full my-8'>
      {showToast && <div className="toast toast-top toast-center">
      {!isError ? <div className="alert alert-success">
        <span>Task creation unsuccessful.</span>
      </div>:
      <div className="alert alert-warning">
        <span>Task created successfully.</span>
      </div>}
    </div>}
    <div className="w-full max-w-md mx-auto p-6 bg-base-200 rounded-lg my-3 shadow-lg" >
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      
      <form  className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD (e.g., 2026-12-06)</p>
        </div>
        
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
      
        
        <button
          onClick={(e)=>handleSubmit(e)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Create Task
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateTask;