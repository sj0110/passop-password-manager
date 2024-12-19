import React from 'react'
import { FaGithub } from "react-icons/fa";


const Navbar = () => {
    return (
        <div className='h-16 bg-gray-900 flex justify-between items-center px-20'>
            <button className='text-3xl p-1 text-white font-semibold'>&lt;<span>Pass</span><span className='text-blue-500'>Op</span>/&gt;</button>
            <button type="button" className="text-gray-900 bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:outline-none font-semibold rounded-full text-sm px-4 py-2 text-center flex items-center justify-center gap-2">
                <FaGithub className='text-2xl' />    
                <span>GitHub</span>
            </button>
        </div>
    )
}

export default Navbar