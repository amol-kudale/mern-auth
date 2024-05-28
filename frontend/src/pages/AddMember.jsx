import React, { useEffect, useState } from 'react'
import {  useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

import '../assets/elements.css';

const AddMember = () => {
    const { currentUser } = useSelector((state) => state.user);
    const currentUserId = currentUser._id ;

    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [contact,setContact] = useState('')
    const [email,setEmail] = useState('')
    const navigate = useNavigate();

    const collectData = async (e) => {
        console.warn(name, role, contact, email, currentUserId)
        e.preventDefault();
        try{

            let result = await fetch(
                `/api/teamuser/create-member`,
                {
                method: 'post',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name,role, contact, email, currentUserId}),
            })
            result = await result.json()
            alert("member created successfully")
            console.warn(result)
        }catch (error){
            console.log(error)
        }

        navigate('/add-member')
        
    }

    

  return (
    <>
      <div className="h-full max-w-6xl mx-auto p-3 mt-7 bg-custom-white rounded-lg shadow shadow-custom-gray">
        <h3 className="font-medium text-lg ml-5">Create new member</h3>
        <form className="flex flex-col gap-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="form-field">
              <label htmlFor="name" className="text-sm ml-5">
                Member name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
              />
            </div>

            <div className="form-field">
              <label htmlFor="role" className="text-sm ml-5">
                Role
              </label>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                type="text"
                id="role"
                className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-field">
              <label htmlFor="mobileNumber" className="text-sm ml-5">
                Mobile number
              </label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                type="text"
                id="mobileNumber"
                className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="text-sm ml-5">
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                className="bg-white rounded-full w-full p-3 pl-5 mt-2 shadow shadow-custom-blue"
              />
            </div>
          </div>

          <button
            className=" btn-primary mt-3 text-white p-3 rounded-full uppercase hover:opacity-95 disabled:opacity-80"
            onClick={collectData}
          >
            {/* {memberLoading ? "Loading..." : "Send OTP"} */}
            Add Member
          </button>
        </form>
      </div>
    </>
  );
}

export default AddMember