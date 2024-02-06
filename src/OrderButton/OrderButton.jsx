import React, { useState } from 'react'
import Car from "./Car";
import Road from "./Road";
import { useSpring, animated, useChain } from '@react-spring/web';

export default function OrderButton() {

  const [clicked, setClicked] = useState(false);
  const [order, orderApi] = useSpring(() => ({
    from: { x: 0, },
    reverse: true
  }))

  const [orderComplete, orderCompleteApi] = useSpring(() => ({
    from: { x: 200, },
    reverse: true
  }))

  const [car, carApi] = useSpring(() => ({
    from: { x: 200, y: 0, scale: 1 },
  }))

  const [box, boxApi] = useSpring(() => ({
    from: { x: -200, opacity: 1 },
    reverse: true
  }))

  const [road, roadApi] = useSpring(() => ({
    from: { x: 0 },
    reverse: true
  }))

  const handleClick = () => {

    setClicked(prevClick => setClicked(!prevClick));

    orderApi.start({
      to: {
        x: clicked ? 0 : -200,
        immediate: true
      }
    })

    carApi.start({
      to: { x: clicked ? 200 : 0 },
      config: { tension: 30 },
      delay: 200
    })

    carApi.start({
      to: { x: clicked ? 0 : 200 },
      config: { tension: clicked ? 30 : 100 },
      delay: 10000,
    })

    boxApi.start({
      to: { x: clicked ? -200 : 0 },
      config: { tension: 40 },
      delay: 2000
    })

    boxApi.start({
      to: { opacity: clicked ? 1 : 0 },
      config: { tension: 40 },
      delay: 3000
    })

    roadApi.start({
      to: { x: clicked ? 0 : -1200 },
      config: {
        tension: 5,
      },
      delay: clicked ? 0 : 3500
    })

    orderCompleteApi.start({
      to: { x: clicked ? 200 : 0 },
      config: { tension: 100 },
      delay: 11000
    })

  }

  return (
      <div onClick={handleClick} className="relative w-40 h-14 text-center flex justify-center items-center bg-white  text-black font-black  ring-1 ring-black rounded-lg select-none cursor-pointer shadow-md hover:shadow-lg hover:bg-black hover:text-white transition duration-300 group overflow-hidden scale-75">
        <animated.h1 style={order}>Order</animated.h1>
        <animated.div style={box} className='absolute w-4 h-4 rounded-sm bg-orange-700' />
        <Car car={car} />
        <Road road={road} />
        <animated.h1 className='absolute w-full h-full text-center flex justify-center items-center bg-gray-400 text-white z-20' style={orderComplete}>Completed  ✅</animated.h1>
      </div>
  )
}
