import React , {useEffect, useRef , useState} from 'react'
import {motion} from 'framer-motion'

export default function Hr({value , maxValue}) {
    const whiteHr = useRef()
    const [width , setWidth] = useState(0)
    useEffect(()=> {
        setWidth(whiteHr.current.offsetWidth)
    } , [])

  return (
    <div className='relative w-full'>
        <motion.hr 
            initial={{width:0}} 
            animate={{width:width*value/maxValue}} 
            className='absolute bg-yellow-700 border-0 p-1 rounded  z-10'/>

        <hr ref={whiteHr} 
            className='absolute bg-white w-full border-0 p-1 rounded '/>
    </div>
  )
}
