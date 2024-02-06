import React, { useEffect, useRef, useState } from 'react'
import data from './Slides'
import { motion, AnimatePresence } from 'framer-motion'
import RestOfTheSlides from './RestOfTheSlides';

import Control from './Control';

export default function Slider() {
    const [active, setActive] = useState(0);
    const [delayActive, setDelayActive] = useState(0);
    const [automate, setAutomate] = useState(true)
    let delay = 5000;
    let restOfTheSLides = []
    const timeoutRef = useRef(null);
    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        if (automate) {
            timeoutRef.current = setTimeout(
                () => {
                    setActive(prevIndex => prevIndex === data.length - 1 ? 0 : prevIndex + 1),
                        setTimeout(() => {
                            setDelayActive(prevIndex => prevIndex === data.length - 1 ? 0 : prevIndex + 1)
                        }, 1000)
                },
                delay
            );
        }
        return () => {
            resetTimeout();
        };
    }, [active]);


    const nextSlide = () => {
        setAutomate(false)
        setActive(prevActive => prevActive == data.length - 1 ? 0 : prevActive + 1)
        setTimeout(() => {
            setDelayActive(prevIndex => prevIndex === data.length - 1 ? 0 : prevIndex + 1)

        }, 1000)

    }

    const previousSlide = () => {
        setAutomate(false)
        setActive(prevActive => prevActive == 0 ? data.length - 1 : prevActive - 1)
        setDelayActive(prevIndex => prevIndex === 0 ? data.length - 1 : prevIndex - 1)

    }

    for (let index = active + 1; index < data.length; index++) {
        restOfTheSLides.push(<RestOfTheSlides setDelayActive={setDelayActive} setAutomate={setAutomate} key={index} image={data[index].image} text={data[index].text} title={data[index].title} setActive={setActive} index={index} />)
    }


    return (
        <div className=' relative min-w-screen min-h-screen justify-center items-center flex overflow-hidden'>
            <div className='w-full h-full justify-center items-center flex gap-5 overflow-hidden'>
                <AnimatePresence>
                    <motion.div
                        style={{ '--image-url': `url(${data[delayActive].image})` }}
                        key={delayActive}
                        initial={{ backgroundPosition: `20% 100%` }}
                        animate={{ backgroundPosition: `${data[delayActive].positionX} ${data[delayActive].positionY}` }}
                        transition={{ duration: 0.7, opacity: { duration: 2 }, backgroundPosition: { delay: 1, duration: 2 }, type: 'spring' }}
                        src={data[delayActive].image}
                        className='absolute top-0 left-0 h-screen w-screen bg-[image:var(--image-url)]  bg-cover ' />
                    <AnimatePresence>

                        {data[active + 1] && active + 1 > delayActive &&
                            <motion.div
                                key={active}
                                style={{ '--image-url': `url(${data[active + 1].image})` }}
                                exit={{ backgroundPosition: `20% 100%`, zIndex: 2, top: 0, left: 0, width: '100%', height: '100%' }}
                                transition={{ duration: 1 }}
                                className='absolute bottom-[106px] w-40 right-[500px] h-52 bg-center bg-[image:var(--image-url)] rounded-lg shadow-lg max-[1200px]:h-36 max-[1200px]:bottom-[138px] bg-cover -z-40 max-[700px]:right-[150px] max-[700px]:bottom-[138px]' />}
                    </AnimatePresence>
                </AnimatePresence>
                <AnimatePresence>
                    <motion.div key={data[active].image} exit={{ x: -700 }} layout className='absolute top-0 h-full flex flex-col justify-center items-start  left-0 px-10 py-20 max-[1200px]:justify-start max-[400px]:px-5 max-[400px]:pt-48  '>
                        {data[active].title && <div className='relative  overflow-hidden'>
                            <motion.h1
                                key={data[active].title}
                                initial={{ y: 300 }}
                                animate={{ y: 0 }}
                                transition={{ type: "just", duration: 0.4, delay: 1 }}
                                className='select-none text-white text-6xl font-black w-[500px] pb-5 max-[600px]:w-[350px] max-[600px]:pb-2 max-[600px]:text-5xl max-[400px]:text-3xl' >{data[active].title}</motion.h1>
                        </div>}
                        {data[active].text && <div className='relative overflow-hidden'>
                            <motion.h1
                                key={data[active].text}
                                initial={{ y: 300 }}
                                animate={{ y: -10 }}
                                transition={{ type: "just", duration: 0.6, delay: 1 }}
                                className='select-none text-white text-4xl  w-[500px] max-[600px]:w-[350px] max-[600px]:text-3xl max-[400px]:text-xl'>{data[active].text}</motion.h1>
                        </div>}
                    </motion.div>
                </AnimatePresence>
                <div className='absolute h-[350px] bottom-10 right-0'>
                    <motion.div layout className='relative top-0 w-[700px] h-[400px] overflow-hidden flex justify-start items-center gap-5 z-10 pt-10 pb-20 pl-10  max-[1200px]:w-[700px]  max-[700px]:w-[350px] '>
                        {restOfTheSLides}
                    </motion.div>

                    <Control nextSlide={nextSlide} previousSlide={previousSlide} active={active} length={data.length} />
                </div>

            </div>
        </div>
    )
}
