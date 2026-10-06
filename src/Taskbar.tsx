import Clock from './Clock.tsx'
import windowsIcon from './assets/windows.png'

function Taskbar(){
    return(
        <>
        <div className='ml-[2px] mr-auto mb-[2px] inline-flex h-[75%] items-center justify-center border border-t-white border-l-white border-r-gray-500 border-b-gray-500 bg-[#c0c0c0] px-[2px] text-left shadow-[inset_1px_1px_#dfdfdf,1px_0_#000,0_1px_#000,1px_1px_#000]'>
            <img src={windowsIcon} alt="" />
            <span className='px-1 text-[7px]'>Carlos Mercado</span>
        </div>
        <Clock></Clock>
        </>
    )
}

export default Taskbar;
