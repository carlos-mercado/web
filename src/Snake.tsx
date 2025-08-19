import { useCallback, useRef, useEffect, useState } from 'react';
//import React from 'react';

function Snake() {
    type Direction = "left" | "right" | "up" | "down";

    const canvasRef = useRef<HTMLCanvasElement>(null);
    //0 = nothing; 1 = snake; 2 = fruit;
    const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
    const [fruit, setFruit] = useState({ x: 5, y: 5 });
    const directionRef = useRef<Direction>("right");

    function findEmptySpace(snakeArray: { x: number, y: number }[])
    {
        let possibleSpaces = [];
        for (let i = 0; i <= 9; i++) 
            {
            for (let j = 0; j <= 9; j++) 
                {
                // Only add if NOT part of the snake
                if (!snakeArray.some(cell => cell.x === i && cell.y === j)) {
                    possibleSpaces.push({ i, j });
                }
            }
        }
        if (possibleSpaces.length === 0) return null;
        return possibleSpaces[Math.floor(Math.random() * possibleSpaces.length)];
    }

    // Only allow direction changes that are not directly opposite
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        directionRef.current = (prev => {
            if (event.key === 'ArrowLeft' && prev !== "right") return "left";
            if (event.key === 'ArrowRight' && prev !== "left") return "right";
            if (event.key === 'ArrowUp' && prev !== "down") return "up";
            if (event.key === 'ArrowDown' && prev !== "up") return "down";
            return prev;
        })(directionRef.current);
    }, []);

    // Move the snake automatically every 150ms, always using the latest direction
    const [gameOver, setGameOver] = useState(false);
    useEffect(() => {
        if (gameOver) return;
        const interval = setInterval(() => {
            setSnake(prevSnake => {
                let xOffset = 0;
                let yOffset = 0;
                const dir = directionRef.current;
                if (dir === "left") xOffset = -1;
                else if (dir === "right") xOffset = 1;
                else if (dir === "down") yOffset = 1;
                else if (dir === "up") yOffset = -1;

                const newX = prevSnake[0].x + xOffset;
                const newY = prevSnake[0].y + yOffset;

                // If the new head is outside the grid, set game over and don't update the snake
                if (newX < 0 || newX > 9 || newY < 0 || newY > 9 || prevSnake.some(segment => segment.x === newX && segment.y === newY)) {
                    setGameOver(true);
                    return prevSnake;
                }

                const newSnake = [{ x: newX, y: newY }, ...prevSnake];

                // Check if snake eats the fruit
                if (newX === fruit.x && newY === fruit.y) {
                    const empty = findEmptySpace(newSnake);
                    if (empty) setFruit({ x: empty.i, y: empty.j });
                    // Grow the snake by adding a new head and keeping the rest
                    return [{ x: newX, y: newY }, ...prevSnake];
                } else {
                    // Move the snake by adding a new head and removing the tail
                    return [{ x: newX, y: newY }, ...prevSnake.slice(0, -1)];
                }
            });
        }, 150);
        return () => clearInterval(interval);
    }, [fruit, gameOver, snake]);

    useEffect(() => {
        //DAWING THE BOARD
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = 500;
        canvas.height = 500;
        for(let i = 50; i <= 500; i += 50) 
        {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 500);
        }

        for(let i = 50; i <= 500; i += 50) {
            ctx.moveTo(0, i);
            ctx.lineTo(500, i);
        }
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // DRAWING THE SNAKE
        for (let i = 0; i < snake.length; i++) 
        {
            ctx.beginPath();
            ctx.rect(snake[i].x * 50, snake[i].y * 50, 50, 50);
            if (i === 0) 
            {
                ctx.fillStyle = "#ff3333"; // bright red for head
            } 
            else 
            {
                // Each segment gets darker: decrease R and G values
                // Start from (255,51,51) and decrease by 20 per segment
                let r = Math.max(80, 255 - i * 10);
                let g = Math.max(0, 51 - i * 5);
                let b = Math.max(0, 51 - i * 5);
                ctx.fillStyle = `rgb(${r},${g},${b})`;
            }
            ctx.fill();
            ctx.closePath();
        }

        //DRAWING THE SNAKE
        ctx.beginPath();
        ctx.rect(fruit.x * 50, fruit.y * 50, 50, 50);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();

    }, [fruit, snake]);


    useEffect(() => {
        // Add event listener when the component mounts
        document.addEventListener('keydown', handleKeyDown);
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);



    return (
        <>
            <canvas
                ref={canvasRef}
                style={{ border: '1px solid #333' }}
            />
            {gameOver && <div style={{color: 'red', fontWeight: 'bold'}}>Game Over</div>}
        </>
    )
}

export default Snake;