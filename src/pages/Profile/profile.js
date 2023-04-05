import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/Navbar';
import EditProfile from '../../components/ProfileCard/EditProfile/EditProfile';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { useLocation } from 'react-router-dom'


const ProfilePage = () => {
  const [edit, setEdit]= useState(false);
  const location = useLocation()
  const { props } = location.state
  //console.log(props)
  const [newProps, setNew] = useState()
  
  return (
    <>
        <NavBar />
        <EditProfile props={props} closeEdit={() => setEdit(false)} edit={edit} newProps={() => setNew(newProps)}/>
        <ProfileCard props={newProps || props} openEdit={() => setEdit(true)}/>
    </>
  );
}

export default ProfilePage;
