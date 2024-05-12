import React from 'react'
import OtherUser from './OtherUser'
import { useSelector } from 'react-redux';

const OtherUsers = ({filteredUser}) => {  
  const {otherUsers}=useSelector(store=>store.user);
  if(!filteredUser)
  {
    if(!otherUsers) return;
    filteredUser=otherUsers;
  }

  return (
    <div className='overflow-auto flex-1'>
      {
        filteredUser?.map((user)=>{
          return(
            <OtherUser key={user._id} user={user}/>
          )
        })
      }
    </div>
  )
}

export default OtherUsers
