import { useCallback, useRef, useEffect, useState } from 'react';
//import React from 'react';

function Snake() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    //0 = nothing; 1 = snake; 2 = fruit;
    const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
    const [fruit, setFruit] = useState({ x: 5, y: 5 });

    function findEmptySpace(snakeArray: { x: number, y: number }[])
    {
        let possibleSpaces = [];
        for (let i = 0; i <= 9; i++) {
            for (let j = 0; j <= 9; j++) {
                // Only add if NOT part of the snake
                if (!snakeArray.some(cell => cell.x === i && cell.y === j)) {
                    possibleSpaces.push({ i, j });
                }
            }
        }
        // If no empty spaces, return null (game over)
        if (possibleSpaces.length === 0) return null;
        return possibleSpaces[Math.floor(Math.random() * possibleSpaces.length)];
    }

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        let xOffset = 0;
        let yOffset = 0;

        if (event.key === 'ArrowLeft') xOffset = -1;
        else if (event.key === 'ArrowRight') xOffset = 1;
        else if (event.key === 'ArrowDown') yOffset = 1;
        else if (event.key === 'ArrowUp') yOffset = -1;
        else return;

        setSnake(prevSnake => {
            const newX = Math.max(0, Math.min(9, prevSnake[0].x + xOffset));
            const newY = Math.max(0, Math.min(9, prevSnake[0].y + yOffset));
            const newSnake = [{ x: newX, y: newY }, ...prevSnake];

            // Check if snake eats the fruit
            if (newX === fruit.x && newY === fruit.y) 
            {
                const empty = findEmptySpace(newSnake);
                if (empty) setFruit({ x: empty.i, y: empty.j });

                // Grow the snake by adding a new head and keeping the rest
                return [{ x: newX, y: newY }, ...prevSnake];
            } 
            else  //no fruit
            {
                // Move the snake by adding a new head and removing the tail
                const newSnake = [{ x: newX, y: newY }, ...prevSnake.slice(0, -1)];
                return newSnake;
            }
        });



    }, [fruit]);

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

        //DRAWING THE SNAKE
        for(var snakeCell in snake)
        {
            ctx.beginPath();
            ctx.rect(snake[snakeCell].x * 50, snake[snakeCell].y * 50, 50, 50);
            ctx.fillStyle = "red";
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
    }, [handleKeyDown]); // Re-run effect if handleKeyDown changes (which it won't with empty dependency array)



    return (
        <>
        <div>
        </div>
            <canvas
                ref={canvasRef}
                style={{ border: '1px solid #333' }}
            />

        </>
    )
}

export default Snake;