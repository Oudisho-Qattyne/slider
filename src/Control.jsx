import React from 'react'
import Hr from './UI/Hr';
import Nums from './UI/Nums';

export default function Control({previousSlide , nextSlide , active , length}) {
  return (
    <div className='absolute bottom-0 w-full flex justify-start items-center px-5 py-3 gap-3 z-20'>
        {/* <div className='flex justify-center items-center'>
            <h1 className='select-none text-xl w-16 h-16  text-white  hover:font-bold hover:bg-yellow-700 ring-1 ring-white hover:ring-4 hover:ring-white transition duration-500 rounded-full cursor-pointer flex justify-center items-center' onClick={previousSlide}>
                &lt;
            </h1>
        </div> */}

        <div className='flex justify-center items-center '>
            <h1 className='select-none  text-xl w-16 h-16 text-white hover:font-bold hover:bg-yellow-700 ring-1 ring-white hover:ring-4 hover:ring-white transition duration-500 rounded-full  cursor-pointer flex justify-center items-center' onClick={nextSlide}>
             &gt;
            </h1>
        </div>
        <Hr value={active} maxValue={length}/>
        <div>
            <Nums length={length} active={active}/>
        </div>
</div>
  )
}
