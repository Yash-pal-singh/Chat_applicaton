import React from 'react'
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {
  const navigate=useNavigate();
  const {authUser}=useSelector(store=>store.user);
  useEffect(()=>{
    if(!authUser)
      {
        navigate("/login");
      }
  },[authUser]);
  return (
    <div className='flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 sm:h-[450px] md:h-[550px]'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}

export default HomePage
