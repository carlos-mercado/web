import React, { useRef, useEffect, useState, useCallback } from 'react';

function Toe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [turn, setTurn] = useState("red");
    const [grid, setGrid] = useState(() => Array(3).fill(null).map(() => Array(3).fill("")));
    const [winner, setWinner] = useState("");
    const [isDraw, setIsDraw] = useState(false);

    const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, 300, 300);
        
        // Draw inner grid lines
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

        // Draw thick outer border
        ctx.beginPath();
        ctx.rect(0, 0, 300, 300);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 6;
        ctx.stroke();
    }, []);

    const resetGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Reset state
        setGrid(Array(3).fill(null).map(() => Array(3).fill("")));
        setTurn("red");
        setWinner("");
        setIsDraw(false);

        // Redraw empty grid
        drawGrid(ctx);
    }, [drawGrid]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = 300;
        canvas.height = 300;

        drawGrid(ctx);
    }, [drawGrid]);

    // Auto-reset after game concludes
    useEffect(() => {
        if (winner || isDraw) {
            const timeout = setTimeout(() => {
                resetGame();
            }, 2500);
            return () => clearTimeout(timeout);
        }
    }, [winner, isDraw, resetGame]);

    const checkDraw = (gridToCheck: string[][]) => {
        return gridToCheck.every(row => row.every(cell => cell !== ""));
    };

    const gameLogic = ([row, col]: [number, number], gridToCheck: string[][]) => {
        const player = gridToCheck[row][col];
        if (!player) return false;

        // Check all win conditions
        const horizontalWin = gridToCheck[row].every(cell => cell === player);
        const verticalWin = gridToCheck.every(r => r[col] === player);
        const mainDiagonalWin = row === col && gridToCheck.every((r, i) => r[i] === player);
        const antiDiagonalWin = row + col === 2 && gridToCheck.every((r, i) => r[2 - i] === player);

        if (horizontalWin || verticalWin || mainDiagonalWin || antiDiagonalWin) {
            setWinner(player);
            return true;
        }

        // Check for draw
        if (checkDraw(gridToCheck)) {
            setIsDraw(true);
            return true;
        }

        return false;
    };

    const handleMove = (clientX: number, clientY: number) => {
        // Prevent moves if game is over
        if (winner || isDraw) return;

        const rect = canvasRef.current!.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const col = Math.floor(x / 100);
        const row = Math.floor(y / 100);

        // Bounds check
        if (row < 0 || row > 2 || col < 0 || col > 2) return;

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
            // Only switch turn if no winner/draw
            if (!gameLogic([row, col], newGrid)) {
                setTurn(turn === "red" ? "black" : "red");
            }
            return newGrid;
        });
    };

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        handleMove(e.clientX, e.clientY);
    };

    const handleCanvasTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        const touch = e.touches[0];
        if (touch) {
            handleMove(touch.clientX, touch.clientY);
        }
    };

    const containerStyle: React.CSSProperties = {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        boxSizing: 'border-box',
    };

    const messageStyle: React.CSSProperties = {
        marginTop: '10px',
        padding: '8px 16px',
        backgroundColor: winner === 'red' ? 'rgba(255, 0, 0, 0.2)' : isDraw ? 'rgba(128, 128, 128, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        fontWeight: 'bold',
        color: winner === 'red' ? 'darkred' : isDraw ? '#555' : '#000',
        textAlign: 'center',
    };

    return (
        <div style={containerStyle}>
            <canvas
                ref={canvasRef}
                style={{ border: '1px solid #333', backgroundColor: 'white', touchAction: 'none' }}
                onClick={handleCanvasClick}
                onTouchStart={handleCanvasTouch}
            />
            {winner && (
                <div style={messageStyle}>
                    {winner === 'red' ? 'Red (X)' : 'Black (O)'} wins! 
                    <br />
                    <small>Resetting in 2.5s...</small>
                </div>
            )}
            {isDraw && (
                <div style={messageStyle}>
                    It's a draw!
                    <br />
                    <small>Resetting in 2.5s...</small>
                </div>
            )}
        </div>
    );
}

export default Toe;
