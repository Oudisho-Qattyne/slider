import { useRef, useState } from "react";
// import Slider from "./Slider"
import Square from "./Square"

import OrderButton from "./OrderButton/OrderButton";
import Section3D from "./3D/Section3D";
import SolarPower from "./SolarPower/SolarPower";
import Test from "./Test";
import View360 from "./assets/360View/View360";



function App() {

  return (
    <div className="realtive w-screen h-screen">
      <View360/>
      {/* <div className="min-w-full min-h-screen"/> */}
      {/* <div className="min-w-full min-h-screen"/> */}
      {/* <Square/> */}
      {/* <Slider/> */}
      {/* <div
      style={{clipPath : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'}}
      className='absolute w-[1200px] h-[550px] rounded-lg bg-white flex justify-center items-center'>
                    <div className='w-[500px] flex flex-col justify-center items-center'>
                      <h1 className=' text-center text-3xl font-black text-red-400 p-1'>
                        Unlimited themes
                      </h1>
                      <h1 className='text-2xl text-center text-red-200 p-0'>
                        with zero effort
                      </h1>
                      <h1 className='text-xs  text-center text-red-200 p-8'>
                        daisyUI adds a set of customizable color names to Tailwind CSS and these new colors use CSS variables for the values. Using daisyUI color names, you get Dark Mode and even more themes without adding a new class name.
                      </h1>
                    </div>
                    <div className=' absolute top-[20px] left-10 w-[300px] h-[200px] rounded-lg bg-orange-400'>

                    </div>
                    <div className=' absolute top-[230px] left-10 w-[300px] h-[290px] rounded-lg bg-orange-400'>

                    </div>
                    <div className=' absolute top-[20px] left-[360px] w-[480px] h-[70px] rounded-lg bg-orange-400'>
                    </div>
                    <div className=' absolute bottom-[20px] left-[360px] w-[480px] h-[70px] rounded-lg bg-orange-400'>

                    </div>
                    <div className=' absolute top-[20px] right-10 w-[300px] h-[200px] rounded-lg bg-orange-400'>

                    </div>
                    <div className=' absolute top-[230px] right-10 w-[300px] h-[290px] rounded-lg bg-orange-400'>

                    </div>
                  </div>
    */}
      {/* <OrderButton/> */}
      {/* <Section3D/> */}
      {/* <SolarPower/> */}
      {/* <NFC/> */}

    </div>
  )
}

export default App
