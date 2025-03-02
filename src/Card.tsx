import Draggable from "react-draggable";

interface  IconInfo{
    icon: string;
    cardID: string;
    onIconClick: (info: [string, string]) => void;
    isSelected: boolean;
}


function Card(props:IconInfo){

    const handleIconClick = (event: {detail: any;}) => {
        props.onIconClick([props.cardID, event.detail])
    }
    
    const cardClickedStyle = {
        backgroundColor: props.isSelected ? 'rgba(0, 116, 161, 0.5)' : 'rgba(0, 116, 161, 0)',
        border: props.isSelected ? '2px solid grey' : ''
    }

    return(
        <Draggable>
            <div className="card" onClick={handleIconClick} style={cardClickedStyle}>
                <img draggable="false" src={props.icon} alt="icon-picture" className="card-image"></img>
                <p>{props.cardID}</p>
            </div>
        </Draggable>
    )
}

export default Card;