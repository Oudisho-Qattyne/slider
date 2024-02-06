import React, { useState, useId, useRef, useEffect } from 'react'
import house from './../assets/SolarPower/house.png'
import standX2 from './../assets/SolarPower/standX2.png'
import standX1 from './../assets/SolarPower/stand.png'
import solarPanel from './../assets/SolarPower/solarPanel.png'
import door from './../assets/SolarPower/door.png'
import SolarPanel from './SolarPanel'
import { useDrop } from 'react-dnd'
import { v4 as uuidv4 } from 'uuid'
import Stand from './Stand'
import { motion, AnimatePresence } from 'framer-motion'


export default function ChooseStand({setTotalInputWatt , setDoneWithThePanels}) {
    const SolarPanels = [
        {
            image: solarPanel,
            watt: 200,
            id: null
        },
        {
            image: solarPanel,
            watt: 300,
            id: null
        },
        {
            image: solarPanel,
            watt: 400,
            id: null
        }
    ]

    const stands = [
        {
            image: standX1,
            number: 4,
            id: null
        },
        {
            image: standX2,
            number: 8,
            id: null
        }
    ]

    const [solars, setSolars] = useState([]);
    const [canNotAddMore, setCanNotAddMore] = useState(false);
    const [stand, setStand] = useState({
        image: null,
        number: 0,
        id: null
    },);

    const [totalWatt, setTotalWatt] = useState(0);
    const solarsNumber = useRef(0);
    const standNumber = useRef(0);

    const [{ isOverDroppingstands }, dropStands] = useDrop(() => ({
        accept: 'stand',
        drop: (item) => {
            dropStand(item.number)
        }
    }))

    const [{ isOverDroppingPanels }, dropPanel] = useDrop(() => ({
        accept: "solarPanel",
        drop: ((item) => {
            return dropSolarPanel(item.watt)
        })
    }))

    useEffect(() => {
        let totalWatt = 0;
        for (let i = 0; i < solars.length; i++) {
            totalWatt += solars[i].watt;
        }
        setTotalWatt(totalWatt);
        setTotalInputWatt(totalWatt)
    }, [solars])

    const dropStand = (number) => {
        setSolars([])
        solarsNumber.current = 0
        for (let i = 0; i < stands.length; i++) {
            if (stands[i].number == number) {
                standNumber.current = stands[i].number
                setStand(stands[i])
            }
        }
    }
    const removeStand = () => {
        setStand({
            image: null,
            number: 0,
            id: null
        })
        setSolars([])
        solarsNumber.current = 0
    }
    const dropSolarPanel = (watt) => {
        if (solarsNumber.current >= standNumber.current) {
            setCanNotAddMore(true)
            setTimeout(() => { setCanNotAddMore(false) }, 2000);
        }
        else if (solarsNumber.current < standNumber.current) {
            for (let i = 0; i < SolarPanels.length; i++) {
                if (SolarPanels[i].watt == watt) {
                    const panel = structuredClone(SolarPanels[i]);
                    const id = uuidv4()
                    panel.id = id;
                    setSolars(prevSolars => [...prevSolars, panel]);
                    solarsNumber.current++
                    break;
                }
                continue;
            }
        }
    }

    const removeSolarPanel = (id) => {
        const copySolars = solars;
        const newSolars = []
        for (let index = 0; index < copySolars.length; index++) {
            if (copySolars[index].id !== id) {
                newSolars.push(copySolars[index]);
            }

        }
        solarsNumber.current--;
        setSolars(newSolars)
    }
    return (
        <div className="relative w-screen h-screen flex justify-center p-10 items-center overflow-hidden">
            <AnimatePresence>
                {canNotAddMore && <motion.h1
                    initial={{ right: -1000 }}
                    animate={{ right: 40 }}
                    exit={{ right: -1000 }}
                    transition={{ duration: 0.5}}
                    className='absolute top-10 text-2xl bg-red-700 rounded-xl py-5 px-20 z-20 ease-in'>
                    can't Add More
                </motion.h1>}
            </AnimatePresence>
            <div className='relative top-0 left-0 w-48 h-[660px] bg-cyan-900 rounded-tl-3xl rounded-bl-3xl z-10 flex flex-col py-10 gap-5 overflow-y-scroll overflow-x-hidden scrollbar-hide '>
                <h1 className='text-white text-center font-black text-xl select-none'>Stands</h1>
                {
                    stands.map(stand =>
                        <Stand key={stand.number} image={stand.image} number={stand.number} />
                    )
                }

            </div>
            <AnimatePresence className="overflow-hidden">

                <motion.div exit={{scale:10}} transition={{duration:1}} className='relative w-fit h-fit bg-blue-300 flex justify-center items-center'>
                    <div style={{ '--image-url': `url(${house})` }} className='relative  w-[860px] h-[660px] bg-[image:var(--image-url)]  bg-left bg-cover'>
                        <div ref={dropStands} className='relative left-44 w-[416px] h-[316px] '>
                            {stand.number == 0 && <div className='absolute w-full h-full border-[5px] border-dashed rounded-3xl border-gray-700 animate-pulse flex flex-col justify-center items-center z-10'>
                                <h1 className='text-4xl text-center select-none text-gray-700 font-black'>Add Stand</h1>
                                <h1 className='text-xl text-center select-none text-gray-700 font-black'>Drag and Drop</h1>
                            </div>}
                            {stand.number !== 0 &&
                                <>
                                    <div onClick={removeStand} style={{ '--image-url': `url(${stand.image})` }} className=' w-full h-full bg-[image:var(--image-url)]  bg-left bg-cover'>
                                    </div>
                                    <AnimatePresence>
                                        {stand.number == 4 && <div ref={dropPanel} style={{ transform: 'rotateX(49deg) rotateY(-5deg) rotateZ(-32deg)' }} className='absolute left-[127px] top-[111px] grid grid-cols-4 justify-start items-start gap-[2px]  w-[257px] h-[158px]  '>
                                            <h1 className='absolute -top-10 text-3xl font-bold select-none'>{totalWatt / 1000} KW</h1>
                                            <h1 className='absolute -top-10 right-0 text-3xl font-bold select-none'>{solarsNumber.current} panels</h1>
                                            {solars.length == 0 && <div className='absolute w-full h-full border-[5px] border-dashed rounded-3xl border-gray-700 animate-pulse flex flex-col justify-center items-center z-10'>
                                                <h1 className='text-2xl text-center select-none text-gray-700 font-black'>ADD SolarPanels</h1>
                                                <h1 className='text-xl text-center select-none text-gray-700 font-black'>Drag and Drop</h1>
                                            </div>}
                                            {solars.map(solar => {
                                                return <div onClick={() => removeSolarPanel(solar.id)} key={solar.id} style={{ '--image-url': `url(${solar.image})` }} className='w-[60px] h-40 bg-[image:var(--image-url)]  bg-left bg-cover group flex justify-center items-center cursor-help z-20' >
                                                    <h1 className='text-xl font-black opacity-0 group-hover:opacity-100 transition duration-300 text-center select-none '>{solar.watt} Watt</h1>
                                                </div>
                                            })}
                                        </div>}
                                        {stand.number == 8 && <div ref={dropPanel} style={{ transform: 'rotateX(49deg) rotateY(-5deg) rotateZ(-32deg)' }} className='absolute left-[82px] top-[-19px] grid grid-cols-4 justify-start items-start gap-[2px]  w-[257px] h-[330px]  '>
                                            <h1 className='absolute -top-10 text-4xl font-bold select-none'>{totalWatt / 1000} KW</h1>
                                            <h1 className='absolute -top-10 right-0 text-3xl font-bold select-none'>{solarsNumber.current} panels</h1>
                                            {solars.length == 0 && <div className='absolute w-full h-full border-[5px] border-dashed rounded-3xl border-gray-700 animate-pulse flex flex-col justify-center items-center z-10'>
                                                <h1 className='text-4xl text-center select-none text-gray-700 font-black'>Add SolarPanels</h1>
                                                <h1 className='text-xl text-center select-none text-gray-700 font-black'>Drag and Drop</h1>
                                            </div>}
                                            {solars.map(solar => {
                                                return <div onClick={() => removeSolarPanel(solar.id)} key={solar.id} style={{ '--image-url': `url(${solar.image})` }} className='w-[60px] h-40 bg-[image:var(--image-url)]  bg-left bg-cover group flex justify-center items-center cursor-help' >
                                                    <h1 className='text-xl font-black opacity-0 group-hover:opacity-100 transition duration-300 text-center select-none '>{solar.watt} Watt</h1>
                                                </div>
                                            })}
                                        </div>}
                                    </AnimatePresence>
                                </>
                            }
                        </div>
                        {solars.length!==0 && <div style={{ '--image-url': `url(${door})` }} onClick={() => setDoneWithThePanels(true)} 
                        className= 'relative left-96 top-[30px] bg-[image:var(--image-url)] w-[50px] h-[84px] bg-left bg-cover group cursor-grab animate-ping hover:animate-none'>
                            <h1 className='absolute px-5 text-2xl font-black opacity-0 group-hover:opacity-100 transition duration-300 bg-gray-400  rounded-xl '>ENTER</h1>
                        </div>}
                    </div>
                </motion.div>
            </AnimatePresence>
            <div className='relative top-0 left-0 w-48 h-[660px] bg-cyan-900  backdrop-blur-3xl z-10 flex flex-col py-10 rounded-tr-3xl rounded-br-3xl gap-7 overflow-y-scroll overflow-x-hidden scrollbar-hide'>
                <h1 className='text-white text-center font-black text-xl select-none'>solar Panels</h1>
                {
                    SolarPanels.map(solarPanel =>
                        <SolarPanel key={solarPanel.watt} id={solarPanel.id} image={solarPanel.image} watt={solarPanel.watt} />
                    )
                }
            </div>

        </div>
    )
}
