import React from 'react'
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom'
import Login from './pages/Login'
import Regiser from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import UserProfile from './pages/UserProfile'

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path='/register' element={<Regiser />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/userprofile' element={<UserProfile/>}></Route>
        <Route path= '*' element={<NotFound />}></Route>
        
      </Routes>
    </Router>
  )
}

export default App
