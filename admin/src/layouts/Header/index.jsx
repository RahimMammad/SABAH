import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
        <nav className='w-[100%] h-[50px] bg-sky-900'>
            <ul className="max-w-[50%] mx-auto flex justify-between items-center pt-3">
                <Link to={"/"} className='text-white'>Home</Link>
                <Link to={"/signup"} className='text-white'>SignUp</Link>
                <Link to={"/signin"} className='text-white'>SignIn</Link>
            </ul>
        </nav>
  )
}

export default Header