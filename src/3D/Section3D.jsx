import React, { useEffect, useState, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { animated, config, useSpring } from '@react-spring/web';


export default function Section3D() {
  
  const [mousePos, setMousePos] = useState({});
  const [frontFish, setFrontFish] = useState({})
  const [backFish, setBackFish] = useState({})
  const frontFishRef = useRef(null)
  const backFishRef = useRef(null)
  const containerRef = useRef(null);

  const checkIfThreePointsOnTheSameLine = (p1, p2, p3) => {
    const M12 = (p2.x - p1.x) / (p2.y - p1.y);
    const M13 = (p3.x - p1.x) / (p3.y - p1.y);
  
    if (M12 === M13) {
      return (true)
    }
    else {
      return (false)
    }
  }


  // const rotatFish = () => {
  //   let rotate = 0;
  //  for(rotate=0 ;true;rotate++ ){
  //   if(checkIfThreePointsOnTheSameLine(frontFish,backFish,mousePos)){
  //     fishApi.start({
  //       rotate:rotate
  //     });
  //     break;
  //   }
  //  }
  // }


  const [fish, fishApi] = useSpring(() => ({
    from: {
      top: 0,
      left: 0,
      rotate:0
    },
    to: {
      top: mousePos.y,
      left: mousePos.x,
      rotate:180
    },
  }), [mousePos]
  )

  useEffect(() => {
    const handleMouseMove = (event) => {
      let bounds = event.target.getBoundingClientRect()
      setMousePos({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
    };
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    
    setBackFish({
      x: backFishRef.current.getBoundingClientRect().x,
      y: backFishRef.current.getBoundingClientRect().y,
    })
    setFrontFish({
      x: frontFishRef.current.getBoundingClientRect().x,
      y: frontFishRef.current.getBoundingClientRect().y,
    })


  }, []);

  console.log(
  //  mousePos,
  //  checkIfThreePointsOnTheSameLine(frontFish , backFish , mousePos),
   frontFish,
  );

  return (
    <div className='relative w-screen h-screen bg-white flex justify-center items-center' ref={containerRef}>
      <animated.div style={fish} className='absolute flex flex-col justify-center items-center w-10 h-20 rounded-full bg-black' >
        <div ref={frontFishRef} className='relative w-2 h-2 bg-red-700 rounded-full' />
        <div ref={backFishRef} className='relative w-2 h-2 bg-blue-700 rounded-full' />
        <div />
      </animated.div>

    </div>
  )
}
