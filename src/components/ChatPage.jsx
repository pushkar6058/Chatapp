import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { IoPersonCircleSharp, IoPersonSharp } from 'react-icons/io5';
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';




function ChatPage() {

    const {
        roomId,
        currentUser,
        connected,
        setConnected,
        setRoomId,
        setCurrentUser,
      } = useChatContext();
    const navigate=useNavigate();
    useEffect(()=>{
        if(!connected){
            navigate("/");
        }
    },[connected,roomId,currentUser]);



    const [messages,setmessages]=useState([
        {
            content:"hello sir",
            sender:"Pushkar ",
        },
        {
            content:"hello sir",
            sender:"Pushkar ",
        },
        {
            content:"hello sir",
            sender:"Pushkar ",
        },
        
        
    ]);
    const [input,setInput]=useState("");
    const inputRef=useRef(null);
    const chatBoxRef=useRef(null);
    const [stompClient,setStompClient]=useState(null);
    const currUser=useState("Pushkar");

    

  return (
    <>
    <div>
    {/* Header Portion */}
    <div className="">
 
    <header className='dark:border-gray-700 dark:bg-gray-900 border fixed w-full h-20 flex py-5 justify-around items-center  '>

        {/* Room id */}
        <div > 
            <h1 className='text-xl font-semibold'>Room : 
            <span> Family Room</span>
            </h1>
           
        
        </div>
        {/* User name */}
        
        <div> 
            <h1 className='text-xl font-semibold'>User : 
            <span> Pushkar</span>
            </h1>
            </div>
        {/* Leave room button */}
        <div> 
            <button className='dark:bg-red-700 dark:hover:bg-red-900 px-2 py-2 rounded-full duration-200 cursor-pointer'>Leave Room</button>
            
            
            </div>
    </header>

    </div>



    <main className='py-20 dark:bg-slate-500 w-2/3 mx-auto h-screen overflow-auto '> 

        <div className=''>
    {/* Display the messages */}

            {messages.map((msg,index)=>(
                <div key={index}
                className={msg.sender === currUser ? "flex justify-end" : "flex justify-start"} > 

            
                <div  className={`${msg.sender === currUser ? "bg-green-700" : "bg-gray-700"} mb-3 rounded-2xl px-2 py-1`}>
                                    <div className=' flex flex-row gap-2'>
                                    <IoPersonCircleSharp className='bg-gray-950 rounded-full h-10 w-10 max-h-screen ' />

                                    <div className=' flex flex-col gap-1  max-w-sm '>

                                        <p className='text-sm font-bold mx-3 '>{msg.sender}</p>
                                        
                                        <p className='text-sm font-bold mx-3'>{msg.content}</p>
                                    </div>

                                    </div>

                                    


                                </div>

                </div>

            ))}
        </div>


    </main>




{/* input area container */}
    <div className=' fixed bottom-10 w-full h-16 l '>

    <div className=' flex justify-between items-center gap-4 border w-2/3 mx-auto h-full rounded-full pr-2 dark:bg-gray-900'>
    <input type="text" placeholder='Type your message here...' className='w-full dark:border:bg-gray-700 border dark:bg-gray-950 rounded-full pl-5 px-3 py-2 h-full' />

    <button className='dark:bg-blue-500 hover:bg-blue-900 cursor-pointer mx-2 duration-200 px-3 py-2 rounded-full h-10 w-10 '><IoIosSend /></button>
    </div>

    </div>
    
    </div>
    
    </>
  )
}

export default ChatPage