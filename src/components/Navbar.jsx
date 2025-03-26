import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  const role = import.meta.env.VITE_ROLE; // Use import.meta.env 
  const user = useSelector(store=>store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      navigate("/login")

    }catch(err){
      console.error(err);
    }
    
  }
  return (
    <div className="navbar bg-base-300 rounded-lg p-4">
    <div className="flex-1">
      <Link  to="/" className="btn btn-ghost text-xl">tasks. 📔</Link>
    </div>
    <p className="text-xs mx-2 md:text-lg ">{user && "Welcome, "+user?.firstName}</p>
    <div className="flex-none gap-2">
    {user && <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
           <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          {user?.firstName!==role && <li>
          <Link to="/createTask" className="justify-between">
              Create Task
            </Link>
          </li>
          }       
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>}
    </div>
  </div>
  )
}

export default Navbar
