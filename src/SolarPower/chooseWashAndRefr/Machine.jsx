import React from 'react'
import { useDrag } from 'react-dnd'

export default function Machine({image , type , name , className}) {
  let typeName=''
  if(name==='Washing Machine'){
    typeName='Machine';
  }
  else if(name==='Refrigerator'){
    typeName='Machine'
  }
  else{
    typeName=name
  }
    const [{isDragging} , dragStand] = useDrag(() => ({
        type:typeName,
        item:{name : name},
        collect:(monitor) => ({
            isDragging: !!monitor.isDragging(),

        })
    }))

  return (
    <div className='relative w-full h-[150px] cursor-grab flex flex-col justify-center items-center hover:scale-110 group transition duration-500 max-sm:scale-[0.6] max-sm:hover:scale-75 max-sm:-top-12  ' >
        <div className='absolute w-[160px] h-[160px] opacity-10 backdrop-blur-10 bg-white rounded-2xl shadow-md group-hover:shadow-lg' style={isDragging ? {opacity:0.2} : {}}/>
        <div ref={dragStand} style={{ '--image-url': `url(${image})` }} className={className}/>
        <h1 className='text-center select-none pt-1'>{name}</h1>
    </div>
  )
}
