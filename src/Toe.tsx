import React, { useRef, useEffect, useState } from 'react';

function Toe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [turn, setTurn]  = useState("red");
    const [grid, setGrid] = useState(() => Array(3).fill(null).map(() => Array(3).fill("")));
    const [winner, setWinner] = useState("");

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 300;
        canvas.height = 300;

        ctx.beginPath();
        ctx.moveTo(100, 0);
        ctx.lineTo(100, 300);
        ctx.moveTo(200, 0);
        ctx.lineTo(200, 300);
        ctx.moveTo(0, 100);
        ctx.lineTo(300, 100);
        ctx.moveTo(0, 200);
        ctx.lineTo(300, 200);

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    }, []);

const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const col = Math.floor(x / 100);
        const row = Math.floor(y / 100);

        // Prevent overwriting a cell
        if (grid[row][col]) return;

        const ctx = canvasRef.current!.getContext('2d');
        if (!ctx) return;

        if (turn === "red") {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(col * 100 + 20, row * 100 + 20);
            ctx.lineTo(col * 100 + 80, row * 100 + 80);
            ctx.moveTo(col * 100 + 80, row * 100 + 20);
            ctx.lineTo(col * 100 + 20, row * 100 + 80);
            ctx.stroke();
        } else {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(col * 100 + 50, row * 100 + 50, 30, 0, 2 * Math.PI);
            ctx.stroke();
        }

        setGrid(prev => {
            const newGrid = prev.map(row => [...row]);
            newGrid[row][col] = turn;
            // Only switch turn if no winner
            if (!gameLogic([row, col], newGrid)) {
                setTurn(turn === "red" ? "black" : "red");
            }
            return newGrid;
        });
    };

// Update gameLogic to return true if someone wins
function gameLogic([row, col]: [number, number], gridToCheck = grid) {
    const player = gridToCheck[row][col];
    if (!player) return false;

    // Check all win conditions
    const horizontalWin = gridToCheck[row].every(cell => cell === player);
    const verticalWin = gridToCheck.every(r => r[col] === player);
    const mainDiagonalWin = row === col && gridToCheck.every((r, i) => r[i] === player);
    const antiDiagonalWin = row + col === 2 && gridToCheck.every((r, i) => r[2 - i] === player);

    // If any win condition is met, show alert and return true
    if (horizontalWin || verticalWin || mainDiagonalWin || antiDiagonalWin) {
        setWinner(player)
    }


}

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{ border: '1px solid #333' }}
                onClick={handleCanvasClick}

            />
            {winner && <p>{winner} wins!</p>}
        </>
    );
}

export default Toe;