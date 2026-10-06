import { useEffect, useState } from "react";

function Clock(){
    const [time, setTime] = useState(new Date())
    
    useEffect(()=>{
            setInterval(()=> setTime(new Date()), 1000)
    }, [])
    
    return(
        <>
            <p className="mr-[3px] flex h-[80%] items-center rounded-[1px] border-t border-l border-r-white border-b-white border-t-[#808080] border-l-[#808080] px-[9px] text-right text-[10px] text-black">{time.toLocaleTimeString()}</p>
        </>
    )
}

export default Clock;
