import  { useEffect, useRef, useState } from "react";

function Donut() {
    const [frame, setFrame] = useState("");
    const intervalRef = useRef<number>();

    useEffect(() => {
        let A = 0, B = 0;
        const renderFrame = () => {
            let b = [];
            let z = [];
            let width = 200, height = 100;
            for (let k = 0; k < width * height; k++) { b[k] = k % width === width - 1 ? "\n" : " "; z[k] = 0; }
            for (let j = 0; j < 6.28; j += 0.07) 
            {
                for (let i = 0; i < 6.28; i += 0.02) 
                {
                    let c = Math.sin(i),
                    d = Math.cos(j),
                    e = Math.sin(A), f = Math.sin(j),
                    g = Math.cos(A),
                    h = d + 2,
                    D = 1 / (c * h * e + f * g + 5),
                    l = Math.cos(i),
                    m = Math.cos(B),
                    n = Math.sin(B),
                    t = c * h * g - f * e; 
                    let x = Math.floor(width / 2 - 65 + width / 4 * D * (l * h * m - t * n)); 
                    let y = Math.floor(height / 2 - 30 + height / 4 * D * (l * h * n + t * m));
                    let o = x + width * y;
                    let N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));
                    if (height > y && y > 0 && x > 0 && width > x && D > z[o]) 
                    {
                        z[o] = D;
                        b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                    }
                }
            }
        setFrame(b.join(""));
        A += 0.04;
        B += 0.02;
    };

    intervalRef.current = setInterval(renderFrame, 50);
    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <pre style={{ whiteSpace: "pre", fontFamily: "monospace", lineHeight: 1 }}>
      {frame}
    </pre>
  );
}

export default Donut;
