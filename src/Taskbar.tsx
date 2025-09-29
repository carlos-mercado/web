import Clock from './Clock.tsx'
import windowsIcon from './assets/windows.png'

function Taskbar(){
    return(
        <>
        <div className='startButton'>
            <img src={windowsIcon}></img>
            <span className='carlos'>Carlos Mercado</span>
        </div>
        <Clock></Clock>
        </>
    )
}

export default Taskbar;