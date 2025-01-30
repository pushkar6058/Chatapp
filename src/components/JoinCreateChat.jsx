import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { createRoomApi, joinChatApi } from '../services/RoomService';
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';


function JoinCreateChat() {

  const [detail,setDetail]=useState({roomId:"",userName:"" });


  const {roomId,userName,connected,setRoomId,setCurrUser,setConnected}=useChatContext();

  const navigate=useNavigate();

  function handleFormInputChange(event){
      setDetail({
        ...detail,
        [event.target.name]:event.target.value,
      })
  }

  function validateForm(){
    if(detail.roomId==="" || detail.userName===""){
      toast.error("Please Fill the following details...")
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      //join chat

      try {
        const room = await joinChatApi(detail.roomId);
        toast.success("joined..");
        setCurrUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status == 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error in joining room");
        }
        // console.log(error);
      }
    }
  }

  async function createRoom(){

    if(validateForm()){
      // create room
      console.log(detail);
      // we can call api to create room in the backend 
      try {
        const response=await createRoomApi(detail);
        console.log(response)
        toast.success("Room created successfully!!")
        setCurrUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);
        navigate("/chat");
        // we have to redirect this to chats
      } catch (error) {
        if(error.status==400){
          toast.error("Room already exists");
        }
        else{
         toast.error(error);
        }
        
        
      }

    }

  }

  return (

    <>

    <h1 className='text-5xl text-center mt-5'>Chat Application</h1>
    <div className="min-h-screen flex items-center justify-center">


      
      <div className="max-w-md w-full p-8 bg-gray-900 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Join Room/Create Room
        </h2>
        
        <form className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-gray-200 font-medium">
              Your Name
            </label>
            <input
            onChange={handleFormInputChange}
            value={detail.userName}
              type="text"
              id="name"
              name='userName'
              className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                placeholder-gray-400"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="roomId" className="text-gray-200 font-medium">
              Room ID
            </label>
            <input
            onChange={handleFormInputChange}
            name='roomId'
            value={detail.roomId}
              type="text"
              id="roomId"
              className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                placeholder-gray-400"
              placeholder="Enter room ID"
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
            onClick={createRoom}
              type="button"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 
                transition duration-200 ease-in-out focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Create Room
            </button>
            <button
            onClick={joinChat}
              type="button"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 
                transition duration-200 ease-in-out focus:outline-none focus:ring-2 
                focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Join Room
            </button>
          </div>
        </form>
      </div>
    </div>
    
    </>
  )
}

export default JoinCreateChat