import Draggable from "react-draggable";

import React from 'react'

interface WindowProps {
    contentHeight: number | string;
    contentWidth: number | string;
    content: any;
    onClose?: () => void;
}

function Window({contentHeight, contentWidth, content, onClose}: WindowProps)
{


    const mainStyles: React.CSSProperties = {
        height: contentHeight,
        width: contentWidth,
        backgroundColor: "rgba(66, 135, 255, 0.5)",
        display: "block",
        position: 'absolute',
        borderLeft: "inset",
        borderRight: "inset",
        borderBottom: "inset",
        paddingTop: "20px"
    }


    const buttonStyles: React.CSSProperties = {
        height: "22px",
        width: "22px",
        backgroundColor: "#e0e0e0", // classic gray
        border: "2px solid #fff",
        borderTopColor: "#fff",
        borderLeftColor: "#fff",
        borderBottomColor: "#808080",
        borderRightColor: "#808080",
        boxShadow: "1px 1px 0 #808080, inset 1px 1px 0 #fff",
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
        height: 25,
        width: mainStyles.width as number,
        backgroundColor: "#010080",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        boxShadow: "0 1px 0 #fff",
        borderTop: "inset",
        borderLeft: "inset",
        borderRight: "inset",
        borderBottom: "inset"
    };

    return (
        <>
            <Draggable>
                <div>
                    <div className="windowControls" style={windowControlsStyles}>
                        <button 
                            style={buttonStyles}
                            onClick={onClose}
                        >
                            X
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