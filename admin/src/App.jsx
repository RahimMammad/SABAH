import React from 'react'
import "./App.scss"
import { Route, Routes } from 'react-router-dom'
import SignUpForm from './pages/Register'
import LoginForm from './pages/Login'
import MainLayout from './layouts/MainLayout'

const App = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route path='/signup' element={<SignUpForm />} />
              <Route path='/signin' element={<LoginForm />} />
            </Route>
        </Routes>
    </div>
  )
}

export default App