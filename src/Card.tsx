import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useRef } from 'react';

interface  IconInfo{
    icon: string;
    cardID: string;
    onIconClick: (info: [string, string]) => void;
    isSelected: boolean;
}

// Minimum distance (in pixels) before considering it a drag rather than a tap
const DRAG_THRESHOLD = 5;

function Card(props:IconInfo){
    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });
    const isMobile = useRef('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const triggerClick = (clickCount: string) => {
        props.onIconClick([props.cardID, clickCount]);
    };

    const handleDragStart = (_e: DraggableEvent, data: DraggableData) => {
        isDragging.current = false;
        startPos.current = { x: data.x, y: data.y };
    };

    const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
        // Only consider it a drag if moved beyond threshold
        const deltaX = Math.abs(data.x - startPos.current.x);
        const deltaY = Math.abs(data.y - startPos.current.y);
        if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
            isDragging.current = true;
        }
    };

    const handleDragStop = () => {
        // On mobile, if we didn't drag, treat it as a click
        if (isMobile.current && !isDragging.current) {
            triggerClick('1');
        }
        // Reset for next interaction
        isDragging.current = false;
    };

    const handleClick = (event: React.MouseEvent) => {
        // On mobile, clicks are handled in onStop, so ignore here
        if (isMobile.current) {
            return;
        }
        
        // On desktop, use the click event with detail for double-click detection
        const detail = event.detail ? String(event.detail) : '1';
        triggerClick(detail);
    };

    const cardClickedStyle = {
        backgroundColor: props.isSelected ? 'rgba(0, 116, 161, 0.5)' : 'rgba(0, 116, 161, 0)',
        border: props.isSelected ? '2px solid grey' : ''
    }

    return(
        <Draggable
            onStart={handleDragStart}
            onDrag={handleDrag}
            onStop={handleDragStop}
        >
            <div 
                className="card" 
                onClick={handleClick}
                style={cardClickedStyle}
            >
                <img draggable="false" src={props.icon} alt="icon-picture" className="card-image"></img>
                <p>{props.cardID}</p>
            </div>
        </Draggable>
    )
}

export default Card;
