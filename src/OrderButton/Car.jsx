import React from 'react'
import { animated } from '@react-spring/web'

export default function Car({car}) {
  return (
    <animated.div style={car} className='absolute flex justify-center items-center z-10'>

        <div className='w-12 h-7 rounded-sm bg-gray-600'/>
        <div className='w-[2px] h-2 rounded-sm bg-red-600 z-[11]'/>
        <div className='w-4 h-5 rounded-sm bg-red-600 z-[11]'/>
        <div className='absolute top-[1px] left-[52px] w-2 h-1 rounded-sm bg-black'/>
        <div className='absolute top-[23px] left-[52px] w-2 h-1 rounded-sm bg-black'/>
        <div style={{clipPath:'polygon(0% 0%, 100% 15% ,100% 85%, 0% 100%)'}} className='w-[5px] h-4 rounded-sm bg-red-600'/>
        <div style={{clipPath:'polygon(0% 50%, 100% 0%, 100% 100%)'}} className='absolute left-16 top-1 w-4 h-2 opacity-0 rounded-sm group-hover:opacity-1 bg-gray-300 clip'/>
        <div style={{clipPath:'polygon(0% 50%, 100% 0%, 100% 100%)'}} className='absolute left-16 top-4 w-4 h-2 opacity-0 rounded-sm group-hover:opacity-1 bg-gray-300 clip'/>

    </animated.div>
  )
}
