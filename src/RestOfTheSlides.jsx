import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

export default function RestOfTheSlides({image , text ,title , setActive , index , setAutomate , setDelayActive}) {

    return (
    
    <motion.div  layout
        key={image}
        initial={{opacity:0}}
        animate={{opacity:1}}
        whileHover={{y:-10}}
        transition={{duration:1}}
        // onClick={() => {
        //     setActive(index)
        //     setAutomate(false)
        //     setTimeout(() => {
        //         setDelayActive(index)
    
        //     },2000)
                 
        // }}
        className='relative min-w-max overflow-hidden shadow-3xl'>
        <motion.div
            src={image} 
            style={{'--image-url': `url(${image})`}} 
            className='relative h-52 w-40 rounded-lg bg-cover bg-center shadow-lg max-[1200px]:h-36 bg-[image:var(--image-url)]'/>

        <motion.div
            exit={{y:-10}}
            className='absolute min-h-36 bottom-0 p-5 '>

            <h1 className='text-sm font-black text-white'>
                {text}
            </h1>

            <h1 className='text-xs text-white'>
                {title}
            </h1>

         </motion.div>
    </motion.div>

    )
}
