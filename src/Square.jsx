import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { animated, useSpring, useScroll, to } from '@react-spring/web'
import { transform } from 'framer-motion'
import Slider from './Slider'
import OrderButton from './OrderButton/OrderButton'
import Section3D from './3D/Section3D'

export default function Square() {

  const containerRef = useRef(0)
  const wordsRef = useRef()
  const buttonRef = useRef()
  const codeRef = useRef()
  const tailwindClassArray = ['',
    "bg-indigo-600 ",
    "px-4 ",
    "py-3 ",
    "text-center ",
    "text-sm ",
    "font-semibold ",
    "inline-block ",
    "text-white ",
    "cursor-pointer ",
    "uppercase ",
    "transition ",
    "duration-200 ",
    "ease-in-out ",
    "rounded-md ",
    "hover:bg-indigo-700 ",
    "focus-visible:outline-none ",
    "focus-visible:ring-2 ",
    "focus-visible:ring-indigo-600 ",
    "focus-visible:ring-offset-2 ",
    "active:scale-95 "]



  const between = (val, first, last) => {
    last *= 10;
    first *= 10;
    val *= 10;
    const temp = last - first;
    const res = (val - first) / temp;
    if (val < first) {
      return (0);
    }
    else if (val > last) {
      return (1);
    }
    else {
      return (res);
    }
  }

  const addWords = (val) => {
    if (val > 0.11 && val < 0.21) {
      const index = Math.floor(between(val, 0.11, 0.21) * 21);
      let words = ''
      for (let i = 0; i <= index; i++) {
        words = words + tailwindClassArray[i]
      }
      if (wordsRef.current != undefined) {
        wordsRef.current.innerHTML = words
        buttonRef.current.className = words
        buttonRef.current.innerHTML = 'Tailwind Button'
        codeRef.current.innerHTML = 'Tailwind Button'


      }
    }
    else if (val > 0.225 && val < 0.23) {
      const index = Math.floor(21 - between(val, 0.225, 0.23) * 21);
      let words = ''
      for (let i = 0; i <= index; i++) {
        words = words + tailwindClassArray[i]
      }
      if (wordsRef.current != undefined) {
        wordsRef.current.innerHTML = words
        buttonRef.current.className = words
        buttonRef.current.innerHTML = 'Tailwind Button'
        codeRef.current.innerHTML = 'Tailwind Button'
      }
    }
    else if (val > 0.23 && val < 0.25) {
      const tailwindClassArray2 = ['', 'btn ', 'btn-primary']
      const index = Math.floor(between(val, 0.23, 0.255) * 3);
      let words = ''
      let newClassName = ' bg-indigo-700 px-4 py-3 text-center text-sm font-semibold inline-block text-white cursor-pointer uppercase transition duration-200 ease-in-out rounded-md hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 active:scale-95'
      for (let i = 0; i <= index; i++) {
        words = words + tailwindClassArray2[i]
        if (i == 2) {
          buttonRef.current.className = newClassName
        }
      }
      if (wordsRef.current != undefined) {
        wordsRef.current.innerHTML = words
        buttonRef.current.innerHTML = ' daisy Button 😎'
        codeRef.current.innerHTML = 'daisy Button 😎'



      }
    }
  }

  const { scrollYProgress } = useScroll({
    container: containerRef.current.busy ? 0 : containerRef.current.container,
    default: {
      immediate: true,
    }
  })


  return (
    <div className='relative h-screen w-full'>
      <Parallax className='min-h-full' ref={containerRef} pages={20} style={{ top: '0', left: '0' }}>


        <ParallaxLayer className='absolute w-full flex right-0 h-screen z-10' sticky={{ start: 0, end: 5 }} offset={0} speed={1}>
          <div className='absolute w-1/2 -right-36 flex justify-center h-screen items-center '>
            <animated.div style={{
              transform: scrollYProgress.to(val => {
                return (`rotateX(${((between(val, 0.02, 0.081) - 1) * -1) * -20}deg) rotateZ(${((between(val, 0.02, 0.081) - 1) * -1) * -20}deg) skewY(${((between(val, 0.02, 0.081) - 1) * -1) * 8}deg)`)
              })
            }
            } className='relative m-10 w-[1200px] h-2/3 rounded-xl bg-gray-600 shadow-3xl justify-center items-center flex'>
              <animated.div style={{
                y: scrollYProgress.to(val => {
                  return (`${between(val, 0, 0.06) * -300}%`)
                })
              }} className='absolute -left-10 top-10 text-2xl  font-black p-10 bg-gray-900 rounded-xl w-1/2'>Hello world </animated.div>
              <animated.div style={{
                y: scrollYProgress.to(val => {
                  return (`${between(val, 0.001, 0.08) * -300}%`)
                })
              }} className='absolute left-80 top-10 text-2xl  font-black p-10 bg-gray-900 rounded-xl w-1/2'>Hello world</animated.div>
              <animated.div style={{
                opacity: scrollYProgress.to(val => {
                  addWords(val)
                  return (between(val, 0.06, 0.09))
                })
              }} className=' absolute left-0 w-[440px] p-5 '>
                <h1 className='text-gray-400 pb-10 '>// Styling a simple button</h1>
                <span> &lt; button class="</span>

                <animated.span ref={wordsRef} className='text-orange-500 overflow-hidden w-[450px]'>
                </animated.span>
                <span>"&gt;</span>
                <span ref={codeRef}>Tailwind Button</span>
                <h1 className='pb-10'>&lt;/button&gt;</h1>

                <button ref={buttonRef}>
                  Tailwind Button
                </button>
              </animated.div>
            </animated.div>
          </div>
        </ParallaxLayer>


        <ParallaxLayer className=' absolute z-50' offset={0} >
          <div className='relative w-1/2 left-0 h-screen z-50'>
            <div className='relative m-10 w-full h-full p-10'>
              <h1 className='text-6xl font-black pb-10'>
                The most popular
                component library
                for Tailwind CSS
              </h1>
              <h1 className='text-3xl text-gray-400 pb-10 '>
                daisyUI adds component class names to Tailwind CSS
                so you can make beautiful websites faster than ever.
              </h1>
              <div className='flex gap-5 '>
                <div className='p-5 w-fit rounded-lg bg-gray-400 hover:bg-gray-800 cursor-pointer transition-colors duration-300 text-white'>
                  See components
                </div>
                <div className='p-5 w-fit rounded-lg ring-2 ring-gray-400 hover:bg-gray-400 cursor-pointer transition-colors duration-300 text-white'>
                  How to use..?🤔
                </div>
              </div>
            </div>
          </div>

        </ParallaxLayer>


        <ParallaxLayer offset={1}  className='-z-20'>
          <div className='relative w-1/2 left-0 h-screen'>
            <div className='relative m-10 w-full h-full p-10'>
              <h1 className='text-6xl font-black pb-10'>
                don't re-invent
                the wheel
                every time 😪
              </h1>
              <h1 className='text-3xl text-gray-400 '>
                In a Tailwind CSS project, you need to write utility class names for every element. Thousands of class names just to style the most basic elements.
              </h1>
            </div>
          </div>

        </ParallaxLayer>
        <ParallaxLayer sticky={{ start: 2, end: 4.5 }} className='-z-20' offset={2} >
          <animated.div
            style={{
              y: scrollYProgress.to(val => { between(val, 0.9, 1) * 100 })
            }}
            className='relative w-1/2 left-0 h-screen -z-50'>
            <div className='relative m-10 w-full h-full p-10'>
              <h1 className='text-6xl font-black pb-10'>
                instead of writing
              </h1>
              <h1 className='text-6xl font-black text-red-400 pb-10'>
                100 class names
              </h1>
              <h1 className='text-3xl text-gray-400 '>
                For every element, every page, every project,again and again…
              </h1>
            </div>
          </animated.div>

        </ParallaxLayer>
        <ParallaxLayer offset={5} >
          <div className='relative w-1/2 left-0 h-screen'>
            <div className='relative m-10 w-full h-full p-10'>
              <h1 className='text-6xl text-green-400 font-black pb-10'>
                use semantic
                class names.😎
              </h1>

              <h1 className='text-3xl text-gray-400 '>
                It's descriptive, faster, cleaner and easier to maintain.
              </h1>
            </div>
          </div>

        </ParallaxLayer>
        <ParallaxLayer offset={6} >
          <div className='relative w-full p-10 left-0 h-screen flex flex-col justify-center items-center'>
            <animated.h1 style={{
              fontSize: scrollYProgress.to(val => {
                return (`${80 - between(val, 0.27, 0.33) * 20}px`)
              })
            }} className='text-6xl font-black pb-10'>
              Take Tailwind CSS
            </animated.h1>
            <animated.h1 style={{ letterSpacing: scrollYProgress.to(val => between(val, 0.27, 0.33) * 20) }} className='text-6xl text-gray-400 pb-10'>
              To The Next Level
            </animated.h1>
            <h1 className='text-xl text-center w-[500px] text-gray-400 pb-10 '>
              daisyUI adds class names to Tailwind CSS
              for all common UI components.
              Class names like btn , card , toggle and many more.
            </h1>
            <h1 className='text-xl text-center w-[500px] text-green-400 pb-10 '>
              This allows us to focus on important things
              instead of styling basic elements for every project.
            </h1>
            <div className='p-8 rounded-lg select-none ring-4 ring-gray-400 hover:bg-gray-400 hover:text-black cursor-pointer  '>
              see all components
            </div>
          </div>

        </ParallaxLayer>
        <ParallaxLayer offset={7}>
          <div className='relative w-full p-10 left-0 h-screen flex flex-col justify-center items-center'>
            <div className='flex gap-5 pb-10'>

              <animated.span style={{
                color: scrollYProgress.to(val => {
                  if (val > 0.363) {
                    return ('white')
                  }
                  else {
                    return ('black')
                  }
                })
              }} className='text-6xl font-black text-black'>
                No
              </animated.span>
              <animated.span style={{
                color: scrollYProgress.to(val => {
                  if (val > 0.368) {
                    return ('white')
                  }
                  else {
                    return ('black')
                  }
                })
              }} className='text-6xl font-black text-black'>
                More
              </animated.span>
              <animated.span style={{
                color: scrollYProgress.to(val => {
                  if (val > 0.373) {
                    return ('white')
                  }
                  else {
                    return ('black')
                  }
                })
              }} className='text-6xl font-black text-black'>
                ugly
              </animated.span>
              <animated.span style={{
                color: scrollYProgress.to(val => {
                  if (val > 0.378) {
                    return ('white')
                  }
                  else {
                    return ('black')
                  }
                })
              }} className='text-6xl font-black text-black'>
                HTML
              </animated.span>
            </div>
            <h1 className='text-xl text-center w-[500px] text-gray-400 '>
              Write fewer class names
              Use component class names
              modify them using Tailwind CSS utilities.
            </h1>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={8} sticky={{ start: 8, end: 15 }}>
          <div className='w-full h-screen flex justify-center items-center' >
            <animated.div
              // style={{clipPath : scrollYProgress.to(val => {
              //   return(
              //     `polygon(${between(val ,0.5 ,0.57 )*100}% 0%, 100% 0%, 100% 100%, ${between(val ,0.48 ,0.57 )*100}% 100%)`
              //   )
              // })}}
              className='absolute w-[1200px] h-[550px] rounded-lg flex justify-center items-center bg-orange-300'>
              <div className='w-[500px] flex flex-col justify-center items-center'>
                <h1 className=' text-center text-3xl font-black text-black p-1'>
                  Unlimited themes
                </h1>
                <h1 className='text-2xl text-center text-red-700 p-0'>
                  with zero effort
                </h1>
                <h1 className='text-xs  text-center text-red-700 p-8'>
                  daisyUI adds a set of customizable color names to Tailwind CSS and these new colors use CSS variables for the values. Using daisyUI color names, you get Dark Mode and even more themes without adding a new class name.
                </h1>
              </div>
              <div className=' absolute top-[20px] left-10 w-[300px] h-[200px] rounded-sm bg-black'>

              </div>
              <div className=' absolute top-[230px] left-10 w-[300px] h-[290px] rounded-sm bg-black'>

              </div>
              <div className=' absolute top-[20px] left-[360px] w-[480px] h-[70px] rounded-sm bg-black'>

              </div>
              <div className=' absolute bottom-[20px] left-[360px] w-[480px] h-[70px] rounded-sm bg-black'>

              </div>
              <div className=' absolute top-[20px] right-10 w-[300px] h-[200px] rounded-sm bg-black'>

              </div>
              <div className=' absolute top-[230px] right-10 w-[300px] h-[290px] rounded-sm bg-black'>

              </div>
            </animated.div>

            {/* ****************************************************************************************** */}
            <animated.div
              style={{
                clipPath: scrollYProgress.to(val => {
                  return (
                    `polygon(${between(val, 0.51, 0.57) * 100}% 0%, 100% 0%, 100% 100%, ${between(val, 0.5, 0.57) * 100}% 100%)`
                  )
                })
              }}
              className='absolute w-[1200px] h-[550px] rounded-lg flex justify-center items-center bg-gray-400'>
              <div className='w-[500px] flex flex-col justify-center items-center'>
                <h1 className=' text-center text-3xl font-black text-black p-1'>
                  Unlimited themes
                </h1>
                <h1 className='text-2xl text-center text-black p-0'>
                  with zero effort
                </h1>
                <h1 className='text-xs  text-center text-black p-8'>
                  daisyUI adds a set of customizable color names to Tailwind CSS and these new colors use CSS variables for the values. Using daisyUI color names, you get Dark Mode and even more themes without adding a new class name.
                </h1>
              </div>
              <div className=' absolute top-[20px] left-10 w-[300px] h-[200px] bg-gray-100'>

              </div>
              <div className=' absolute top-[230px] left-10 w-[300px] h-[290px] bg-gray-100'>

              </div>
              <div className=' absolute top-[20px] left-[360px] w-[480px] h-[70px] rounded-lg bg-gray-100'>

              </div>
              <div className=' absolute bottom-[20px] left-[360px] w-[480px] h-[70px] bg-gray-100'>

              </div>
              <div className=' absolute top-[20px] right-10 w-[300px] h-[200px] bg-gray-100'>

              </div>
              <div className=' absolute top-[230px] right-10 w-[300px] h-[290px] bg-gray-100'>

              </div>
            </animated.div>

            {/* ***************************************************************************************************** */}

            <animated.div style={{
              clipPath: scrollYProgress.to((val) => {
                return (
                  `polygon(${between(val, 0.48, 0.53) * 100}% 0%, 100% 0%, 100% 100%, ${between(val, 0.47, 0.53) * 100}% 100%)`
                )
              })
            }} className='absolute w-[1200px] h-[550px] rounded-lg bg-white flex justify-center items-center'>
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
            </animated.div>
            {/* ***************************************************************************************************** */}

            <animated.div style={{
              clipPath: scrollYProgress.to((val) => {
                return (
                  `polygon(${between(val, 0.45, 0.49) * 100}% 0%, 100% 0%, 100% 100%, ${between(val, 0.44, 0.49) * 100}% 100%)`
                )
              })
            }} className='absolute w-[1200px] h-[550px] rounded-lg bg-black flex justify-center items-center'>
              <div className='w-[500px] flex flex-col justify-center items-center'>
                <h1 className=' text-center text-3xl font-black text-yellow-400 p-1'>
                  Unlimited themes
                </h1>
                <h1 className='text-2xl text-center text-yellow-200 p-0'>
                  with zero effort
                </h1>
                <h1 className='text-xs  text-center text-yellow-200 p-8'>
                  daisyUI adds a set of customizable color names to Tailwind CSS and these new colors use CSS variables for the values. Using daisyUI color names, you get Dark Mode and even more themes without adding a new class name.
                </h1>
              </div>
              <div className=' absolute top-[20px] left-10 w-[300px] h-[200px] rounded-3xl bg-green-500'>

              </div>
              <div className=' absolute top-[230px] left-10 w-[300px] h-[290px] rounded-3xl bg-green-500'>

              </div>
              <div className=' absolute top-[20px] left-[360px] w-[480px] h-[70px] rounded-3xl bg-green-500'>
              </div>
              <div className=' absolute bottom-[20px] left-[360px] w-[480px] h-[70px] rounded-3xl bg-green-500'>

              </div>
              <div className=' absolute top-[20px] right-10 w-[300px] h-[200px] rounded-3xl bg-green-500'>

              </div>
              <div className=' absolute top-[230px] right-10 w-[300px] h-[290px] rounded-3xl bg-green-500'>

              </div>
            </animated.div>

            {/* ***************************************************************************************************** */}
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={16}>
          {/* <Slider /> */}
        </ParallaxLayer>
        <ParallaxLayer offset={17}>
          {/* <OrderButton /> */}
        </ParallaxLayer>
        <ParallaxLayer offset={18}>
          {/* <Section3D/> */}
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}