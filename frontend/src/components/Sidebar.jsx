import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import { IoArrowBack } from "react-icons/io5";
import axios from 'axios';
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { setMessages } from '../redux/messageSlice';

const Sidebar = () => {
  useGetOtherUsers();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {otherUsers}=useSelector(store=>store.user);
  const [filteredUser,setFilteredUser]=useState(otherUsers);
  const [showIcon,setShowIcon]=useState(false);
  const logoutHandler=async()=>{
    try{
      const res=await axios.get(`http://localhost:8080/api/v1/user/logout`);
      navigate('/login');
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setSelectedUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));

    }catch(error)
    {
        console.log(error);
    }
  }

  const handleChange=(e)=>{
    setShowIcon(true);
    let search=e.target.value;
    console.log(search);
    let conversationUser=otherUsers?.filter(user=>user.fullName.toLowerCase().includes(search.toLowerCase()));
    if(conversationUser)
      {
        // dispatch(setOtherUsers([conversationUser]));
        setFilteredUser(conversationUser);
      }
      else
      {
        toast.error("User not found");
      }
      if(!e.target.value)
        {
            setShowIcon(false);
        }
  }
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <div  className='flex items-center gap-2'>
      <div className='relative'>
            <input 
            onChange={e=>handleChange(e)}
            className='input input-bordered rounded-md' 
            type="text" 
            placeholder='Search...' />
            <div className="absolute top-3.5 right-2 text-slate-500">{
              showIcon?<IoArrowBack className='w-6 h-6 outline-none' onClick={()=>{setShowIcon(false);setFilteredUser(otherUsers)}} />
            :<BiSearchAlt2 className='w-6 h-6 outline-none'/>}</div>
      </div>

            {/* <button type="submit" className="btn bg-slate-700 text-white">
                <BiSearchAlt2 className='w-6 h-6 outline-none'/>
            </button> */}
      </div>

      <div className="divider px-3"> </div> 
      <OtherUsers filteredUser={filteredUser}/>
      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar
