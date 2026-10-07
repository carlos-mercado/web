import Draggable from "react-draggable";
import React from 'react'
import closeIcon from './assets/close-icon.png';

interface WindowProps {
    windowName: string;
    contentHeight: string;
    contentWidth: string;
    content: any;
    contentZ: number;
    onClose?: () => void;
    className: string;
}

function Window({windowName, contentHeight, contentWidth, content, contentZ, onClose, className}: WindowProps)
{
    function finalHeight() 
    {
        // If contentHeight already includes a unit, return as-is
        if (contentHeight.endsWith("vh") || contentHeight.endsWith("px")) {
            return contentHeight;
        }
        // Otherwise, assume pixels
        return `${contentHeight}px`;
    }

    const win: React.CSSProperties = {
        height: finalHeight(),
        width: contentWidth,
        overflow: 'hidden',
    }


    return (
        <>
            <Draggable
            >
                <div style={{ zIndex: contentZ }} className="absolute top-1/2 left-1/2">
                  <div style={win} className={`window-frame relative -translate-x-1/2 -translate-y-1/2 ${className}`}>
                    <div className="absolute top-0 left-0 z-[2] flex h-[30px] w-full items-center justify-between bg-[#000080]">
                        <p className="pl-[5px] text-left text-[8px] text-white">{windowName}</p> 
                        <button
                            className="my-[2px] mr-[10px] flex h-[22px] w-[22px] items-center justify-center border-2 border-t-white border-l-white border-b-[#3b3b3b] border-r-[#3b3b3b] bg-[#c6c6c6] p-0 text-[14px] font-bold text-black shadow-[1px_1px_0_#3b3b3b,inset_1px_1px_0_#fff] [font-family:Tahoma,Geneva,sans-serif]"
                            onClick={e => {
                                e.stopPropagation();
                                if (onClose) onClose();
                            }}
                            onTouchEnd={e => {
                                e.stopPropagation();
                                if (onClose) onClose();
                            }}
                        >
                            <img src={closeIcon} alt="Close" />
                        </button>
                    </div>
                    <div className="windowContent window-content w-full">
                        {content}
                    </div>
                  </div>
                </div>
            </Draggable>
        </>
    );

}

export default Window;
