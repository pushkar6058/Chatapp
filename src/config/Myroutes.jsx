import React from 'react'
import App from '../App'
import { Route, Routes } from 'react-router'
import ChatPage from '../components/ChatPage'


function Myroutes() {
  return (
    <Routes>
        
      <Route path='/' element={<App/>} />
      <Route path='/chat' element={<ChatPage/>}/>
      <Route path='*' element={<h1>404 Page Not found</h1>} />


    </Routes>
  )
}

export default Myroutes