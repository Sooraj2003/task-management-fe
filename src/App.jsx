import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Body from "./components/Body"
import Tasks from "./components/Tasks"
import CreateTask from "./components/CreateTask"
import { useSelector } from "react-redux"
import AdminTasks from "./components/AdminTasks"



function App() {
  const role = import.meta.env.VITE_ROLE; // Use import.meta.env 
  const user = useSelector((store)=>store?.user);



  return (
  
    <>
      <BrowserRouter>
      <Routes>
       <Route path="/" element={<Body/>}>
       {(user?.firstName=== role )?<Route path="/" element={<AdminTasks/>}/>:<Route path="/" element={<Tasks/>}/> }
        <Route path="login" element={<Login/>}/>
        <Route path="createTask" element={<CreateTask/>}/>
       </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
