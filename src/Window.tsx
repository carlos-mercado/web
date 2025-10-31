import Draggable from "react-draggable";
import React from 'react'
import closeIcon from './assets/close-icon.png';

interface WindowProps {
    windowName: string;
    contentHeight: number | string;
    contentWidth: number | string;
    content: any;
    contentZ: number;
    onClose?: () => void;
}

function Window({windowName, contentHeight, contentWidth, content, contentZ, onClose}: WindowProps)
{

    function finalHeight() 
    {
        let str : string = (parseInt(contentHeight)+ 31).toString() + "px";
        console.log(str);
        return str;
    }

    const mainStyles: React.CSSProperties = {
        width: "100%",
        height: "100%",
        display: "block", 
        position: 'absolute',
        backgroundColor: "#c6c6c6", // classic gray
        overflow: "hidden",
        marginTop: "31px"

    }


    const buttonStyles: React.CSSProperties = {
        height: "22px",
        width: "22px",
        backgroundColor: "#c6c6c6", // classic gray
        border: "2px solid #fff",
        borderTopColor: "#fff",
        borderLeftColor: "#fff",
        borderBottomColor: "#3b3b3bff",
        borderRightColor: "#3b3b3bff",
        boxShadow: "1px 1px 0 #3b3b3bff, inset 1px 1px 0 #fff",
        color: "black",
        fontWeight: "bold",
        fontFamily: "Tahoma, Geneva, sans-serif",
        fontSize: "14px",
        cursor: "pointer",
        marginRight: "10px",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
    }

    const windowControlsStyles: React.CSSProperties = {
        width: "100%",
        backgroundColor: "#000080",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
    };

    const tabTextStyles: React.CSSProperties = {
        textAlign: "left",
        color: "white",
        paddingLeft:"5px",
        fontSize: "8px",
    }


    const win: React.CSSProperties = {
        height: finalHeight(),
        width: contentWidth,
        zIndex: contentZ,
        position: 'absolute',
        overflow: 'hidden',
        borderLeft: "3px solid #c6c6c6",
        borderRight: "3px solid #ababab",
        borderBottom: "3px solid #c6c6c6",
        borderTop: "3px solid #ababab",


    }


    return (
        <>
            <Draggable>
                <div style={win}>
                    <div className="windowControls" style={windowControlsStyles}>
                        <p style={tabTextStyles}> {windowName}</p> 
                        <button 
                            style={buttonStyles}
                            onClick={onClose}
                        >
                            <img src={closeIcon}></img>
                        </button>
                    </div>
                    <div className="windowContent" style={mainStyles}>
                        {content}
                    </div>
                </div> 
            </Draggable>
        </>
    );

}

export default Window;
