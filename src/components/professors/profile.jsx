import React, { useEffect, useRef, useState } from 'react'
import { apiProfileGet } from '../../api/profileHelper'
import { PM_ROOT_API_URL } from '../../api/urls';

export default function Profile() {
    const [profile,setProfile] = useState({})

    // get profile data
    useEffect(()=>{
        apiProfileGet(PM_ROOT_API_URL+"/profile")
              .then((profileData) => {
                console.log("✅ Profile exists");
                setProfile(profileData)
              })


    },[])


  return (
    <div>
      {profile.id != undefined ? <p>Profile id: {profile.id}</p> : <p></p>}
      {profile.university != null ? <p>University: {profile.university}</p> : <p></p>}
    </div>
  )
}
