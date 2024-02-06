import React, { useContext } from 'react'
import livingRoom from './../assets/SolarPower/livingRoom.png'
import WattConsumption from '../WattConsumption'
import Machine from '../chooseWashAndRefr/Machine'
import edit from './../assets/edit.png'
import { useDrop } from 'react-dnd'
import { StateContext } from '../contextState'


export default function ChooseTv({ setDoneWithKitchen , setDoneWithTheLivingRoom }) {
    const { solarPowerState, dispatch } = useContext(StateContext);

    const [{ isOverDroppingTv }, dropTv] = useDrop(() => ({
        accept: 'Tv',
        drop: (items) => {
            return dispatch({ type: 'dropMachine', payload: 'Tv' })
        }
    }))

    const [{ isOverDroppingAc }, dropAc] = useDrop(() => ({
        accept: 'Ac',
        drop: (items) => {
            return dispatch({ type: 'dropMachine', payload: 'Ac' })
        }
    }))

    return (
        <div className="relative w-screen h-screen flex justify-center p-10 items-center overflow-hidden max-sm:flex-col-reverse">
            <div className='relative top-0 left-0 w-48 h-[660px] bg-cyan-900 rounded-tl-3xl rounded-bl-3xl z-10 flex flex-col py-10 gap-5 overflow-scroll  scrollbar-hide max-lg:h-[528px] max-md:h-[462px] max-sm:h-32 max-sm:w-[432px]  max-sm:flex-row max-sm:rounded-tl-none max-sm:rounded-br-3xl max-sm:overflow-y-hidden max-[440px]:w-[360px] '>
                <h1 className='text-white text-center font-black text-xl select-none'>
                    Machines
                </h1>
                {
                    Object.keys(solarPowerState.LivingRoom).map(machine =>
                        <Machine
                            className='bg-[image:var(--image-url)]  bg-center bg-cover  w-[100px] h-[114px] z-10'
                            key={solarPowerState.LivingRoom[machine].name}
                            image={solarPowerState.LivingRoom[machine].image}
                            type={solarPowerState.LivingRoom[machine].type}
                            name={solarPowerState.LivingRoom[machine].name} />
                    )
                }
            </div>



            <div
                style={{ '--image-url': `url(${livingRoom})` }}
                className='relative  w-[723px] h-[660px] bg-[image:var(--image-url)] bg-left rounded-tr-3xl rounded-br-3xl bg-cover max-lg:w-[576px] max-lg:h-[528px] max-md:w-[504px] max-md:h-[462px] max-sm:w-[432px] max-sm:h-[396px] max-sm:rounded-br-none max-sm:rounded-tl-3xl max-[440px]:w-[360px] max-[440px]:h-[330px]'>
                <div
                    onClick={() => setDoneWithKitchen(false)}
                    style={{ clipPath: 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)' }}
                    className='absolute top-3/4 left-1 w-20 h-20 bg-black flex justify-center items-center cursor-pointer hover:scale-105 transition duration-300'>
                    <h1 className='relative left-2 text-center font-black text-sm select-none'>
                        Back to Kitchen
                    </h1>
                </div>
                <div
                    onClick={() => setDoneWithTheLivingRoom(true)}
                    style={{ clipPath: 'polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%)' }}
                    className='absolute top-3/4 right-1 w-20 h-20 bg-black flex justify-center items-center cursor-pointer  hover:scale-105 transition duration-300 '>
                    <h1 className='relative right-2 text-center font-black text-sm select-none'>
                        to the solutions
                    </h1>
                </div>
                <div
                    ref={dropTv}
                    className='absolute top-36 left-[500px] w-[159px] h-[182px] '>
                    {
                        !solarPowerState.LivingRoom.Tv.show &&
                        <div className='absolute w-full h-full border-[5px] border-dashed rounded-3xl border-gray-700 animate-pulse flex flex-col justify-center items-center z-40'>
                            <h1 className='text-xl pb-10 text-center select-none text-gray-700 font-black'>
                                Add TV
                            </h1>
                            <h1 className='text-xl text-center select-none text-gray-700 font-black'>
                                Drag and Drop
                            </h1>
                        </div>
                    }

                </div>
                {solarPowerState.LivingRoom.Tv.show &&
                    <div className='relative'>

                        <div
                            onClick={() => dispatch({ type: "editWattConsumption", payload: 'Tv' })}
                            className=' absolute top-36 left-[490px] w-7 h-7 rounded-lg bg-gray-500 flex justify-center items-center cursor-pointer z-30 ring-1 ring-black hover:scale-[0.9] hover:ring-white transition duration-300'>
                            <img src={edit} className='w-5 h-5' />
                        </div>
                        <div
                            onClick={() => dispatch({ type: 'removeMachine', payload: 'Tv' })}
                            style={{ '--image-url': `url(${solarPowerState.LivingRoom.Tv.image})` }}
                            className=' absolute top-36 left-[500px] w-[159px] h-[182px] bg-[image:var(--image-url)] group bg-left bg-cover cursor-pointer '>
                            {
                                solarPowerState.LivingRoom.Tv.watt &&
                                <h1
                                    style={{ transform: 'rotateX(25deg) rotateY(44deg) rotateZ(0deg)' }}
                                    className=' absolute top-12 left-3 w-32 h-20 text-3xl text-center flex justify-center items-center rounded-lg text-white font-black opacity-0 select-none transition duration-300 group-hover:opacity-100'>
                                    {solarPowerState.LivingRoom.Tv.watt} watt
                                </h1>
                            }
                        </div>
                        {
                            solarPowerState.LivingRoom.Tv.edit &&
                            <WattConsumption
                                className='absolute top-72 left-[400px] w-[250px] rounded-lg backdrop-blur-lg ring-1 ring-white shadow-md flex flex-col justify-center items-center z-50'
                                machine={'Tv'} />
                        }
                    </div>
                }
                <div
                    ref={dropAc}
                    className='absolute top-16 left-[130px] w-[200px] h-[182px] max-lg:w-[112px] max-lg:h-[232px] max-lg:top-12 max-lg:left-[380px] max-md:w-[98px] max-md:h-[203px] max-md:top-7 max-md:left-[340px] max-sm:w-[84px] max-sm:h-[174px] max-sm:left-[290px] max-[440px]:w-[70px] max-[440px]:h-[145px] max-[440px]:left-[240px]'>
                    {
                        !solarPowerState.LivingRoom.Ac.show &&
                        <div
                            className='absolute w-full h-full border-[5px] border-dashed rounded-3xl border-gray-700 animate-pulse flex flex-col justify-center items-center z-40 '>
                            <h1 className='text-xl pb-10 text-center select-none text-gray-700 font-black'>
                                Add Ac
                            </h1>
                            <h1 className='text-xl text-center select-none text-gray-700 font-black'>
                                Drag and Drop
                            </h1>
                        </div>
                    }


                </div>
                {solarPowerState.LivingRoom.Ac.show &&
                    <div className='relative'>

                        <div
                            onClick={() => dispatch({ type: "editWattConsumption", payload: 'Ac' })}
                            className=' absolute top-28 left-[165px] w-7 h-7 rounded-lg bg-gray-500 flex justify-center items-center cursor-pointer z-30 ring-1 ring-black hover:scale-[0.9] hover:ring-white transition duration-300'>
                            <img src={edit} className='w-5 h-5' />
                        </div>
                        <div
                            onClick={() => dispatch({ type: 'removeMachine', payload: 'Ac' })}
                            style={{ '--image-url': `url(${solarPowerState.LivingRoom.Ac.image})` }}
                            className=' absolute top-16 left-[120px] w-[200px] h-[182px]  bg-[image:var(--image-url)] group bg-left bg-cover cursor-pointer'>
                            {
                                solarPowerState.LivingRoom.Ac.watt &&
                                <h1
                                    style={{ transform: 'rotateX(-24deg) rotateY(42deg) rotateZ(0deg)' }}
                                    className=' absolute top-14 left-10 w-32 h-20 text-2xl text-center flex justify-center items-center rounded-lg text-black font-black opacity-0 select-none transition duration-300 group-hover:opacity-100'>
                                    {solarPowerState.LivingRoom.Ac.watt} watt
                                </h1>
                            }
                        </div>
                        {
                            solarPowerState.LivingRoom.Ac.edit &&
                            <WattConsumption
                                className='absolute top-44 left-[40px] w-[250px] rounded-lg backdrop-blur-lg ring-1 ring-white shadow-md flex flex-col justify-center items-center z-50'
                                machine={'Ac'} />
                        }
                    </div>
                }
            </div>
            {/* <div className='relative top-0 left-0 w-48 h-[660px] bg-cyan-900  backdrop-blur-3xl z-10 flex flex-col py-10 rounded-tr-3xl rounded-br-3xl gap-7 overflow-y-scroll overflow-x-hidden scrollbar-hide'>

            </div> */}

        </div>
    )
}
