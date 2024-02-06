import React, { useEffect, useState , useRef} from 'react'
import {motion , AnimatePresence} from 'framer-motion'

export default function Nums({length , active}) {
    let nums=[]

    for(let i=1 ; i<=length;i++){
        nums.push(<h1 key={i} className='w-[40px] text-white text-4xl font-black'>{i<=9 ? `0${i}`:i}</h1>)
    }

  return (
    <div className='w-[40px] max-h-10 overflow-hidden flex'>
        <motion.div
            animate={{x:active*-44-2}}
            transition={{duration:0.5}}
            className='flex gap-1'>
            {nums}
        </motion.div>
    </div>
  )
}
